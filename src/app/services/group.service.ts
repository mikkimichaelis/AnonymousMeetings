import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../models/group';
import { IGroupService } from './group.service.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService implements IGroupService {
  groupCollection: AngularFirestoreCollection<Group>
  group: BehaviorSubject<Group>;
  id: string;

  constructor(private afs: AngularFirestore) { }
  initialize() {
    this.group = new BehaviorSubject<Group>(null);
  }

  getGroup(id: string) {
    this.afs.collection<Group>('meetings').doc(`${id}`).get().subscribe(g => {
      this.id = g.id;
      this.group.next(<any>g.data());
      });
  }
}
