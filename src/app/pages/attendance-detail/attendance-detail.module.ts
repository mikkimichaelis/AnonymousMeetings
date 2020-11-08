import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceDetailPage } from './attendance-detail';
import { AttendanceDetailPageRoutingModule } from './attendance-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AttendanceDetailPageRoutingModule
  ],
  declarations: [
    AttendanceDetailPage,
  ]
})
export class AttendanceDetailModule { }
