import { Injectable } from '@angular/core';

import { ILocationService } from './location.service.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService implements ILocationService {

  constructor() { }

  async getGps(): Promise<{lat: number, lon: number}> {
    // TODO add cordova geolocation
    // const pos = await Geolocation.getCurrentPosition();
    // return { lat: pos.coords.latitude, lon: pos.coords.longitude };
    return { lat: 1, lon: 1 }
  }

  async getZipGps(zip: string): Promise<{lat: number, lon: number}> {
    return Promise.resolve({ lat: 39.8249268571429, lon: -84.8946604285714 });
  }
}
