import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { MeetingListPage } from '../meeting-list/meeting-list';
import { MapPage } from '../map/map';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'meetings',
        children: [
          {
            path: '',
            component: MeetingListPage,
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            component: MapPage,
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

