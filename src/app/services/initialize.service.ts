import { Inject, Injectable } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { TranslateService } from '@ngx-translate/core';

import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

import {
  IInitializeService, IAuthService, IBusyService, ILogService, IGroupsService,
  ISettingsService, IUserService, IGroupService
} from './';

import {
  GROUP_SERVICE, USER_SERVICE, GROUPS_SERVICE,
  LOG_SERVICE, BUSY_SERVICE, AUTH_SERVICE, SETTINGS_SERVICE
} from './injection-tokens'

declare var navigator: any;

@Injectable({
  providedIn: 'root'
})
export class InitializeService implements IInitializeService {

  initialized = false;

  constructor(
    private translate: TranslateService,
    @Inject(SETTINGS_SERVICE) private settingsService: ISettingsService,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(LOG_SERVICE) private logService: ILogService,
    @Inject(GROUP_SERVICE) private groupsService: IGroupsService,
    @Inject(GROUPS_SERVICE) private groupService: IGroupService,
    @Inject(USER_SERVICE) private userService: IUserService
  ) { }

  async initializeServices() {

    if (this.initialized) {
      // Post Auth Init
      // TODO check this list periodically
      await this.settingsService.initialize(true);
      await this.comChatInit();
    } else {
      // Pre Auth init
      await this.busyService.initialize();

      this.translate.setDefaultLang('en-US');
      this.translate.use(navigator.language);

      await this.settingsService.initialize(false);

      //this.busyService.present();

      // firebase.initializeApp(environment.firebaseConfig);
      // await this.settingsService.initialize();
      await this.authService.initialize();
      await this.logService.initialize();
      await this.groupsService.initialize();
      await this.groupService.initialize();

      this.initialized = true;
    }

    //this.busyService.dismiss();
  }

  async comChatInit() {
    // TODO review environment app ID is ok, api key is secret
    var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(environment.cometChat.REGION).build();
    await CometChat.init(environment.cometChat.APP_ID, appSetting).then(
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
