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
    this.signup = this.route.snapshot.queryParamMap.get('signup') === 'true' ? true : false;
  }

  initialized = false;
  ngOnInit() { 
    if (!this.initialized) {
      this.authService.firebaseUi.start('#firebaseui-auth-container', this.authService.getUiConfig())
      this.initialized = true;
    }
  }
}
