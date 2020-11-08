import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeetingListPage } from './meeting-list';
const routes: Routes = [
  {
    path: '',
    component: MeetingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingListPageRoutingModule {}
