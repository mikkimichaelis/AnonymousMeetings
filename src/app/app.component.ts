import { SharedModule } from './shared.module';

import { Component, enableProdMode, Inject, Injector } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { InitializeService } from './services/initialize.service';

import { AUTH_SERVICE, IAuthService, IBusyService, IUserService, BUSY_SERVICE, USER_SERVICE, BusyService, ISettingsService, SETTINGS_SERVICE, TOAST_SERVICE, IToastService, ILogService, LOG_SERVICE } from './services';
import { Router } from '@angular/router';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
//import { Zoom } from '@ionic-native/zoom/ngx';
declare var navigator: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  SDK_KEY = 'd1BznmF4HfrvRZmabIyCcp2a6bpcZYbqmCXB';
  SDK_SECRET = 'U0j5w2XB4CURvIhIpwf6cJnjRknjCZdG4Sva';

  loggedIn = false;
  dark = true;

  get showLogin() {
    return this.authService.isAnonymous;
  }

  constructor(
    // private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private initializeService: InitializeService,
    private router: Router,
    private translateService: TranslateService,
    //private zoomService: any, //Zoom,
    private toastCtrl: ToastController,
    @Inject(LOG_SERVICE) private logService: ILogService,
    @Inject(TOAST_SERVICE) private toastService: IToastService,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(SETTINGS_SERVICE) private settingsService: ISettingsService
  ) {
    if (environment.production) {
      enableProdMode();
    }
    this.initializeApp();
    this.settingsService.initialize(false);
  }

  async initializeApp() {
    this.logService.trace("initializeApp()");
    this.platform.ready().then(async () => {

      console.log("Platform ready");
      await this.initializeService.initializeServices();
      this.statusBar.styleDefault();
      this.splashScreen.hide();



      if (this.platform.is('hybrid')) { // 'hybrid' detects both Cordova and Capacitor
        // make your native API calls
      } else {
        // fallback to browser APIs
      }

      // this.zoomService.initialize(this.SDK_KEY, this.SDK_SECRET)
      // .then((success) => {
      //   console.log(success);
      // })
      // .catch((error)=>{
      //   console.log(error);
      // });

      let creating = false;
      let pleaseWait = await this.translateService.get('PLEASE_WAIT').toPromise();
      let creatingUser = await this.translateService.get('CREATING_USER').toPromise();
      this.authService.authUser$.subscribe(
        async authUser => {
          if (!_.isEmpty(authUser) && !_.isEmpty(this.userService.user)) {
            // TODO verify route
            this.router.navigateByUrl('/home/tab/home');
          } else if (!_.isEmpty(authUser)) {
            
            // reinitialize auth dependent services
            await this.initializeService.initializeServices();

            if (!creating) {
              await this.busyService.present(pleaseWait);
            }

            let user = await this.userService.getUser(authUser.uid, creating ? 5000 : 0);

            if (!_.isEmpty(user)) {
              
              if(_.isEmpty(user.chatUser)) {
                user.chatUser = await this.userService.createChatUser(user);
              }

              await this.userService.loginChatUser(user.chatUser);

              if(!user.chatUser) {
                // TODO
              }
              
              this.router.navigateByUrl('/group/tab/group');
            } else {
              // We have Auth but no network to retrieve User
              // await this.authService.logout();
              await this.toastService.present('Network Error loading user');
              this.router.navigateByUrl('/core/error');
            }
            await this.busyService.dismiss();
          } else {
            if (creating) {
              // we are in a loop, redirect to landing
              await this.busyService.dismiss();
              this.router.navigateByUrl('/core/landing?showLanding=true');
            } else {
              creating = true;
              await this.busyService.present(creatingUser);
              let created = await this.authService.createAnonymous();
              if(!created) {
                await this.toastService.present('Network Error creating anonymous user');
                await this.busyService.dismiss();
              }
            }
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
}
