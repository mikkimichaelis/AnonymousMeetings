import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicsTabPage } from './topics-tab.page';

const routes: Routes = [
  {
    path: '',
    component: TopicsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicsTabPageRoutingModule {}
