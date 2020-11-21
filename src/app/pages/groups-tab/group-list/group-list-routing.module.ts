import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupListPage } from './group-list';
const routes: Routes = [
  {
    path: '',
    component: GroupListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupListPageRoutingModule {}
