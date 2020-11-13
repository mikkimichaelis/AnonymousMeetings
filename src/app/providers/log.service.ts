import { Injectable } from '@angular/core';
import { LogServiceInterface } from './log.service.interface';
import LogRocket from 'logrocket';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService implements LogServiceInterface {

  constructor() {
    //this.authService.authStateUser
    // check for anonymity first!
    if (environment.production) {
      LogRocket.init(environment.logRocketConfig.appID, environment.logRocketConfig.options);
    }
  }
  trace(msg: any, ...args: any[]) {
    if (!environment.production) {
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
