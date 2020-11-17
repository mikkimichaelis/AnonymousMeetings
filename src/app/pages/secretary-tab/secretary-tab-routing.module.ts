import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPage } from '../admin/admin.page';
import { MinutesPage } from '../minutes/minutes.page';

import { SecretaryTabPage } from './secretary-tab.page';

const routes: Routes = [
  {
    path: 'secretary',
    redirectTo: 'secretary/tab',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    component: SecretaryTabPage,
    children: [
      {
        path: 'secretary/tab',
        redirectTo: 'secretary/tab/admin',
        pathMatch: 'full'
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            component: AdminPage
          }
        ]
      },
      {
        path: 'minutes',
        children: [
          {
            path: '',
            component: MinutesPage
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretaryTabPageRoutingModule {}
