import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingsTabPageRoutingModule } from './meetings-tab-routing.module';

import { MeetingsTabPage } from './meetings-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingsTabPageRoutingModule
  ],
  declarations: [MeetingsTabPage]
})
export class MeetingsTabPageModule {}
