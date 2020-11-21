import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { UserService } from '../../../services/user.service';
import { GroupsService } from '../../../services/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private loading: LoadingService, public userService: UserService) {}

  async ionViewDidEnter() {
    await this.loading.present('Loading....');
    await this.userService.user$.subscribe(user => {
      if( user ) this.loading.dismiss();
    })
  }

  ionViewWillLeave(): void {
    this.loading.dismiss();
  }
}
