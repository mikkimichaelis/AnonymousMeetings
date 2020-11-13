import { Injectable } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
//import * as firebase from 'firebase/app';
//import firebase from 'firebase';
import { AuthService } from './auth.service';
import { UserServiceInterface } from './user.service.interface';
import { User } from '../models/user';
// import { AngularFirestore } from '@angular/fire/firestore/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserServiceInterface {

  User: ReplaySubject<User>;

  private authStateSubscription: Subscription;
  constructor(private authService: AuthService) { //}, private firestore: AngularFirestore) {
    this.authStateSubscription = this.authService.authStateUser.subscribe(user => {
      if( user ) {
        // firestore.collection<User>('User').doc<User>(user.uid).get().subscribe(user => {
        //   this.User.next(null);
        // })
      }
    })
   }
  
  saveUser() {
    
  }
}
