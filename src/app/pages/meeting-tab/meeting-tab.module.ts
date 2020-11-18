import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { MeetingTabPageRoutingModule } from './meeting-tab-routing.module';

import { MeetingTabPage } from './meeting-tab.page';
import { MeetingPage } from './meeting/meeting.page';
import { SponsorsPage } from './sponsors/sponsors.page';

@NgModule({
  imports: [
    SharedModule,
    MeetingTabPageRoutingModule
  ],
  declarations: [
    MeetingTabPage,
    MeetingPage,
    SponsorsPage]
})
export class MeetingTabPageModule {}
