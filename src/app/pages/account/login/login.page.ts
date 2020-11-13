import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    // The start method will wait until the DOM is loaded.
    this.authService.firebaseUi.start('#firebaseui-auth-container', AuthService.getUiConfig());
  }
}
