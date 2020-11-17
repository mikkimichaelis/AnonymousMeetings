import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MeetingListPage } from './meeting-list';
import { MeetingListPageRoutingModule } from './meeting-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MeetingListPageRoutingModule
  ],
  declarations: [MeetingListPage],
})
export class MeetingListModule {}
