import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { LoadingService } from './loading.service'
import { LogService } from './log.service';
import { GroupsService } from './groups.service';
import { SettingsService } from './settings.service';
import { UserService } from './user.service';
import { GroupService } from './group.service';

declare var navigator: any;

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  constructor(
    private settingsService: SettingsService,
    private translate: TranslateService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private logService: LogService,
    private groupsService: GroupsService,
    private groupService: GroupService,
    private userService: UserService
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
