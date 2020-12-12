import { Inject, Injectable, InjectionToken } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import _ from 'lodash';
import { Subject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Group, IGroup, ISchedule } from '../../shared/models';
import { IGroupService } from './';
import { IGroupBLLService } from '../../shared/bll';
import { FirestoreService } from './firestore.service';
import { FIRESTORE_SERVICE, GROUP_BLL_SERVICE } from './injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class GroupService implements IGroupService {
  groupCollection: AngularFirestoreCollection<IGroup>
  group$: Subject<IGroup> = new Subject<IGroup>()
  group: IGroup;
  id: string;

  constructor(
    private afs: AngularFirestore,
    @Inject(FIRESTORE_SERVICE) private fss: FirestoreService,
    @Inject(GROUP_BLL_SERVICE) private groupBLLSvc: IGroupBLLService) { }
  initialize() {
    this.group$ = new Subject<IGroup>();
  }

  async getGroupAsync(id: string): Promise<IGroup> {
    // TODO snapshot changes
    return new Promise((resolve, reject) => {
      let query = this.fss.doc$(`groups/${id}`).pipe(
        switchMap((group: any) => {
          if( !_.isEmpty(group) ){
          return this.fss.col$<ISchedule>('schedules', ref => ref.where('gid', '==', group.id))
            .pipe(
              map(schedules => {
                group.schedules = schedules;
                return group
              })
            );
          } else {
            reject("Invalid group ID");
          }
        })
      ).subscribe((group: IGroup) => {
        group = new Group(group);
        this.id = group.id;
        this.group = group;
        this.group.schedules = this.groupBLLSvc.orderSchedules(this.group.schedules);
        this.group$.next(this.group);
        resolve(this.group);
      });
    });
  }
}
