import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  async viewMeeting(meeting: Meeting) {
    const modal = await this.modalController.create({
      component: ViewPage,
      componentProps: {
        meeting: meeting
      }
    });
    return await modal.present();
  }

}
