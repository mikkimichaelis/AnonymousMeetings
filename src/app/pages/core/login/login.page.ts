import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import firebase from 'firebase/app'
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  signup: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthService) { 
    this.signup = this.route.snapshot.queryParamMap.get('signup') === 'true' ? true: false; 
  }

  ngOnInit() {}

  ionViewDidEnter() {
    from(['redirect']).pipe(
      // TODO automate this pause to a single function and put in config
      // ToDo add delays and spacers
      concatMap(item => of(item).pipe(delay(500)))
    ).subscribe(redirect => {
      this.authService.firebaseUi.start('#firebaseui-auth-container', this.authService.getUiConfig());
    });
    // The start method will wait until the DOM is loaded.
    //this.authService.firebaseUi.start('#firebaseui-auth-container', this.authService.getUiConfig());
  
    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithRedirect(provider).then(function() {
    //   return firebase.auth().getRedirectResult();
    // }).then((result) => {
    //   /** @type {firebase.auth.OAuthCredential} */
    //   var credential = result.credential;
    
    //   // This gives you a Google Access Token.
    //   // You can use it to access the Google API.
    //   //var token = credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });

    // firebase.auth().getRedirectResult().then((result) => {
    //   if (result.credential) {
    //     /** @type {firebase.auth.OAuthCredential} */
    //     var credential = result.credential;
    
    //     // This gives you a Google Access Token.
    //     // You can use it to access the Google API.
    //     // var token = credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    //   }
    // }).catch((error) => {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });
  }
}
