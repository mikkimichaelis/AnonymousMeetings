import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import firebase from 'firebase/app'
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private platform: Platform, private route: ActivatedRoute, private authService: AuthService) {
    
  }

  started = false;
  async ngOnInit() {
    console.log('LoginPage.ngOnInit()');
    //await this.authService.initialize();
    // https://github.com/firebase/firebaseui-web/issues/559
    if (!this.started) {
      await this.authService.firebaseUi.start('#firebaseui-auth-container', this.authService.getUiConfig(this.platform));
      this.started = true;
      console.log(`LoginPage.ngOnInit().firebaseUi.start()`);
    }
  }

  ionViewWillEnter() {
    console.log(`LoginPage.ionViewWillEnter()`);
  }

  ionViewWillLeave() {
    console.log(`LoginPage.ionViewWillLeave()`);
  }
}
