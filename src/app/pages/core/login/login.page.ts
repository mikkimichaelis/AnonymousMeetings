import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import firebase from 'firebase/app'
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  firebaseUi: firebaseui.auth.AuthUI = null;

  constructor(private platform: Platform, private route: ActivatedRoute, private authService: AuthService) { }

  async ngOnInit() { }

  async ionViewWillEnter() {
    console.log(`LoginPage.ionViewWillEnter()`);
    // https://github.com/firebase/firebaseui-web/issues/559

    if (this.firebaseUi) {
      console.log(`this.firebaseUi.reset()`);
      this.firebaseUi.reset();
    } else {
      console.log(`new firebaseui.auth.AuthUI(this.authService.auth)`);
      this.firebaseUi = new firebaseui.auth.AuthUI(this.authService.auth);
    }

    console.log(`this.firebaseUi.start('#firebaseui-auth-container', this.authService.getUiConfig(this.platform))`);
    await this.firebaseUi.start('#firebaseui-auth-container', this.authService.getUiConfig(this.platform));
  }

  ionViewWillLeave() {
    console.log(`LoginPage.ionViewWillLeave()`);
  }
}
