import { Component, OnInit } from '@angular/core';
import { Zoom } from '@ionic-native/zoom/ngx';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  loggedIn = false;
  userName = '';
  password = '';

  constructor(private zoomService: Zoom) {
    this.zoomService.isLoggedIn().then((success) => {
      console.log(success);
      if (success === true) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }).catch((error) => {
      console.log(error);
      this.presentToast(error);
    });
  }

  ngOnInit() {
  }

  /**
   * Log user in with Zoom username and password.
   */
  login() {
    console.log('Going to login');
    console.log(this.userName);
    console.log(this.password);
    this.zoomService.login(this.userName, this.password).then((success) => {
      console.log(success.message);
      this.presentToast(success.message);
      this.loggedIn = true;
      this.userName = '';
      this.password = '';
    }).catch((error) => {
      console.log(error);
      this.presentToast(error.message);
    });
  }

  /**
   * Log user out.
   */
  logout() {
    console.log('Going to logout');
    this.zoomService.logout().then((success) => {
      console.log(success.message);
      this.presentToast(success.message);
      this.loggedIn = false;
    }).catch((error) => {
      this.presentToast(error.message);
      console.log(error);
    });
  }

  async presentToast(text) {
    // const toast = await this.toastCtrl.create({
    //   message: text,
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
  }

}
