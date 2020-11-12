import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
// import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { Observable } from 'rxjs';

import { ErrorService } from './error.service';
import { LogService } from './log.service';

@Injectable()
export class AuthService {
  // user: Observable<firebase.User>;
  authStateUser: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private errorService: ErrorService, private logService: LogService) {
    this.authStateUser = firebaseAuth.authState;

    let auth = firebase.auth();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  

    // Initialize the FirebaseUI Widget using Firebase.
    this.ui = new firebaseui.auth.AuthUI(auth);
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
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}





