import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { BusyService } from '../../../services/busy.service';
import { UserService } from '../../../services/user.service';
import { GroupsService } from '../../../services/groups.service';
import { Router } from '@angular/router';

import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';
import { Observable } from 'rxjs';
import { IUserFriend } from 'src/shared/models';
import { IMeetingService, IUserService, MEETING_SERVICE, USER_SERVICE } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private busySvc: BusyService, 
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService) {
    
  }

  ngOnInit() {
    this.meetingService.favoriteMeetingsValueChanges();
  }

  async ionViewDidEnter() {
    // TODO time dely the present to smooth app progression
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

  click() {
    console.log('click');
  }
}
