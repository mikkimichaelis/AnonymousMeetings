import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTabPageRoutingModule } from './home-tab-routing.module';

import { HomeTabPage } from './home-tab.page';
import { HomePage } from './home/home.page';
import { FriendsPage } from './friends/friends.page';
import { AttendancePage } from './attendance/attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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
