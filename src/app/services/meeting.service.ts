import { Inject, Injectable, InjectionToken } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import _ from 'lodash';
import LogRocket from 'logrocket';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ILogService, IUserService } from '.';

import { Group, IGroup, IMeeting, ISchedule, Meeting } from '../../shared/models';
import { ISearchSettings } from '../models';
import { FirestoreService } from './firestore.service';
import { FIRESTORE_SERVICE, LOG_SERVICE, USER_SERVICE } from './injection-tokens';
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
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(LOG_SERVICE) private logService: ILogService) {

  }

  initialize() {
    this.ownedMeetings$ = new ReplaySubject<Meeting[]>(1);
  }

  async resetAdminMeetings() {

  }

  async add(meeting: Meeting) {
    if (meeting) {
      try {
        await this.afs.doc<IMeeting>(`meetings/${meeting.id}`).set(meeting.toObject());
      } catch (e) {
        console.error(e);
        LogRocket.error(e);
      }
    }
  }

  _ownedMeetingsValueChangesSubscription: Subscription;
  ownedMeetingsValueChanges() {
    if (!_.isEmpty(this._ownedMeetingsValueChangesSubscription)) this._ownedMeetingsValueChangesSubscription.unsubscribe();

    this._ownedMeetingsValueChangesSubscription =
      this.fss.col$<IMeeting[]>(`meetings`, ref => ref.where('uid', '==', this.userService.user.id))
        .subscribe({
          next: async (imeetings: any) => {
            const rv = [];
            for (let i = 0; i < imeetings.length; i++) {
              rv.push(new Meeting(imeetings[i]));
            }

            this.ownedMeetings$.next(rv);
          },
          error: async (error) => {
            this.logService.error(error);
          },
        });
  }

  _favoriteMeetingsValueChangesSubscription: Subscription;
  favoriteMeetingsValueChanges() {
    if (!_.isEmpty(this._favoriteMeetingsValueChangesSubscription)) this._favoriteMeetingsValueChangesSubscription.unsubscribe();

    // .where('id', 'in', ['USA', 'Japan']);
    this._favoriteMeetingsValueChangesSubscription =
      this.fss.col$<IMeeting[]>(`meetings`, ref => ref.where('id', 'in', this.userService.user.favMeetings))
        .subscribe({
          next: async (imeetings: any) => {
            const rv = [];
            for (let i = 0; i < imeetings.length; i++) {
              rv.push(new Meeting(imeetings[i]));
            }

            this.favoriteMeetings$.next(rv);
          },
          error: async (error) => {
            this.logService.error(error);
          },
        });
  }

  _liveMeetingsValueChangesSubscription: Subscription;
  liveMeetingsValueChanges() {
    if (!_.isEmpty(this._liveMeetingsValueChangesSubscription)) this._liveMeetingsValueChangesSubscription.unsubscribe();

    this._liveMeetingsValueChangesSubscription =
      this.fss.col$<IMeeting[]>(`meetings`, ref => ref.where('verified', '==', true))
        .subscribe({
          next: async (imeetings: any) => {
            const rv = [];
            for (let i = 0; i < imeetings.length; i++) {
              rv.push(new Meeting(imeetings[i]));
            }

            this.favoriteMeetings$.next(rv);
          },
          error: async (error) => {
            this.logService.error(error);
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

  async getMeetingsAsync(search: ISearchSettings) {
    this.logService.trace('getMeetingsAsync()', search);

    let query = this.fss.col$('meetings', ref => {

      let rv = ref.where('active', '==', true);
      // if (!search.bySpecificTime) {
      //   rv = rv.where('mills', '>=', 0)
      //     .where('mills', '<=', 10000)
      // }
      // if (!search.byRelativeTime) {
      //   rv = rv.where('mills', '>=', 0)
      //     .where('mills', '<=', 10000)
      // }
      if (!search.byAnyDay) {
        rv = rv.where('recurrence.weekly_days', 'array-contains', search.byDay)
      }
      return rv;
    })
      .subscribe({
        next: async (imeetings: any) => {
          const rv = [];
          for (let i = 0; i < imeetings.length; i++) {
            rv.push(new Meeting(imeetings[i]));
          }

          this.searchMeetings$.next(rv);
        },
        error: async (error) => {
          this.logService.error(error);
        },
      });

    // }
    // );

    // query = query.pipe(
    //   map(meetings => {
    //     const rv = [];
    //     meetings.forEach(meeting => {
    //       rv.push(new Meeting(<any>meeting))
    //     });
    //     return rv;
    //   }));

    // return new Promise((resolve, reject) => {
    //   query.subscribe(async (meetings: Meeting[]) => {
    //     this.searchMeetings$.next(meetings);
    //     resolve(meetings);
    //   },
    //     async error => {
    //       LogRocket.error(error);
    //       reject(error);
    //     });
    // });

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
}
