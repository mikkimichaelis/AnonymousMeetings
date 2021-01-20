import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import _ from 'lodash';
import { IMeetingService, IUserService, MEETING_SERVICE, SharedDataService, USER_SERVICE } from 'src/app/services';
import { Meeting } from 'src/shared/models';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  admin = [];

  constructor(
    private router: Router,
    private modalController: ModalController,
    private sharedDataService: SharedDataService,
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService) {
  }

  ngOnInit() {
    this.meetingService.ownedMeetingsValueChanges();
  }

  addMeeting() {
    this.router.navigateByUrl('admin/tab/add');
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

  edit(meeting: Meeting) {
    // TODO fucking hack but i'm tired
    this.sharedDataService.data = meeting;
    this.router.navigateByUrl('admin/tab/add?edit=true');
  }
}