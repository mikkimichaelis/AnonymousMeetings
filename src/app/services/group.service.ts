import { Inject, InjectionToken } from '@angular/core';
export const GROUP_SERVICE = new InjectionToken<string>('GroupService');
export * from './group.service.interface'
export * from './group-bll.service';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGroup } from '../models/group';
import { ISchedule } from '../models/schedule';
import { GroupBLLService, GROUP_BLL_SERVICE } from './group-bll.service';
import { IGroupService } from './group.service.interface';

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

  constructor(private afs: AngularFirestore, @Inject(GROUP_BLL_SERVICE) private groupBLLSvc: GroupBLLService) { }
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
