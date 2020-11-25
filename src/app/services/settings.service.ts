import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

import { IUserSettings } from '../models';
import { ISettingsService } from './';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ISettingsService {

  public settings: IUserSettings;

  get darkTheme(): boolean {
    return this.settings.darkTheme;
  }
  set darkTheme(value: boolean) {
    this.settings.darkTheme = value;
    this.save();
  }

  constructor() {}

  async initialize() {
    // Initialize default values
    this.settings = <any>Object.assign({}, environment.defaultSettings)

    await this.load();
  }

  async load() {
    const rv = await Storage.get({ key: 'settings' });
    if (rv && rv.value) {
      Object.assign(this.settings, JSON.parse(rv.value));
    }
  }

  async save() {
    await Storage.set({
      key: 'settings',
      value: JSON.stringify(this.settings)
    });
  }
}
