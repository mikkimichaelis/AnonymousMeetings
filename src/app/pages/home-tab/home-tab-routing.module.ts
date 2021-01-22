import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTabPage } from './home-tab.page';
import { HomePage } from './home/home.page';
import { MessagesPage } from '../common/messages/messages.page';
import { AttendancePage } from './attendance/attendance.page';
import { FriendsPage } from './friends/friends.page';
import { FavoritesPage } from './favorites/favorites.page';
import { LivePage } from './live/live.page';

const routes: Routes = [
  {
    path: 'tab',
    component: HomeTabPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            component: HomePage
          }
        ]
      },
      // {
      //   path: 'messages',
      //   children: [
      //     {
      //       path: '',
      //       component: CometchatEmbeddedComponent
      //     }
      //   ]
      // },
      {
        path: 'attendance',
        children: [
          {
            path: '',
            component: AttendancePage
          }
        ]
      },
      {
        path: 'friends',
        children: [
          {
            path: '',
            component: FriendsPage
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
        path: 'live',
        children: [
          {
            path: '',
            component: LivePage
          }
        ]
      }
    ]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'live',
    loadChildren: () => import('./live/live.module').then( m => m.LivePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabPageRoutingModule { }
