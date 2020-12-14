import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    protected router: Router,
    protected routerOutlet: IonRouterOutlet, 
    protected modalCtrl: ModalController, 
    protected groupsSvc: GroupsService, 
    protected locSvc: LocationService,
    protected settingsSvc: SettingsService
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
    } else if ( s.gps ) {  // || (s.lat === null || s.lon === null)
      const { lat, lon } = await this.locSvc.getGps();
      s.lat = lat;
      s.lon = lon;
      await this.settingsSvc.save();
    }

    await this.groupsSvc.getGroups(s);
  }

  details(group: any) {
    this.router.navigateByUrl(`/group/tab/group?id=${group.id}`);
  }

  async presentSettings() {
    if( (<any>this)._infoWindow ) { 
      (<any>this)._infoWindow.close(); 
      (<any>this)._infoWindow = null; 
    }
    
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
      await this.refresh();
    }
  }
}
