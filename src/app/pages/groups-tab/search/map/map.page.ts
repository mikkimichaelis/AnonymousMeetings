import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { GroupsService } from 'src/app/services/groups.service';
import { LocationService } from 'src/app/services/location.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SearchPage } from '../search.page';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage extends SearchPage {

  latitude: number;
  longitude: number;

  constructor(
    private _router: Router,
    private _routerOutlet: IonRouterOutlet, 
    private _modalCtrl: ModalController, 
    private _groupsSvc: GroupsService,
    private _locSvc: LocationService,
    private _settingsSvc: SettingsService,
    ) {
      super(_router, _routerOutlet, _modalCtrl, _groupsSvc, _locSvc, _settingsSvc)
     }

    async ionViewDidEnter() {
      const { lat, lon } = await this.locSvc.getGps();
      this.latitude = lat;
      this.longitude = lon;

      await this.refresh();
    };
  
    _infoWindow: any;
     clickedMarker( infoWindow ) {
       if( this._infoWindow ) this._infoWindow.close();
       this._infoWindow = infoWindow;
     }
}
