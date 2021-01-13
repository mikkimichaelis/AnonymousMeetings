import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarPage } from '../common/calendar/calendar.page';

import { AdminTabPage } from './admin-tab.page';
import { AdminPage } from '../admin-tab/admin/admin.page';
import { AddPage } from './add/add.page';

const routes: Routes = [
  // {
  //   path: 'admin',
  //   redirectTo: 'admin/tab',
  //   pathMatch: 'full'
  // },
  {
    path: 'tab',
    component: AdminTabPage,
    children: [
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
        path: 'add',
        children: [
          {
            path: '',
            component: AddPage
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTabPageRoutingModule {}
