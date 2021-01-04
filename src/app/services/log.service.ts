import { Inject, Injectable } from '@angular/core';
import LogRocket from 'logrocket';

import { ILogService } from './log.service.interface';
import { ISettingsService } from './settings.service.interface';
import { SETTINGS_SERVICE } from './injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class LogService implements ILogService {

  constructor(@Inject(SETTINGS_SERVICE) private settingsService: ISettingsService) {
    
  }

  async initialize() {
    //this.authService.authStateUser
    // check for anonymity first!
    // TODO
    //if (this.settingsService.environment.production) {
      LogRocket.init("tdzfnj/anonymous-meetings", {});
    //}
  }

  trace(msg: any, ...args: any[]) {
    if (!this.settingsService.environment.production) {
      LogRocket.captureMessage(this.stringify(msg), {});
    }
  }
  message(msg: any, ...args: any[]) {
    LogRocket.captureMessage(this.stringify(msg), {})
  }
  error(error: Error, ...args: any[]) {
    LogRocket.captureException(error, {})
  }
  exception(e: Error, ...args: any[]) {
    LogRocket.captureException(e, {})
  }

  private stringify(x: any): string {
    if(typeof x === 'string') {
      return x;
    } else {
      return JSON.stringify(x);
    }
  }
}
