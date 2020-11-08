import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingDetailPage } from './meeting-detail';
import { MeetingDetailPageRoutingModule } from './meeting-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MeetingDetailPageRoutingModule
  ],
  declarations: [
    MeetingDetailPage,
  ]
})
export class MeetingDetailModule { }
