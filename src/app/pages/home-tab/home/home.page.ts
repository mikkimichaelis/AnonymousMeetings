import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { BusyService } from '../../../services/busy.service';
import { UserService } from '../../../services/user.service';
import { GroupsService } from '../../../services/groups.service';
import { Router } from '@angular/router';

import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { IMeeting, IUserFriend, Meeting } from 'src/shared/models';
import { AUTH_SERVICE, BUSY_SERVICE, IAuthService, IBusyService, IMeetingService, IToastService, IUserService, MEETING_SERVICE, TOAST_SERVICE, USER_SERVICE, ZoomService } from 'src/app/services';
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

  get homeMeeting(): boolean {
    return !_.isEmpty(this.userService._user.homeMeeting);
  }

  get showFavoriteMeetings(): boolean {
    return this.userService._user.favMeetings.length > 0;
  }

  constructor(private router: Router,
    private modalController: ModalController,
    private busySvc: BusyService,
    private socialSharing: SocialSharing,
    private zoomService: ZoomService,
    @Inject(TOAST_SERVICE) private toastService: IToastService,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService) {
    // debugger;
  }

  get live$(): ReplaySubject<Meeting[]> {
    return this.meetingService.liveMeetings$;
  }

  ngOnInit() {
    this.meetingService.liveMeetings$.subscribe(mtgs => {
      console.log(mtgs);
    })

    // refresh favs when user is updated 
    // TODO move to meeting service
    this.userService.user$.subscribe(user => {
      this.meetingService.favoriteMeetingsValueChanges();
    })
    console.log('HomePage.ngOnInit():user$.subscribe()');

    this.meetingService.liveMeetings$.subscribe(live => {
      this._showLiveMeetings = (live && live.length > 0);
    })
    console.log('HomePage.ngOnInit():liveMeetings$.subscribe()');

    this.meetingService.liveMeetingsValueChanges();
    const interval = setInterval(() => {
      this.meetingService.liveMeetingsValueChanges();
    }, 60000);
    console.log('HomePage.ngOnInit():setInterval()');
  }

  async ionViewDidEnter() {
    // TODO time delay the present to smooth app progression
    //await this.busySvc.present('Loading....');
    await this.userService.user$.subscribe(user => {  // TODO BUG
      if (user) this.busySvc.dismiss();
    })
    console.log('HomePage.ionViewDidEnter():user$.subscribe()');
  }

  async ionViewWillLeave() {
    //await this.busySvc.dismiss();
  }

  async logout() {
    await this.authService.logout();
  }

  options = {
    message: 'share this', // not supported on some apps (Facebook, Instagram)
    subject: 'the subject', // fi. for email
    files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://www.website.com/foo/#bar?a=b',
    chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
    appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
    iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
  };
  share() {
    //this.socialSharing.shareWithOptions(this.options);
    this.socialSharing.share('hello, world');
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
    this.viewMeeting(this.userService._homeMeeting)
  }

  format(str: string): string {
    return _.truncate(str, { length: 30, omission: '...'});
  }

  async joinOrViewMeeting(meeting: Meeting) {
    if (meeting.isLive) {
      await this.joinMeeting(meeting);
    } else {
      await this.viewMeeting(meeting);
    }
  }

  async joinMeeting(meeting: Meeting) {
    const displayName = `_${this.userService._user.name}_`;
    //this.toastService.present(`${displayName}@${meeting.zid}: ${meeting.password}`, 3000);
    await this.busyService.present('Connecting Zoom Meeting...')
    this.zoomService.joinMeeting(meeting.zid, meeting.password, displayName, meeting.name).then(
      rv => {
      this.busyService.dismiss();
    }, error => {
      this.busyService.dismiss();
      this.toastService.present(`${error}`, 3000);
    })
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
    return -1 !== _.indexOf(this.userService._user.favMeetings, meeting.id)
  }

  async addFavorite(meeting: Meeting) {
    if (!this.isFavorite(meeting)) {
      this.userService._user.favMeetings.push(meeting.id);
      await this.userService.saveUserAsync(this.userService._user);
    }
  }

  async removeFavorite(meeting: Meeting) {
    _.pull(this.userService._user.favMeetings, meeting.id);
    await this.userService.saveUserAsync(this.userService._user);
  }

  async removeHomeMeeting(meeting: Meeting) {
    if (this.userService._user.homeMeeting === meeting.id) {
      this.userService._user.homeMeeting = null,
        await this.userService.saveUserAsync(this.userService._user);
    }
  }
}
