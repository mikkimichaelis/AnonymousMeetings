import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceDetailPage } from './attendance-detail';

const routes: Routes = [
  {
    path: '',
    component: AttendanceDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceDetailPageRoutingModule { }
