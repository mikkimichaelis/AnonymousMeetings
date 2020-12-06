import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import { Subscription, BehaviorSubject, ReplaySubject } from 'rxjs';

import { IAngularFireAuth, IAuthService, ILogService } from './';
import { LOG_SERVICE, ANGULAR_FIRE_AUTH } from './injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  firebaseUi: any;

  authUser: firebase.User = null;
  authUser$: ReplaySubject<firebase.User> = new ReplaySubject<firebase.User>()
  isAnonymous: boolean = true;

  private authStateSubscription: Subscription;
  constructor(
    @Inject(LOG_SERVICE) private logService: ILogService,
    @Inject(ANGULAR_FIRE_AUTH) private firebaseAuth: IAngularFireAuth) { }

  async initialize() {
    this.authStateSubscription = this.firebaseAuth.authState.subscribe(
      (user: firebase.User) => {
        this.isAnonymous = user !== null ? user.isAnonymous : true;
        this.authUser = user;
        this.authUser$.next(user);
      },
      (error: any) => {
        this.logService.error(error);
      });

    let auth = firebase.auth();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(function (error) {
        this.logService.error(error);
      });

    // Initialize the FirebaseUI Widget using Firebase.
    this.firebaseUi = new firebaseui.auth.AuthUI(auth);
  }

  isAuthenticated(): boolean {
    return this.authUser !== null ? true : false;
  }

  public async createAnonymous(): Promise<boolean> {
    await this.firebaseAuth.signInAnonymously()
      .then(authUser => {
        return true;
      })
      .catch(error => {
        this.logService.error(error);
        return false;
      });
      return;
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
      tosUrl: 'https://anonymousgroups.us/assets/pages/tos.html',
      privacyPolicyUrl: 'https://anonymousgroups.us/assets/pages/privacy.html',
      //enableRedirectHandling: false,
      signInSuccessUrl: '/home/tab/home'
    };
  }
}






