import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AttendancePage } from './attendance';
import { AttendanceFilterPage  } from '../attendance-filter/attendance-filter';
import { AttendancePageRoutingModule } from './attendance-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancePageRoutingModule
  ],
  declarations: [
    AttendancePage,
    AttendanceFilterPage
  ],
  entryComponents: [
    AttendanceFilterPage
  ]
})
export class AttendanceModule { }
