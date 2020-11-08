import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeetingDetailPage } from './meeting-detail';

const routes: Routes = [
  {
    path: '',
    component: MeetingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingDetailPageRoutingModule { }
