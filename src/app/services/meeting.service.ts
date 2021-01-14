import { Inject, Injectable, InjectionToken } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import _ from 'lodash';
import LogRocket from 'logrocket';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ILogService, IUserService } from '.';

import { Group, IGroup, IMeeting, ISchedule, Meeting } from '../../shared/models';
import { FirestoreService } from './firestore.service';
import { FIRESTORE_SERVICE, LOG_SERVICE, USER_SERVICE } from './injection-tokens';
import { IMeetingService } from './meeting.service.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingService implements IMeetingService {
  meetingCollection: AngularFirestoreCollection<Meeting>
  ownedMeetings$: ReplaySubject<Meeting[]> = new ReplaySubject<Meeting[]>(1);
  favoriteMeetings$: ReplaySubject<Meeting[]> = new ReplaySubject<Meeting[]>(1);
  
  meetings: Meeting[];
  meetingQuery: Subscription;
  schedulesQuery: Subscription;

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
        for(let i = 0; i < imeetings.length; i++) {
          rv.push( new Meeting(imeetings[i]) );
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
        for(let i = 0; i < imeetings.length; i++) {
          rv.push( new Meeting(imeetings[i]) );
        }

        this.favoriteMeetings$.next(rv);
      },
      error: async (error) => {
        this.logService.error(error);
      },
    });
  }

  async getMeetingsAsync(id: string): Promise<Meeting[]> {
    if( this.meetingQuery && !this.meetingQuery.closed ) {
      this.meetingQuery.unsubscribe();
    }

    return new Promise((resolve, reject) => {
      this.meetingQuery = this.fss.col$(`meetings`, ref => ref.where('id', '==', id))
      .subscribe((imeetings: IMeeting[]) => {
        const meetings = [];
        for(let i = 0; i < imeetings.length; i++) {
          meetings.push( new Meeting(imeetings[i]) );
        }
        resolve(meetings);
      });
    });
  }
}
