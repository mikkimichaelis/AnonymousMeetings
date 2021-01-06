import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BusyService } from '../../../services/busy.service';
import { UserService } from '../../../services/user.service';
import { GroupsService } from '../../../services/groups.service';
import { Router } from '@angular/router';

import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private busySvc: BusyService, public userService: UserService) { }

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
}
