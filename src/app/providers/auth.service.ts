import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
//import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { Subscription, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthServiceInterface } from './auth.service.interface';

import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {

  firebaseUi: any;

  authStateUser: ReplaySubject<firebase.User> = new ReplaySubject<firebase.User>()
  anonymous = true;

  private authStateSubscription: Subscription;
  constructor(private logService: LogService, private firebaseAuth: AngularFireAuth) {
    firebase.initializeApp(environment.firebaseConfig);

    this.authStateSubscription = firebaseAuth.authState.subscribe((user: firebase.User) => {
      this.anonymous = user !== null ? user.isAnonymous : true;
      this.authStateUser.next(user);

      /// TRACE
      if (user) this.logService.trace(JSON.stringify({user: user.uid, anonymous: user.isAnonymous}))
      else this.logService.trace(JSON.stringify({ user: null }));
    },
      (error: any) => {
        this.logService.error(error);
      },
      () => {
        this.logService.message('firebaseAuth.authState.complete()');
      });

    let auth = firebase.auth();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(function (error) {
        this.logService.error(error);
      });

    // Initialize the FirebaseUI Widget using Firebase.
    this.firebaseUi = new firebaseui.auth.AuthUI(auth);
  }

  public createAnonymous(complete?: boolean) {
    // all anonymous users have an anonymous firebase account
    // complete anonymity will be indicated with a scope or flag for Business Logic
    this.firebaseAuth.signInAnonymously()
        .catch(error => {
          this.logService.error(error);
        });
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  // TODO customize prompts for both "signin" and "signup"
  public static getUiConfig() {
    // FirebaseUI config.
    return {
      callbacks: {
        signInSuccessWithAuthResult: (authResult: firebase.auth.UserCredential) => {
          const user = authResult.user;
          const isNewUser = authResult.additionalUserInfo.isNewUser;

          // initialize new user
          if (isNewUser) {
            // do initialization stuff here (ex. create profile)
            return false;
          }

          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
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
            'email'
          ]
        }, 
        'microsoft.com',
        'yahoo.com',
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID // not available for Ionic apps
      ],
      // Terms of service url.
      tosUrl: 'tos.html',
      privacyPolicyUrl: 'privacy.html'
    };
  }
}






