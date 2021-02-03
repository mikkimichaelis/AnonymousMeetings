import { SharedModule } from './shared.module';

import { Component, enableProdMode, Inject, Injector } from '@angular/core';
// import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { InitializeService } from './services/initialize.service';

import { AUTH_SERVICE, IAuthService, IBusyService, IUserService, BUSY_SERVICE, USER_SERVICE, BusyService, ISettingsService, SETTINGS_SERVICE, TOAST_SERVICE, IToastService} from './services';
import { Router } from '@angular/router';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Zoom } from '@ionic-native/zoom/ngx';

import LogRocket from 'logrocket';

declare var navigator: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // TODO
  SDK_KEY = 'd1BznmF4HfrvRZmabIyCcp2a6bpcZYbqmCXB';
  SDK_SECRET = 'U0j5w2XB4CURvIhIpwf6cJnjRknjCZdG4Sva';

  loggedIn = true;
  dark = true;

  get showLogin() {
    return this.authService.isAnonymous;
  }

  constructor(
    // private menu: MenuController,
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    // public swUpdate: SwUpdate,
    public initializeService: InitializeService,
    public router: Router,
    public translateService: TranslateService,
    public zoomService: Zoom,
    public toastCtrl: ToastController,
    @Inject(TOAST_SERVICE) public toastService: IToastService,
    @Inject(BUSY_SERVICE) public busyService: IBusyService,
    @Inject(AUTH_SERVICE) public authService: IAuthService,
    @Inject(USER_SERVICE) public userService: IUserService,
    @Inject(SETTINGS_SERVICE) public settingsService: ISettingsService
  ) {
    // if (environment.production) {
    //   enableProdMode();
    //   console.log(`AppComponent().enableProdMode()`);  // TODO
    // }
    LogRocket.init("tdzfnj/anonymous-meetings",
      {
        release: '[TODO insert build info here]',
        console: {
          isEnabled: true,
          shouldAggregateConsoleErrors: true
        }
      });
    console.log(`AppComponent()`);  // TODO
    this.initializeApp();
    this.settingsService.initialize(false);
    console.log(`~AppComponent()`);
  }

  async logout() {
    await this.authService.logout();
  }

  async initializeApp() {
    console.trace("initializeApp()");
    this.platform.ready().then(async (readySource) => {

      console.log(`Platform ready: ${readySource}`);
      await this.initializeService.initializeServices();

      console.log(`platforms ${JSON.stringify(this.platform.platforms())}`);

      if (this.platform.is('hybrid')) { // 'hybrid' detects both Cordova and Capacitor
        // make your native API calls
      } else {
        // fallback to browser APIs
      }

      console.log('zoomService.initialize()');
      this.zoomService.initialize(this.SDK_KEY, this.SDK_SECRET)
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
        });

      let creating = false;
      let initializing = await this.translateService.get('INITIALIZING').toPromise();
      let pleaseWait = await this.translateService.get('PLEASE_WAIT').toPromise();
      let creatingUser = await this.translateService.get('CREATING_USER').toPromise();
      this.authService.authUser$.subscribe(
        async authUser => {
          await this.initializeService.initializeServices();
          if (!_.isEmpty(authUser) && !_.isEmpty(this.userService._user)) {
            console.log('authService.authUser$.subscribe()', authUser.uid, this.userService._user.id);
            // TODO config
            console.log('navigate /home/tab/home');
            this.router.navigateByUrl('/home/tab/home');
          } else if (!_.isEmpty(authUser)) {
            console.log('authService.authUser$.subscribe()', authUser.uid)
            // TODO research fb offline and how auth is persisted and the below getUser from cache
            // TODO cancel this call if a subsequent auth event happens before it completes
            this.busyService.present(initializing);
            let user = await this.userService.getUser(authUser.uid);
            this.busyService.dismiss();
            if (user) {
              console.log('authService.authUser$.subscribe().getUser(authUser.uid)', authUser.uid, this.userService._user.id)

              console.log('userService.getUser(authUser.uid)', 'navigate', '/home/tab/home')
              this.router.navigateByUrl('/home/tab/home');
            } 
          } else {
            this.router.navigateByUrl('/core/login');
          }
        });
    });

    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  async ngOnInit() {
    // this.swUpdate.available.subscribe(async res => {
    //   const toast = await this.toastCtrl.create({
    //     message: 'Update available!',
    //     position: 'bottom',
    //     buttons: [
    //       {
    //         role: 'cancel',
    //         text: 'Reload'
    //       }
    //     ]
    //   });

    //   await toast.present();

    //   toast
    //     .onDidDismiss()
    //     .then(() => this.swUpdate.activateUpdate())
    //     .then(() => window.location.reload());
    // });
  }
}
