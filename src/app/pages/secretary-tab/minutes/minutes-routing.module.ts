import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinutesPage } from './minutes.page';

const routes: Routes = [
  {
    path: '',
    component: MinutesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutesPageRoutingModule {}
