import { Inject, Injectable, InjectionToken } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import _ from 'lodash';
import { Subject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GroupBLLService } from 'src/shared/bll';

import { Group, IGroup, ISchedule } from '../../shared/models';
import { IGroupService } from './';
import { FirestoreService } from './firestore.service';
import { FIRESTORE_SERVICE } from './injection-tokens';

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
    @Inject(FIRESTORE_SERVICE) private fss: FirestoreService) {

  }
  initialize() {
    this.group$ = new Subject<IGroup>();
  }

  async getGroupAsync(id: string): Promise<IGroup> {
    // TODO snapshot changes
    return new Promise((resolve, reject) => {
      let query = this.fss.doc$(`groups/${id}`).pipe(
        switchMap((group: any) => {
          if (!_.isEmpty(group)) {
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
        this.group.schedules = GroupBLLService.orderSchedules(this.group.schedules);
        this.group$.next(this.group);
        resolve(this.group);
      });
    });
  }
}
