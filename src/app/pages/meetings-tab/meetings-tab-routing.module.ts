import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarPage } from '../common/calendar/calendar.page';
import { FavoritesPage } from './favorites/favorites.page';
import { SearchPage } from './search/search.page';

import { MeetingsTabPage } from './meetings-tab.page';

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
      {
        path: 'home',
        redirectTo: '/home/tab/home',
      },
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
        path: 'favorites',
        children: [
          {
            path: '',
            component: FavoritesPage
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
