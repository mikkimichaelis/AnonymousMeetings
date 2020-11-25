import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

import { IInitializeService, IAuthService, ILoadingService, ILogService, IGroupsService,
  ISettingsService, IUserService, IGroupService } from './';

import { GROUP_SERVICE, USER_SERVICE, GROUPS_SERVICE, 
  LOG_SERVICE, LOADING_SERVICE, AUTH_SERVICE, SETTINGS_SERVICE  } from './injection-tokens'

declare var navigator: any;

@Injectable({
  providedIn: 'root'
})
export class InitializeService implements IInitializeService {

  constructor(
    private translate: TranslateService,
    @Inject(SETTINGS_SERVICE) private settingsService: ISettingsService,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    @Inject(LOADING_SERVICE) private loadingService: ILoadingService,
    @Inject(LOG_SERVICE) private logService: ILogService,
    @Inject(GROUP_SERVICE) private groupsService: IGroupsService,
    @Inject(GROUPS_SERVICE) private groupService: IGroupService,
    @Inject(USER_SERVICE) private userService: IUserService
    ) { }

   async initializeServices() {
    await this.loadingService.initialize();

    this.translate.setDefaultLang('en-US');
    this.translate.use(navigator.language);

    //this.loadingService.present();

    // firebase.initializeApp(environment.firebaseConfig);
    // await this.settingsService.initialize();
    await this.authService.initialize();
    await this.logService.initialize();
    await this.groupsService.initialize();
    await this.groupService.initialize();
    await this.userService.initialize();

    //this.loadingService.dismiss();
   }
}
