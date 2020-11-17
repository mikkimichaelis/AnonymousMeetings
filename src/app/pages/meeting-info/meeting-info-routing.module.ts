import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingInfoPage } from './meeting-info.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingInfoPageRoutingModule {}
