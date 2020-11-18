import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { HomeTabPageRoutingModule } from './home-tab-routing.module';

import { HomeTabPage } from './home-tab.page';
import { HomePage } from './home/home.page';
import { FriendsPage } from './friends/friends.page';
import { AttendancePage } from './attendance/attendance.page';

@NgModule({
  imports: [
    SharedModule,
    HomeTabPageRoutingModule
  ],
  declarations: [
    HomeTabPage, 
    HomePage,
    FriendsPage,
    AttendancePage
  ]
})
export class HomeTabPageModule {}
