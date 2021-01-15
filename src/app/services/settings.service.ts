import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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

  constructor(private storage: NativeStorage, @Inject(FIRESTORE_SERVICE) private fss: IFirestoreService) { }

  async initialize(auth: boolean) {
    // Initialize default values
    this.settings = <any>Object.assign({}, environment.defaultSettings)
    await this.load();

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
    try {
      // TODO browser persist
      const settings = await this.storage.getItem('settings');
      if (settings) {
        Object.assign(this.settings, settings);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async save() {
    try {
      this.storage.setItem('settings', this.settings);
    } catch (error) {
      console.error(error);
    }
  }
}
