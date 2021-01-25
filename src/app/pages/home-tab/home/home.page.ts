import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { BusyService } from '../../../services/busy.service';
import { UserService } from '../../../services/user.service';
import { GroupsService } from '../../../services/groups.service';
import { Router } from '@angular/router';

import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { IMeeting, IUserFriend, Meeting } from 'src/shared/models';
import { IMeetingService, IUserService, MEETING_SERVICE, USER_SERVICE } from 'src/app/services';
import { ModalController } from '@ionic/angular';
import { ViewPage } from '../../meetings-tab/view/view.page';
import _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  _showLiveMeetings: boolean = false;
  get showLiveMeetings(): boolean {
    return this._showLiveMeetings;
  }

  constructor(private router: Router, 
    private modalController: ModalController, 
    private busySvc: BusyService, 
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService) {
  }

  ngOnInit() {
    // refresh favs when user is updated 
    // TODO move to meeting service
    this.userService.user$.subscribe(user => {
      this.meetingService.favoriteMeetingsValueChanges();
    })
    this.meetingService.liveMeetingsValueChanges();

    this.meetingService.liveMeetings$.subscribe(live => {
      this._showLiveMeetings = (live && live.length > 0);
    })
  }

  async ionViewDidEnter() {
    // TODO time delay the present to smooth app progression
    //await this.busySvc.present('Loading....');
    await this.userService.user$.subscribe(user => {
      if (user) this.busySvc.dismiss();
    })
  }

  async ionViewWillLeave() {
    //await this.busySvc.dismiss();
  }

  async logout() {
    this.router.navigateByUrl('/core/logout');
  }

  daysSober() {
    console.log('daysSober');
  }

  chatWithFriend(friend: IUserFriend) {
    console.log('chatWithFriend()');
  }

  videoWithFriend(friend: IUserFriend) {
    console.log('videoWithFriend()');
  }

  viewFavorites() {
    this.router.navigateByUrl('/home/tab/favorites');
  }

  viewLive() {
    this.router.navigateByUrl('/home/tab/live');
  }

  async viewHomeMeeting() {
    this.viewMeeting(this.userService.user.homeMeeting)
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
