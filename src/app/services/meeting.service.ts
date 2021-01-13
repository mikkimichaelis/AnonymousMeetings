import { Inject, Injectable, InjectionToken } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import _ from 'lodash';
import LogRocket from 'logrocket';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Group, IGroup, IMeeting, ISchedule, Meeting } from '../../shared/models';
import { FirestoreService } from './firestore.service';
import { FIRESTORE_SERVICE } from './injection-tokens';
import { IMeetingService } from './meeting.service.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingService implements IMeetingService {
  meetingCollection: AngularFirestoreCollection<Meeting>
  meetings$: ReplaySubject<Meeting[]> = new ReplaySubject<Meeting[]>(1);
  meetings: Group[];
  meetingQuery: Subscription;
  schedulesQuery: Subscription;

  constructor(
    private afs: AngularFirestore,
    @Inject(FIRESTORE_SERVICE) private fss: FirestoreService) {

  }
  initialize() {
    this.meetings$ = new ReplaySubject<Meeting[]>(1);
  }

  async resetAdminMeetings() {
    
  }

  async add(meeting: Meeting) {
    if (meeting) {
      try {
        await this.afs.doc<IMeeting>(`meetings/${meeting.zoomMeetingNumber}`).set(meeting.toObject());
      } catch (e) {
        console.error(e);
        LogRocket.error(e);
      }
    }
  }

  async getMeetingsAsync(id: string): Promise<Meeting[]> {
    return null;
    // if( this.meetingQuery && !this.meetingQuery.closed ) {
    //   this.meetingQuery.unsubscribe();
    // }

    // return new Promise((resolve, reject) => {
    //   this.meetingQuery = this.fss.doc$(`meetings/${id}`).pipe(
    //     switchMap((meeting: any) => {
    //       // if (!_.isEmpty(group)) {
    //       //   return this.fss.col$<ISchedule>('schedules', ref => ref.where('gid', '==', group.id))
    //       //     .pipe(
    //       //       map(schedules => {
    //       //         group.schedules = schedules;
    //       //         return group
    //       //       })
    //       //     );
    //       // } else {
    //       //   reject("Invalid group ID");
    //       // }
    //       return meeting;
    //     })
    //   ).subscribe((imeeting: IMeeting) => {
    //     const meeting = new Group(imeeting);
    //     resolve(meeting);
    //   });
    // });
  }
}
