import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingTabPageRoutingModule } from './meeting-tab-routing.module';

import { MeetingTabPage } from './meeting-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingTabPageRoutingModule
  ],
  declarations: [MeetingTabPage]
})
export class MeetingTabPageModule {}
