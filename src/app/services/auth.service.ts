import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import _ from 'lodash';
import firebase from 'firebase/app';      // import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

import { Subscription, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import { IAngularFireAuth, IAuthService, IUserService, } from './';
import { ANGULAR_FIRE_AUTH, USER_SERVICE } from './injection-tokens';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  auth: firebase.auth.Auth;
  authUser: firebase.User = null;
  authUser$: ReplaySubject<firebase.User> = new ReplaySubject<firebase.User>(1)
  logout$: Subject<boolean> = new Subject<boolean>();

  private authStateSubscription: Subscription;

  get isAuthenticated(): boolean {
    return this.authUser !== null ? true : false;
  }

  constructor(
    @Inject(ANGULAR_FIRE_AUTH) private firebaseAuth: IAngularFireAuth,
    @Inject(USER_SERVICE) public userService: IUserService,) { }

  async initialize() {
    this.auth = firebase.auth();
    await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(function (error) {
        console.error(error);
      });

    if (this.authStateSubscription && !this.authStateSubscription.closed) {
      this.authStateSubscription.unsubscribe();
      this.authStateSubscription = null;
    }
    this.authStateSubscription = this.firebaseAuth.authState.subscribe(
      (user: firebase.User) => {
        this.authUser = user;
        console.log('authUser', this.authUser);
        this.authUser$.next(user);
      },
      (error: any) => {
        console.error(error);
      });
  }

  public async createAnonymous(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.firebaseAuth.signInAnonymously()
        .then(authUser => {
          resolve(true);
        })
        .catch(error => {
          console.error(error);
          resolve(false);
        });
    })
  }

  async logout() {
    await this.firebaseAuth.signOut();
    this.logout$.next(true);
  }

  public getUiConfig(platform: Platform): any {
    const that = this;
    const config: any = {
      callbacks: {
        signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect
          // automatically or whether we leave that to developer to handle.
          if (isNewUser) {
            // TODO pause here till user record is created
            let newUser = null;
            // newUser = await new Promise((resolve, reject) => {
            //   // let retry = 5;
            //   // while (retry > 0) {
            //     setTimeout(() => {
            //       try {
            //         console.log(`load new user`);
            //         const gotUser = that.userService.getUser(authResult.user.uid);
            //         resolve(gotUser)
            //       } catch (e) {
            //         console.log(`error get user: ${e}`);
            //         reject('failed to load new user');
            //         // retry--;
            //       }
            //     }, 5000);
            //   });
              // reject('failed to load new user');
            // });
            // return newUser !== null;
          }
          return true;
        },
        signInFailure: async (error: firebaseui.auth.AuthUIError) => {
          if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
            return Promise.resolve();
          }
          var anonymousUser = firebase.auth().currentUser;
          return firebase.auth().signInWithCredential(error.credential);
          anonymousUser.delete();
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      tosUrl: 'https://anonymousmeetings.us/assets/pages/tos.html',
      privacyPolicyUrl: 'https://anonymousmeetings.us/assets/pages/privacy.html',
      //enableRedirectHandling: false,
      signInSuccessUrl: '/home/tab/home',
      autoUpgradeAnonymousUsers: true,
      signInFlow: 'redirect'
    };

    if (platform.is('ios') || platform.is('iphone') || platform.is('ipad')) {
      config.signInOptions = [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ];
    } else {
      config.signInOptions = [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        'apple.com',
        {
          customParameters: {
            prompt: 'select_account'
          }
        },
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID // not available for Ionic apps
      ];
    }
    return config;
  }
}