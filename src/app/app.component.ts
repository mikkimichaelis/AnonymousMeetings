import { SharedModule } from './shared.module';

import { Component, Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CometChat } from "@cometchat-pro/cordova-ionic-chat"

import { InitializeService } from './services/initialize.service';

import { Plugins } from '@capacitor/core';
import { SettingsService } from './services/settings.service';
import { AUTH_SERVICE, IAuthService, IBusyService, IUserService, BUSY_SERVICE, USER_SERVICE, BusyService } from './services';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { User, UserProfile } from 'src/shared/models';
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
    // private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private initializeService: InitializeService,
    private settings: SettingsService,
    private router: Router,
    private translateService: TranslateService,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    @Inject(USER_SERVICE) private userService: IUserService,
  ) {
    this.settings.initialize();
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async (readySource) => {

      await this.comChatInit();

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
      this.authService.authUser$.subscribe(
        async authUser => {
          if (!_.isEmpty(authUser) && !_.isEmpty(this.userService.user)) {
            this.router.navigateByUrl('/home/tab/home');
          } else if (!_.isEmpty(authUser)) {

            if (!creating) {
              this.busyService.present(pleaseWait);
            }

            let user = await this.userService.getUser(authUser.uid, creating ? 5000 : 0);

            if (!_.isEmpty(user)) {
              // TODO not sure why user.chatUser is null after successful login
              // user.chatUser = await this.userService.loginChatUser(user);
              await this.userService.loginChatUser(user);

              if(!user.chatUser) {
                await this.userService.createChatUser(user);
              }

              if(!user.chatUser) {
                // TODO
              }
              
              this.router.navigateByUrl('/home/tab/home');
            } else {
              await this.authService.logout();
            }
            this.busyService.dismiss();
          } else {
            if (creating) {
              // we are in a loop, redirect to landing
              this.busyService.dismiss();
              this.router.navigateByUrl('/core/landing?showLanding=true');
            } else {
              creating = true;
              this.busyService.present(creatingUser);
              await this.authService.createAnonymous();
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

  async comChatInit() {
    var appID = "27315ccd0a804b8";
    var region = "US";
    var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    await CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
      },
      error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  }
}
