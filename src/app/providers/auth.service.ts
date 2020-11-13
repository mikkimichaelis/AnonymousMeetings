import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
//import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { Subscription, ReplaySubject } from 'rxjs';
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
  constructor(private firebaseAuth: AngularFireAuth, private logService: LogService) {
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
      .then(function () {
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });


    // Initialize the FirebaseUI Widget using Firebase.
    this.firebaseUi = new firebaseui.auth.AuthUI(auth);
  }

  completeAnonymity() {
    // create random anonymous user and persist
  }


  createAnonymous() {
    let error: any;
    let user: firebase.auth.UserCredential;
    this.firebaseAuth.signInAnonymously().then((u: firebase.auth.UserCredential) => {
      user = u;
      // If the signInAnonymously method completes without error, the observer registered in the onAuthStateChanged will trigger
    }).catch((e: any) => {
      error = e;
    }).then(_ => {
      // log result of createAnonymous()
    });
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
  }

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
      tosUrl: '<your-tos-url>',
      privacyPolicyUrl: '<your-pp-url>'
    };
  }
}





