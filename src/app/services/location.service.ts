import { Injectable } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
const { Geolocation } = Plugins;



@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  async getLocation(): Promise<GeolocationPosition> {
    return await Geolocation.getCurrentPosition();
    // const center = this.geo.point(position.coords.latitude, position.coords.longitude); 
    // return this.geo.point(39.8249268571429, -84.8946604285714);
  }
}
