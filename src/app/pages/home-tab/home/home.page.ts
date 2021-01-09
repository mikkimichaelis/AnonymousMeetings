import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BusyService } from '../../../services/busy.service';
import { UserService } from '../../../services/user.service';
import { GroupsService } from '../../../services/groups.service';
import { Router } from '@angular/router';

import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';
import { Observable } from 'rxjs';
import { IUserFriend } from 'src/shared/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  friends = [
    {name: 'mikki m',
    avatar: 'http',
    online: true},
    {name: 'foo',
    avatar: 'bar',
    online: false},
  ];

  live = [ {
    name: 'recovery live',
    viewers: 56,
    topic: 'selfishness',
    remainingMinutes: 36
  },
  {
    name: 'touchdown recovery',
    viewers: 19,
    topic: 'selfishness',
    remainingMinutes: 54
  },
  {
    name: '12 Steppers',
    viewers: 4,
    topic: '4th step',
    remainingMinutes: 12
  }
    
  ]

  constructor(private router: Router, private busySvc: BusyService, public userService: UserService) {
    
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
}
