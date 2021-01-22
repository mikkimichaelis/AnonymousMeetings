import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import _ from 'lodash';
import { BUSY_SERVICE, IBusyService, IUserService, MeetingService, USER_SERVICE } from 'src/app/services';
import { GroupsService } from 'src/app/services/groups.service';
import { LocationService } from 'src/app/services/location.service';
import { SettingsService } from 'src/app/services/settings.service';
import { IMeeting, Meeting } from 'src/shared/models';
import { ViewPage } from '../view/view.page';
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
    private modalController: ModalController,
    protected meetingService: MeetingService, 
    protected locSvc: LocationService,
    protected settingsSvc: SettingsService,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(USER_SERVICE) private userService: IUserService,
    ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.busyService.present();
    await this.refresh();
    await this.busyService.dismiss();
  };

  async refresh() {
    this.meetingService.getMeetingsAsync(this.settingsSvc.settings.searchSettings);
  }

  async presentSettings() {
    if( (<any>this)._infoWindow ) { 
      (<any>this)._infoWindow.close(); 
      (<any>this)._infoWindow = null; 
    }
    
    const modal = await this.modalController.create({
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

  async editMeeting(meeting?: Meeting) {
    // const modal = await this.modalController.create({
    //   component: AddPage,
    //   componentProps: {
    //     meeting: meeting
    //   }
    // });
    // return await modal.present();
  }

  isFavorite(meeting: Meeting): boolean {
    return -1 !== _.indexOf(this.userService.user.favMeetings, meeting.id)
  }

  async addFavorite(meeting: Meeting) {
    if( !this.isFavorite(meeting) ) {
      this.userService.user.favMeetings.push(meeting.id);
      await this.userService.saveUserAsync(this.userService.user);
    }
  }

  async removeFavorite(meeting: IMeeting) {
    _.pull(this.userService.user.favMeetings, meeting.id);
      await this.userService.saveUserAsync(this.userService.user);
  }

  async viewMeeting(meeting: IMeeting) {
    const modal = await this.modalController.create({
      component: ViewPage,
      componentProps: {
        meeting: meeting
      }
    });
    return await modal.present();
  }
}
