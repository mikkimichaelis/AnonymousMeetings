import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

// import * as firebase from 'firebase';
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui';
import _ from 'lodash';
import LogRocket from 'logrocket';

import { Subscription, BehaviorSubject, ReplaySubject } from 'rxjs';

import { IAngularFireAuth, IAuthService, ILogService } from './';
import { LOG_SERVICE, ANGULAR_FIRE_AUTH } from './injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  firebaseUi: any;

  authUser: firebase.User = null;
  authUser$: ReplaySubject<firebase.User> = new ReplaySubject<firebase.User>(1)
  isAnonymous: boolean = true;

  private authStateSubscription: Subscription;
  constructor(
    @Inject(LOG_SERVICE) private logService: ILogService,
    @Inject(ANGULAR_FIRE_AUTH) private firebaseAuth: IAngularFireAuth) { }

  async initialize() {
    let auth = firebase.auth();
    this.firebaseUi = new firebaseui.auth.AuthUI(auth);
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(function (error) {
        this.logService.error(error);
      });

    if (this.authStateSubscription && !this.authStateSubscription.closed) {
      this.authStateSubscription.unsubscribe();
      this.authStateSubscription = null;
    }
    this.authStateSubscription = this.firebaseAuth.authState.subscribe(
      (user: firebase.User) => {
        this.isAnonymous = user !== null ? _.has(user, 'isAnonymous') ? user.isAnonymous : true : true;
        this.authUser = user;
        LogRocket.log('authUser', this.authUser)
        this.authUser$.next(user);
      },
      (error: any) => {
        this.logService.error(error);
      });
  }

  isAuthenticated(): boolean {
    return this.authUser !== null ? true : false;
  }

  public async createAnonymous(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.firebaseAuth.signInAnonymously()
        .then(authUser => {
          resolve(true);
        })
        .catch(error => {
          this.logService.error(error);
          resolve(false);
        });
    })
  }

  async logout() {
    await this.firebaseAuth.signOut();
  }

  // TODO customize prompts for both "signin" and "signup"
  public getUiConfig() {
    // FirebaseUI config.
    return {
      callbacks: {
        signInSuccessWithAuthResult: (authResult: firebase.auth.UserCredential) => {
          const user = authResult.user;
          const isNewUser = authResult.additionalUserInfo.isNewUser;

          // initialize new user
          if (isNewUser) {
            // do initialization stuff here (ex. create profile)
            return true;
          }

          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
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
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        'apple.com',
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: 'select_account'
          }
        },
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          scopes: [
            'public_profile',
          ]
        },
        'microsoft.com',
        'yahoo.com',
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID // not available for Ionic apps
      ],
      // Terms of service url.
      tosUrl: 'https://anonymousmeetings.us/assets/pages/tos.html',
      privacyPolicyUrl: 'https://anonymousmeetings.us/assets/pages/privacy.html',
      //enableRedirectHandling: false,
      signInSuccessUrl: '/home/tab/home',
      autoUpgradeAnonymousUsers: true,
      signInFlow: 'redirect'
    };
  }
}






