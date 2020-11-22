import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { GroupsService } from 'src/app/services/groups.service';
import { LocationService } from 'src/app/services/location.service';
import { SettingsService } from 'src/app/services/settings.service';
import { SearchSettingsPage } from './search-settings/search-settings.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor( 
    private routerOutlet: IonRouterOutlet, 
    public modalCtrl: ModalController, 
    private groupsSvc: GroupsService, 
    private locSvc: LocationService,
    private settingsSvc: SettingsService 
    ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.refresh();
  };

  async refresh() {

    const s = this.settingsSvc.settings.searchSettings

    if( s.zipcode ) {
      const { lat, lon } = await this.locSvc.getZipGps(s.zipcode);
      s.lat = lat;
      s.lon = lon;
      await this.settingsSvc.save();
    } else if ( s.gps || (s.lat === null || s.lon === null) ) {
      const { lat, lon } = await this.locSvc.getGps();
      s.lat = lat;
      s.lon = lon;
      await this.settingsSvc.save();
    }

    await this.groupsSvc.getGroups(s);
  }

  async presentSettings() {
    const modal = await this.modalCtrl.create({
      component: SearchSettingsPage,
      cssClass: 'search-options-class',
      componentProps: { input: Object.assign( {}, this.settingsSvc.settings.searchSettings) },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    const rv: any =  await modal.present();
    const settings = await modal.onWillDismiss();
    if( settings.data ) {
      this.settingsSvc.settings.searchSettings = <any>settings.data;
      await this.settingsSvc.save()
    }
  }
}
