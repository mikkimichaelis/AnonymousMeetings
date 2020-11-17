import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingInfoPageRoutingModule } from './meeting-info-routing.module';

import { MeetingInfoPage } from './meeting-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingInfoPageRoutingModule
  ],
  declarations: [MeetingInfoPage]
})
export class MeetingInfoPageModule {}
