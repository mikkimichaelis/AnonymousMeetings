import { SharedModule } from './shared.module';

import { Component, Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { InitializeService } from './services/initialize.service';

import { Plugins } from '@capacitor/core';
import { SettingsService } from './services/settings.service';
import { AUTH_SERVICE, IAuthService, IBusyService, IUserService, BUSY_SERVICE, USER_SERVICE, BusyService } from './services';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
const { App } = Plugins;
declare var navigator: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  loggedIn = false;
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private initializeService: InitializeService,
    private settings: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private busySvc: BusyService,
    private translateService: TranslateService,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    @Inject(USER_SERVICE) private userService: IUserService,
  ) {
    settings.initialize();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async (readySource) => {

      await this.initializeService.initializeServices();

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('hybrid')) { // 'hybrid' detects both Cordova and Capacitor
        // make your native API calls
      } else {
        // fallback to browser APIs
      }

      let creating = false;
      let pleaseWait = await this.translateService.get('PLEASE_WAIT').toPromise();
      let creatingUser = await this.translateService.get('CREATING_USER').toPromise();
      let authStateUserSubscription = this.authService.authUser$.subscribe(
        async authUser => {
          if (!_.isEmpty(authUser) && !_.isEmpty(this.userService.user)) {
            this.router.navigateByUrl('/home/tab/home');
          } else if (!_.isEmpty(authUser)) {

            if (!creating) {
              this.busyService.present(pleaseWait);
            }

            let user = await this.userService.getUser(authUser.uid, creating ? 5000 : 0);

            if (_.isEmpty(user)) {
              await this.authService.logout();
            } else {
              this.router.navigateByUrl('/home/tab/home');
            }
            this.busyService.dismiss();
          } else {
            creating = true;
            this.busyService.present(creatingUser);
            await this.authService.createAnonymous();
          }
        })
    });
  }

  async ngOnInit() {
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  // async doSignup(anonymous: boolean) {
  //   if (anonymous === undefined || anonymous === false) {
  //     this.router.navigate(['/login'], { queryParams: { signup: true } });
  //   } else {
  //     this.busySvc.present();
  //     await this.authService.createAnonymous();
  //     this.busySvc.dismiss();
  //   }
  // }
}
