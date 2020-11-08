import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { MapModule } from '../map/map.module';
import { MeetingDetailModule } from '../meeting-detail/meeting-detail.module';
import { MeetingListModule } from '../meeting-list/meeting-list.module';

import { AttendanceModule } from '../attendance/attendance.module';
import { TestPageModule } from '../test/test.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    MeetingDetailModule,
    MeetingListModule,
    TabsPageRoutingModule,
    AttendanceModule,
    TestPageModule,
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
