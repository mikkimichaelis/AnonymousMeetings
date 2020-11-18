import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { SettingsServiceInterface } from './settings.service.interface';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements SettingsServiceInterface {

  private _darkTheme: boolean;
  get darkTheme(): boolean {
      return this._darkTheme;
  }
  set darkTheme(value: boolean) {
    this._darkTheme = value;
    this.save();
  }

  constructor() {
    // Initialize default values
    Object.assign(this, environment.settings)

    this.load();
  }

  async load() {
    const rv = await Storage.get({ key: 'settings' });
    if( rv && rv.value ) {
      Object.assign(this, JSON.parse(rv.value));
    }
  }

  async save() {
    await Storage.set({
      key: 'settings',
      value: JSON.stringify(this)
    });
  }
}
