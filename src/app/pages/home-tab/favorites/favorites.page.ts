import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import _ from 'lodash';
import { BusyService, IMeetingService, IUserService, MEETING_SERVICE, USER_SERVICE } from 'src/app/services';
import { Meeting } from 'src/shared/models';
import { ViewPage } from '../../meetings-tab/view/view.page';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(
    private router: Router, 
    private busySvc: BusyService, 
    private modalController: ModalController,
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService) {
    
  }

  ngOnInit() {
  }

  joinMeeting(meeting: Meeting) {
    
  }

  async viewMeeting(meeting: Meeting) {
    const modal = await this.modalController.create({
      component: ViewPage,
      componentProps: {
        meeting: meeting
      }
    });
    return await modal.present();
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

  async removeFavorite(meeting: Meeting) {
    _.pull(this.userService.user.favMeetings, meeting.id);
      await this.userService.saveUserAsync(this.userService.user);
  }
}
