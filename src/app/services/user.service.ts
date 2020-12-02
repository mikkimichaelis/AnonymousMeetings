import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { IUser } from '../../models';
import { User } from '../../models';

import { IAuthService, IUserService, ILogService, ITranslateService } from './';
import { LOG_SERVICE, AUTH_SERVICE, TRANSLATE_SERVICE, ANGULAR_FIRESTORE } from './injection-tokens';
import { IAngularFirestore } from './angular-firestore.interface';
import { delay, switchMap } from 'rxjs/operators';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  user$: ReplaySubject<IUser> = new ReplaySubject<IUser>(null);

  public user: IUser;
  private userDocPath: string;
  private _userValueChanges: Observable<IUser>;
  private _userValueChangesSubscription: Subscription;

  private authStateSubscription: Subscription;
  constructor(
    @Inject(ANGULAR_FIRESTORE) private afs: IAngularFirestore,
    @Inject(TRANSLATE_SERVICE) private translate: ITranslateService,
    @Inject(LOG_SERVICE) private logService: ILogService,
    @Inject(AUTH_SERVICE) private authService: IAuthService) { }

  public async getUser(authId: string, timeout = 0): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const user = await (this.afs.collection('users', ref => ref.where('authId', '==', authId)).get().toPromise());
          if (user.docs.length > 0) {
            this.user = <IUser>user.docs[0].data();
            this.userValueChanges();
            resolve(this.user);
            this.user$.next(this.user);
          } else {
            throw new Error(`Unable to find User ${authId}`);
          }
        } catch (e) {
          this.logService.error(e);
          resolve(null);
        }
      }, timeout);
    })

  }
  userValueChanges() {
    if( !_.isEmpty(this._userValueChangesSubscription)) this._userValueChangesSubscription.unsubscribe();
    
    this._userValueChanges = this.afs.doc<IUser>(`users/${this.user.id}`).valueChanges();
    this._userValueChangesSubscription = this._userValueChanges.subscribe({
      next: async (user) => {
        this.user = user;
        this.user$.next(this.user);
      },
      error: async (error) => {
        this.logService.error(error);
      },
    });
  }

  async saveUserAsync(user: IUser) {
    if (user) {
      user.name = `${user.firstName} ${user.lastInitial}.`;
      await this.afs.doc<IUser>(`users/${this.user.id}`).update(user);
    }
  }

  hasFeature(features: string[]) {
    // TODO
    return true;
  }

  translateName() {
    // translate new ANONYMOUS user names into local language
    // if (this.user.firstName === 'ANONYMOUS') {
    //   this.user.firstName = <string>await this.translate.get('ANONYMOUS').toPromise();
    //   let alphabet = <string>await this.translate.get('ALPHABET').toPromise();
    //   this.user.lastInitial = alphabet[Math.floor(Math.random() * alphabet.length)];
    //   this.user.name = `${this.user.firstName} ${this.user.lastInitial}.`;
    //   await this.saveUserAsync(this.user);
    // }
  }
}
