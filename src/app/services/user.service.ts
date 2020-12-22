import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { CometChat } from "@cometchat-pro/cordova-ionic-chat"

import { TranslateService } from '@ngx-translate/core';

import { IUser } from '../../shared/models';
import { User } from '../../shared/models';

import { IAuthService, IUserService, ILogService, ITranslateService, IFirestoreService } from './';
import { LOG_SERVICE, AUTH_SERVICE, TRANSLATE_SERVICE, ANGULAR_FIRESTORE, FIRESTORE_SERVICE, ANGULAR_FIRE_FUNCTIONS } from './injection-tokens';
import { IAngularFirestore } from './angular-firestore.interface';
import _ from 'lodash';
import LogRocket from 'logrocket';
import { IAngularFireFunctions } from './angular-fire-functions.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  chatUser!: CometChat.User;
  apiKey = "1f88533ab03f2c4c742e1a36579a75dccb6c649e";
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
    @Inject(LOG_SERVICE) private logService: ILogService,
    @Inject(AUTH_SERVICE) private authService: IAuthService) { }

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
          this.logService.error(e);
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
        this.logService.error(error);
      },
    });
  }

  async saveUserAsync(user: User) {
    if (user) {
      try {
        await this.afs.doc<IUser>(`users/${this.user.id}`).update(user.toObject());
      } catch (e) {
        console.error(e);
        LogRocket.error(e);
      }
    }
  }

  async createChatUser(user: User) {

    var chatUser = new CometChat.User(user.id);
    chatUser.setName(user.name);

    await CometChat.createUser(chatUser, this.apiKey).then(
      async (newChatUser) => {
        user.chatUser = newChatUser;
        await this.saveUserAsync(user);
      }, error => {
        console.log(error);
      });

      // TODO not my best code
      return chatUser;
  }

  async loginChatUser(user: User) {
    var chatUser = await CometChat.login(user.id, this.apiKey).then(
      async chatUser => {
        this.chatUser = user.chatUser = chatUser;
        await this.saveUserAsync(user)
        return this.chatUser;
      }, async error => {
        console.log(error);
        this.chatUser = user.chatUser = null;
        await this.saveUserAsync(user)
        return this.chatUser;
      }
    )
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


  private async makeCallableAsync<T>(func: string, data: any): Promise<T> {
    let callable: any = this.aff.httpsCallable(func);
    let rv = await callable(data).toPromise().then((result) => {
      if (result) return <T>result;
      throw new Error(`Callable ${func} failed`);
    }, (error) => {
      LogRocket.error(error);
      console.log(error);
      throw new Error("Network call failed");
    })
    return null;
  }

  async setName(firstName: string, lastInitial: string) {
    await this.makeCallableAsync('setName', { firstName: firstName, lastInitial: lastInitial });
  }

  async makeHomeGroup(id: string) {
    await this.makeCallableAsync('makeHomeGroup', { id: id });
  }
}
