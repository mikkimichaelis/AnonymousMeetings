import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarPage } from '../common/calendar/calendar.page';
import { FavoritesPage } from './favorites/favorites.page';
import { MapPage } from './search/map/map.page';
import { SearchPage } from './search/search.page';

import { MeetingsTabPage } from './meetings-tab.page';
import { AdminPage } from '../meetings-tab/admin/admin.page';

const routes: Routes = [
  // {
  //   path: 'meetings',
  //   redirectTo: 'meetings/tab',
  //   pathMatch: 'full'
  // },
  {
    path: 'tab',
    component: MeetingsTabPage,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'meetings/tab/search',
      //   pathMatch: 'full'
      // },
      {
        path: 'search',
        children: [
          {
            path: '',
            component: SearchPage
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            component: MapPage
          }
        ]
      },
      {
        path: 'favorites',
        children: [
          {
            path: '',
            component: FavoritesPage
          }
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            component: AdminPage
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
export class MeetingsTabPageRoutingModule {}
