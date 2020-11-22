import { Injectable } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
const { Geolocation } = Plugins;



@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  async getGps(): Promise<{lat: number, lon: number}> {
    const pos = await Geolocation.getCurrentPosition();
    return { lat: pos.coords.latitude, lon: pos.coords.longitude };
  }

  async getZipGps(zip: string): Promise<{lat: number, lon: number}> {
    return Promise.resolve({ lat: 39.8249268571429, lon: -84.8946604285714 });
  }
}
