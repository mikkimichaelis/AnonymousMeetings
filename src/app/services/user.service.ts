import { Inject, Injectable } from '@angular/core';
import { ObjectUnsubscribedError, Observable, ReplaySubject, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { IMeeting, IUser, Meeting } from '../../shared/models';
import { User } from '../../shared/models';

import { IUserService, ITranslateService, IFirestoreService } from './';
import { TRANSLATE_SERVICE, ANGULAR_FIRESTORE, FIRESTORE_SERVICE, ANGULAR_FIRE_FUNCTIONS, SETTINGS_SERVICE, AUTH_SERVICE } from './injection-tokens';
import { IAngularFirestore } from './angular-firestore.interface';
import _ from 'lodash';

import { IAngularFireFunctions } from './angular-fire-functions.interface';
import { ISettingsService } from './settings.service.interface';
import { IAuthService } from './auth.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  _user: User;
  user$: ReplaySubject<User> = new ReplaySubject<User>(1);

  _homeMeeting: Meeting;
  homeMeeting$: ReplaySubject<Meeting> = new ReplaySubject<Meeting>(1);


  private userDocPath: string;

  private authStateSubscription: Subscription;
  constructor(
    @Inject(FIRESTORE_SERVICE) private fss: IFirestoreService,
    @Inject(ANGULAR_FIRESTORE) private afs: IAngularFirestore,  // TODO switch to fss
    @Inject(ANGULAR_FIRE_FUNCTIONS) private aff: IAngularFireFunctions,
    @Inject(TRANSLATE_SERVICE) private translate: ITranslateService,
    @Inject(SETTINGS_SERVICE) private settingsService: ISettingsService) {
  }

  public async getUser(id: string, timeout = 0): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const user = await this.fss.col(`users`).doc<IUser>(id).get().toPromise();
          if (user.exists) {
            this._user = new User(user.data());
            this.userValueChanges();
            this.user$.next(this._user);
            resolve(this._user);
          } else {
            throw new Error(`Unable to find User ${id}`);
          }
        } catch (e) {
          console.error(e);
          resolve(null);
        }
      }, timeout);
    })
  }

  private _userSubscription: Subscription;
  userValueChanges() {
    if (!_.isEmpty(this._userSubscription)) this._userSubscription.unsubscribe();

    this._userSubscription = this.afs.doc<IUser>(`users/${this._user.id}`).valueChanges().subscribe({
      next: async (user) => {
        this._user = new User(user);
        this.user$.next(this._user);
        this.homeMeetingValueChanges();
      },
      error: async (error) => {
        console.error(error);
      },
    });
  }

  private _homeMeetingSubscription: Subscription;
  homeMeetingValueChanges() {
    if (!_.isEmpty(this._homeMeetingSubscription)) this._homeMeetingSubscription.unsubscribe();

    if (!_.isEmpty(this._user.homeMeeting)) {
      this._homeMeetingSubscription = this.afs.doc<IUser>(`meetings/${this._user.homeMeeting}`).valueChanges().subscribe({
        next: async (meeting: any) => {
          this._homeMeeting = new Meeting(meeting);
          this.homeMeeting$.next(this._homeMeeting);
        },
        error: async (error) => {
          console.error(error);
        },
      });
    } else {
      this.homeMeeting$.next(null);
    }
  }

  unsubscribe() {
    if (this._userSubscription && !this._userSubscription.closed) {
      this._userSubscription.unsubscribe();
      this._userSubscription = null;
    }

    if (this._homeMeetingSubscription && !this._homeMeetingSubscription.closed) {
      this._homeMeetingSubscription.unsubscribe();
      this._homeMeetingSubscription = null;
    }
  }

  async saveUserAsync(user: User) {
    if (user) {
      try {
        await this.afs.doc<IUser>(`users/${this._user.id}`).update(user.toObject());
      } catch (e) {
        console.error(e);
      }
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


  private async makeCallableAsync<T>(func: string, data?: any): Promise<T> {
    let callable: any = this.aff.httpsCallable(func);
    return new Promise<T>(async (resolve, reject) => {
      let rv = await callable(data).toPromise().then((result) => {
        resolve(result);
      }, (error) => {
        console.error(error);
        reject(error);
      })
    })
  }

  async setName(firstName: string, lastInitial: string) {
    await this.makeCallableAsync('setName', { firstName: firstName, lastInitial: lastInitial });
  }

  async makeHomeGroup(id: string) {
    await this.makeCallableAsync('makeHomeGroup', { id: id });
  }

  async makeFavGroup(id: string, make: boolean) {
    if (make) {
      await this.makeCallableAsync('addFavorite', { gid: id });
    } else {
      await this.makeCallableAsync('removeFavorite', { gid: id });
    }
  }

  async createChatUser(user: User): Promise<any> {
    const chatUser = await this.makeCallableAsync('createChatUser');
    return <any>chatUser;
  }

  async loginChatUser(chatUser: any) {
    // TODO disabled for testing login code
    const loggedIn = false; //const loggedIn = await CometChat.getLoggedinUser();

    if (!loggedIn && chatUser) {
      // await CometChat.login(chatUser.authToken).then(
      //   chatUser => {
      //     console.log('chatUser logged in');
      //   }, async error => {
      //     console.error(error);
      //   }
      // )
    }
  }
}
