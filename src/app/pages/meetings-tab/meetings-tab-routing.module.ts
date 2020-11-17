import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarPage } from '../common/calendar/calendar.page';
import { FavoritesPage } from './favorites/favorites.page';
import { MapPage } from './map/map.page';
import { SearchPage } from './search/search.page';

import { MeetingsTabPage } from './meetings-tab.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'meetings/tab/search',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    component: MeetingsTabPage,
    children: [
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
        path: 'calendar',
        children: [
          {
            path: '',
            component: CalendarPage
          }
        ]
      },
      {
        path: '',
        redirectTo: 'meetings/tab/search',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsTabPageRoutingModule {}
