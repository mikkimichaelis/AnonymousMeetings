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

  logout: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    
  }

  async ngOnInit() {
    console.log('LoginPage.ngOnInit()');
    // https://github.com/firebase/firebaseui-web/issues/559
    await this.authService.firebaseUi.start('#firebaseui-auth-container', this.authService.getUiConfig())
    this.logout = this.route.snapshot.queryParamMap.get('logout') === 'true' ? true : false;
    console.log(`LoginPage.ngOnInit().firebaseUi.start()`);
  }

  ionViewWillEnter() {
  }

  ionViewWillLeave() {
    console.log(`LoginPage.ionViewWillLeave()`);
  }
}
