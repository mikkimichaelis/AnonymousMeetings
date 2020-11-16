import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    // The start method will wait until the DOM is loaded.
    this.authService.firebaseUi.start('#firebaseui-auth-container', AuthService.getUiConfig());
  }
}
