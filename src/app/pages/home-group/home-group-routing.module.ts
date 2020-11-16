import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeGroupPage } from './home-group.page';

const routes: Routes = [
  {
    path: '',
    component: HomeGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeGroupPageRoutingModule {}
