import { Inject, Injectable, InjectionToken } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

import { IGroup, ISchedule } from '../models';
import { IGroupBLLService, IGroupService } from './';
import { GROUP_BLL_SERVICE } from './injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class GroupService implements IGroupService {
  groupCollection: AngularFirestoreCollection<IGroup>
  group$: BehaviorSubject<IGroup>;
  group: IGroup;
  schedule$: BehaviorSubject<ISchedule>;
  schedule: ISchedule;
  id: string;

  constructor(
    private afs: AngularFirestore, 
    @Inject(GROUP_BLL_SERVICE) private groupBLLSvc: IGroupBLLService) { }
  initialize() {
    this.group$ = new BehaviorSubject<IGroup>(null);
    this.schedule$ = new BehaviorSubject<ISchedule>(null);
  }

  getGroup(id: string) {
    this.afs.collection<IGroup>('meetings').doc(`${id}`).get().subscribe(g => {
      this.id = g.id;

      this.group = <any>g.data();
      this.group$.next(this.group);

      this.schedule = this.groupBLLSvc.getNextScheduledMeeting(this.group);
      this.schedule$.next(this.schedule);
      });
  }
}
