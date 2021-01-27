import { Inject, Injectable, InjectionToken } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import _ from 'lodash';

import { DateTime } from 'luxon';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IUserService } from '.';

import { Group, IGroup, IMeeting, ISchedule, Meeting } from '../../shared/models';
import { ISearchSettings } from '../models';
import { IAngularFireFunctions } from './angular-fire-functions.interface';
import { FirestoreService } from './firestore.service';
import { ANGULAR_FIRE_FUNCTIONS, FIRESTORE_SERVICE, USER_SERVICE } from './injection-tokens';
import { IMeetingService } from './meeting.service.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingService implements IMeetingService {
  ownedMeetings$: ReplaySubject<Meeting[]> = new ReplaySubject<Meeting[]>(1);
  favoriteMeetings$: ReplaySubject<Meeting[]> = new ReplaySubject<Meeting[]>(1);
  liveMeetings$: ReplaySubject<Meeting[]> = new ReplaySubject<Meeting[]>(1);
  searchMeetings$: ReplaySubject<Meeting[]> = new ReplaySubject<Meeting[]>(1);


  meetingQuery: Subscription;

  constructor(
    private afs: AngularFirestore,
    @Inject(FIRESTORE_SERVICE) private fss: FirestoreService,
    @Inject(ANGULAR_FIRE_FUNCTIONS) private aff: IAngularFireFunctions,
    @Inject(USER_SERVICE) private userService: IUserService,
  ) {

  }

  initialize() {
    this.ownedMeetings$ = new ReplaySubject<Meeting[]>(1);
  }

  async resetAdminMeetings() {

  }

  async add(meeting: Meeting): Promise<boolean> {
    if (meeting) {
      try {
        await this.makeCallableAsync('addMeeting', meeting.toObject());
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }

  async update(meeting: Meeting): Promise<boolean> {
    if (meeting) {
      try {
        await this.afs.doc<IMeeting>(`meetings/${meeting.id}`).update(meeting.toObject());
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }

  _ownedMeetingsValueChangesSubscription: Subscription;
  ownedMeetingsValueChanges() {
    if (!_.isEmpty(this._ownedMeetingsValueChangesSubscription)) this._ownedMeetingsValueChangesSubscription.unsubscribe();

    this._ownedMeetingsValueChangesSubscription =
      this.fss.col$<IMeeting[]>(`meetings`, ref =>
        ref.where('active', '==', true)
          //.where('verified', '==', true)
          //.where('authorized', '==', true)
          .where('uid', '==', this.userService._user.id))
        .subscribe({
          next: async (imeetings: any) => {
            const rv = [];
            for (let i = 0; i < imeetings.length; i++) {
              rv.push(new Meeting(imeetings[i]));
            }

            this.ownedMeetings$.next(rv);
          },
          error: async (error) => {
            console.error(error);
          },
        });
  }

  _favoriteMeetingsValueChangesSubscription: Subscription;
  favoriteMeetingsValueChanges() {
    if (!_.isEmpty(this._favoriteMeetingsValueChangesSubscription)) this._favoriteMeetingsValueChangesSubscription.unsubscribe();


    this._favoriteMeetingsValueChangesSubscription =
      this.fss.col$<IMeeting[]>(`meetings`, ref => {
        let rv = ref
          .where('active', '==', true)
          .where('verified', '==', true)
          .where('authorized', '==', true);
        if (!_.isEmpty(this.userService._user.favMeetings)) {
          rv = ref.where('id', 'in', this.userService._user.favMeetings)
        } else {
          rv = ref.where('false', '==', 'true')
        }
        return rv;
      })
        .subscribe({
          next: async (imeetings: any) => {
            const rv = [];
            for (let i = 0; i < imeetings.length; i++) {
              rv.push(new Meeting(imeetings[i]));
            }

            this.favoriteMeetings$.next(rv);
          },
          error: async (error) => {
            console.error(error);
          },
        });
  }


  _liveMeetingsValueChangesSubscription: Subscription;
  _continuousMeetingsValueChangesSubscription: Subscription;
  liveMeetingsValueChanges() {
    if (!_.isEmpty(this._liveMeetingsValueChangesSubscription)) this._liveMeetingsValueChangesSubscription.unsubscribe();

    let live: any = null;
    let continuous: any = null;

    const w1 = DateTime.utc();
    const w2 = w1.plus({ hours: 1 });

    this._liveMeetingsValueChangesSubscription =
      this.fss.col$<IMeeting[]>(`meetings`, ref => ref
        .where('active', '==', true)
        .where('verified', '==', true)
        .where('authorized', '==', true)
        .where('end', '>=', w1.toMillis())
        .where('end', '<=', w2.toMillis()))
        .subscribe({
          next: async (imeetings: any) => {
            const rv = [];
            for (let i = 0; i < imeetings.length; i++) {
              rv.push(new Meeting(imeetings[i]));
            }
            if (!continuous) {
              live = rv;
            } else {
              const u = _.union(rv, continuous);
              this.liveMeetings$.next(u);
              continuous = null;
              live = null;
            }
          },
          error: async (error) => {
            console.error(error);
          },
        });

    this._continuousMeetingsValueChangesSubscription =
      this.fss.col$<IMeeting[]>(`meetings`, ref => ref
        .where('active', '==', true)
        .where('verified', '==', true)
        .where('authorized', '==', true)
        .where('continuous', '==', true))
        .subscribe({
          next: async (imeetings: any) => {
            const rv = [];
            for (let i = 0; i < imeetings.length; i++) {
              rv.push(new Meeting(imeetings[i]));
            }
            if (!live) {
              continuous = rv;
            } else {
              const u = _.union(rv, live);
              this.liveMeetings$.next(u);
              continuous = null;
              live = null;
            }
          },
          error: async (error) => {
            console.error(error);
          },
        });
  }

  async getMeetingAsync(id: string): Promise<Meeting[]> {
    if (this.meetingQuery && !this.meetingQuery.closed) {
      this.meetingQuery.unsubscribe();
    }

    return new Promise((resolve, reject) => {
      this.meetingQuery = this.fss.col$(`meetings`, ref => ref.where('id', '==', id))
        .subscribe((imeetings: IMeeting[]) => {
          const meetings = [];
          for (let i = 0; i < imeetings.length; i++) {
            meetings.push(new Meeting(imeetings[i]));
          }
          resolve(meetings);
        });
    });
  }

  async searchMeetingsAsync(search: ISearchSettings) {
    // console.log(`getMeetingsAsync( ${JSON.stringify(search)} )`);

    let query = this.fss.col$('meetings', ref => {

      let rv = ref.where('active', '==', true).where('verified', '==', true);
      if (search.bySpecificTime) {
        // console.log(`DateTime.fromISO(search.bySpecific.start): ${DateTime.fromISO(search.bySpecific.start)}`);
        let start = DateTime.fromObject({
          year: 1970,
          month: 1,
          day: 2,
          hour: DateTime.fromISO(search.bySpecific.start).hour,
          minute: DateTime.fromISO(search.bySpecific.start).minute,
          zone: DateTime.local().zone
        }).toUTC().toMillis();

        ////////////////////////////////////////////////////////////////////
        // console.log(`search.bySpecific.start: ${search.bySpecific.start}`);
        // console.log(`DateTime.fromISO(search.bySpecific.start): ${DateTime.fromISO(search.bySpecific.start)}`);
        // console.log(`DateTime.fromISO(search.bySpecific.start).hour: ${DateTime.fromISO(search.bySpecific.start).hour}`);
        // console.log(`DateTime.fromISO(search.bySpecific.start).toUTC().hour: ${DateTime.fromISO(search.bySpecific.start).toUTC().hour}`);

        // console.log({
        //   name: 'start',
        //   year: 1970,
        //   month: 1,
        //   day: 2,
        //   hour: DateTime.fromISO(search.bySpecific.start).hour,
        //   minute: DateTime.fromISO(search.bySpecific.start).minute,
        //   zone: DateTime.local().zone.name
        // })
        let end = DateTime.fromObject({
          year: 1970,
          month: 1,
          day: 2,
          hour: DateTime.fromISO(search.bySpecific.end).hour,
          minute: DateTime.fromISO(search.bySpecific.end).minute,
          zone: DateTime.local().zone.name
        }).toUTC().toMillis();

        // console.log({
        //   name: 'end',
        //   year: 1970,
        //   month: 1,
        //   day: 2,
        //   hour: DateTime.fromISO(search.bySpecific.end).hour,
        //   minute: DateTime.fromISO(search.bySpecific.end).minute,
        //   zone: DateTime.local().zone.name
        // })
        // console.log(`${start} <= (start) <= ${end}`)
        // console.log(`rv.where('start', '>=', ${start}).where('start', '<=', ${end}`)

        rv = rv.where('start', '>=', start).where('start', '<=', end)
      }
      // TODO
      // if (search.byRelativeTime) {
      //   let start = 0;
      //   let end = 0;
      //   rv = rv.where('start', '>=', start)
      //     .where('end', '<=', end)
      // }
      if (!search.byAnyDay) {
        const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(new Date()).getDay()]
        rv = rv.where('recurrence.weekly_days', 'array-contains', search.byDay == 'today' ? dow : search.byDay)
      }
      return rv;
    })
      .subscribe({
        next: async (imeetings: any) => {
          // TODO too much logging remove
          //console.log(imeetings);
          const rv = [];
          for (let i = 0; i < imeetings.length; i++) {
            rv.push(new Meeting(imeetings[i]));
          }

          this.searchMeetings$.next(rv);
        },
        error: async (error) => {
          console.error(error);
        },
      });

      

    // if (!search.byAnyDay) {
    // const dayVerbose = search.byDay !== `${await this.transSvc.get('TODAY').toPromise()}` ? search.byDay
    //   : await this.transSvc.get(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(new Date()).getDay()]).toPromise();

    // ${await this.transSvc.get('ON').toPromise()}
    //this.verbose = `${this.verbose} ${dayVerbose}`;

    // `${await this.transSvc.get('TODAY').toPromise()}`
    //   const day = search.byDay !== 'today' ? search.byDay
    //     : await this.transSvc.get(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(new Date()).getDay()]).toPromise();

    //   query = query.pipe(
    //     map(groups => {

    //       const rv = [];
    //       groups.forEach(group => {
    //         const schedules = [];
    //         group.schedules.forEach(schedule => {
    //           if (schedule.day === day) {
    //             rv.push(group);
    //             schedules.push(schedule);
    //           }
    //           group.schedules = schedules;
    //         })
    //       });
    //       return rv;
    //     })
    //   );
    // } else {
    //   this.verbose = `${this.verbose} ${(await this.transSvc.get('ANYDAY').toPromise()).toLowerCase()}`;
    // }

    // if (search.byRelativeTime) {
    //   const within = `${await this.transSvc.get('WITHIN').toPromise()}`;
    //   query = query.pipe(
    //     map(groups => {
    //       const date = new Date();
    //       const time = date.toTimeString();
    //       const now = Date.parse('01/' + (date.getDay() + 1) + '/1970 ' + time.substring(0, time.indexOf(' ')) + ' UTC');
    //       const window = <number>search.byRelative.early * 60 * 1000;

    //       this.verbose = `${this.verbose} ${within} ${search.byRelative.early} hour(s)`;

    //       const rv = [];
    //       const schedules = [];
    //       groups.forEach(group => {
    //         group.schedules.forEach(schedule => {
    //           if (
    //             now <= (schedule.millis + <number>search.byRelative.late * 60 * 1000)
    //             && (now >= (schedule.millis - window))) {
    //             rv.push(group);
    //             schedules.push(schedule);
    //           }
    //           group.schedules = schedules;
    //         })
    //       });
    //       return rv;
    //     })
    //   )
    // } else if (search.bySpecificTime) {
    //   const between = `${await this.transSvc.get('BETWEEN').toPromise()}`;
    //   this.verbose = `${this.verbose} ${between} ${DateTime.fromISO(search.bySpecific.start).toLocaleString(DateTime.TIME_SIMPLE)} - ${DateTime.fromISO(search.bySpecific.end).toLocaleString(DateTime.TIME_SIMPLE)}`;

    //   let today = DateTime.utc();
    //   let start = DateTime.fromISO(search.bySpecific.start).toUTC();
    //   start = DateTime.fromObject({
    //     year: today.year,
    //     month: today.month,
    //     day: today.day,
    //     hour: start.hour,
    //     minute: start.minute
    //   })

    //   let end = DateTime.fromISO(search.bySpecific.end).toUTC();
    //   end = DateTime.fromObject({
    //     year: today.year,
    //     month: today.month,
    //     day: today.day,
    //     hour: end.hour,
    //     minute: end.minute
    //   })

    //   query = query.pipe(
    //     map(groups => {
    //       const rv = [];
    //       const schedules = [];
    //       groups.forEach(group => {
    //         group.schedules.forEach(schedule => {
    //           let time = DateTime.fromFormat(schedule.time, 't');
    //           if (time >= start && time <= end) {
    //             rv.push(group);
    //             schedules.push(schedule);
    //           }
    //           group.schedules = schedules;
    //         })
    //       });
    //       return rv;
    //     })
    //   )
    // } else {
    //   this.verbose = `${this.verbose} ${(await this.transSvc.get('ANYTIME').toPromise()).toLowerCase()}`;
    // }
  }

  private async makeCallableAsync<T>(func: string, data?: any): Promise<T> {
    let callable: any = this.aff.httpsCallable(func);
    return new Promise<T>(async (resolve, reject) => {
      let rv = await callable(data).toPromise().then((result) => {
        resolve(result);
      }, (error) => {
        console.error(error);
        reject(error);
      })
    })
  }
}
