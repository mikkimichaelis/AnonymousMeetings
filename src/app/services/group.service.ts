import { Inject, Injectable, InjectionToken } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Group, IGroup, ISchedule } from '../../shared/models';
import { IGroupService } from './';
import { FirestoreService } from './firestore.service';
import { FIRESTORE_SERVICE } from './injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class GroupService implements IGroupService {
  groupCollection: AngularFirestoreCollection<Group>
  group$: Subject<Group> = new Subject<Group>()
  group: Group;
  id: string;

  constructor(
    private afs: AngularFirestore,
    @Inject(FIRESTORE_SERVICE) private fss: FirestoreService) {

  }
  initialize() {
    this.group$ = new Subject<Group>();
  }

  async getGroupAsync(id: string): Promise<Group> {
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
      ).subscribe((igroup: IGroup) => {
        const group = new Group(igroup);
        this.id = group.id;
        this.group = group;
        this.group.schedules = group.orderSchedules();
        this.group$.next(this.group);
        resolve(this.group);
      });
    });
  }
}
