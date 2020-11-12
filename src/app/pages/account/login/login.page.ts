import { Component, OnInit } from '@angular/core';
import { FirebaseUIService } from '../../../providers/firebase-ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private uiService: FirebaseUIService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    // The start method will wait until the DOM is loaded.
    this.uiService.ui.start('#firebaseui-auth-container', FirebaseUIService.getUiConfig());
  }
}
