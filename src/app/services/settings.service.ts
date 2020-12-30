import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { FIRESTORE_SERVICE } from './injection-tokens';
import { IFirestoreService } from './firestore.service.interface';
import { ISettingsService } from './settings.service.interface';
import { IUserSettings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ISettingsService {

  public environment: any = environment;
  public cometChat: any;
  public googleCloud: any;
  public logRocket: any;
  public settings: IUserSettings;

  get darkTheme(): boolean {
    return this.settings.darkTheme;
  }
  set darkTheme(value: boolean) {
    this.settings.darkTheme = value;
    this.save();
  }

  constructor(@Inject(FIRESTORE_SERVICE) private fss: IFirestoreService) { }

  async initialize(auth: boolean) {
    // Initialize default values
    this.settings = <any>Object.assign({}, environment.defaultSettings)

    if (auth) {
      // TODO make these calls concurrent
      try {
        this.cometChat = (await this.fss.col('config').doc('cometChat').get().toPromise()).data();
        this.googleCloud = (await this.fss.col('config').doc('googleCloud').get().toPromise()).data();
        this.logRocket = (await this.fss.col('config').doc('logRocket').get().toPromise()).data();
      } catch (e) {
        console.log(e);
      }
    }

    // TODO load settings
    // await this.load();
  }

  async load() {
    // TODO add cordova storage plugin
    // const rv = await Storage.get({ key: 'settings' });
    // if (rv && rv.value) {
    //   Object.assign(this.settings, JSON.parse(rv.value));
    // }
  }

  async save() {
    // await Storage.set({
    //   key: 'settings',
    //   value: JSON.stringify(this.settings)
    // });
  }
}
