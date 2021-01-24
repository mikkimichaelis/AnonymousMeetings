import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { IUser } from '../../shared/models';
import { User } from '../../shared/models';

import { IAuthService, IUserService, ITranslateService, IFirestoreService } from './';
import { AUTH_SERVICE, TRANSLATE_SERVICE, ANGULAR_FIRESTORE, FIRESTORE_SERVICE, ANGULAR_FIRE_FUNCTIONS, SETTINGS_SERVICE } from './injection-tokens';
import { IAngularFirestore } from './angular-firestore.interface';
import _ from 'lodash';

import { IAngularFireFunctions } from './angular-fire-functions.interface';
import { ISettingsService } from './settings.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  chatUser!: any; // CometChat.User;
  user$: ReplaySubject<User> = new ReplaySubject<User>(1);

  public user: User;
  private userDocPath: string;
  private _userValueChanges: Observable<IUser>;
  private _userValueChangesSubscription: Subscription;

  private authStateSubscription: Subscription;
  constructor(
    @Inject(FIRESTORE_SERVICE) private fss: IFirestoreService,
    @Inject(ANGULAR_FIRESTORE) private afs: IAngularFirestore,
    @Inject(ANGULAR_FIRE_FUNCTIONS) private aff: IAngularFireFunctions,
    @Inject(TRANSLATE_SERVICE) private translate: ITranslateService,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    @Inject(SETTINGS_SERVICE) private settingsService: ISettingsService) { }

  public async getUser(id: string, timeout = 0): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const user = await this.fss.col(`users`).doc<IUser>(id).get().toPromise();
          if (user.exists) {
            this.user = new User(user.data());
            this.userValueChanges();
            this.user$.next(this.user);
            resolve(this.user);
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

  userValueChanges() {
    if (!_.isEmpty(this._userValueChangesSubscription)) this._userValueChangesSubscription.unsubscribe();

    this._userValueChanges = this.afs.doc<IUser>(`users/${this.user.id}`).valueChanges();
    this._userValueChangesSubscription = this._userValueChanges.subscribe({
      next: async (user) => {
        this.user = new User(user);
        this.user$.next(this.user);
      },
      error: async (error) => {
        console.error(error);
      },
    });
  }

  async saveUserAsync(user: User) {
    if (user) {
      try {
        await this.afs.doc<IUser>(`users/${this.user.id}`).update(user.toObject());
      } catch (e) {
        console.error(e);
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
