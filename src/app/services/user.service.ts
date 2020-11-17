import { Injectable } from '@angular/core';
import * as firestore from 'firebase/firestore'
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';

import { AuthService } from './auth.service';

import { UserServiceInterface } from './user.service.interface';

import { User } from '../models/user';
import { TranslateService } from '@ngx-translate/core';
import { LogService } from './log.service';
import { Feature } from '../enums/feature.enum';


@Injectable({
  providedIn: 'root'
})
export class UserService implements UserServiceInterface {
  
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public user: User;
  private _user: firebase.User;

  private authStateSubscription: Subscription;
  constructor(private logService: LogService, private afs: AngularFirestore, private translate: TranslateService, private authService: AuthService) { //}, private firestore: AngularFirestore) {
    this.authStateSubscription = this.authService.authStateUser.subscribe(
      user => {
        this._user = user;
        if (user) {
          afs.collection('users').doc(user.uid).get().subscribe(
            async user => {
              if (user.data() === undefined) {
                // create user
                this.user = new User(this._user).export();
                await this.afs.collection('users').doc(this._user.uid).set(this.user);
              } else {
                this.user = <User>user.data();
              }

              // translate new ANONYMOUS user names into local language
              if (this.user.firstName === 'ANONYMOUS') {
                this.user.firstName = <string>await this.translate.get('ANONYMOUS').toPromise();
                let alphabet = <string>await this.translate.get('ALPHABET').toPromise();
                this.user.lastInitial = alphabet[Math.floor(Math.random() * alphabet.length)];
                this.user.name = `${this.user.firstName} ${this.user.lastInitial}.`;
                await this.saveUserAsync();
              }

              this.user$.next(this.user);
            },
            async error => {
              this.logService.error(error);
              await this.authService.logout();
            })
        } else {
          this.user = null;
          this.user$.next(null);
        }
      })
  }

  async saveUserAsync() {
    if (this.user) {
      await this.afs.collection('users').doc(this._user.uid).update(this.user);
    }
  }

  hasFeature(HomeGroup: Feature) {
    return true;
  }
}
