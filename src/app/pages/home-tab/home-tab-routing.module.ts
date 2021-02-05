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
        component: HomePage
        // children: [
        //   {
        //     path: '',
            
        //   }
        // ]
      },
      {
        path: 'live',
        component: LivePage
        // children: [
        //   {
        //     path: '',
            
        //   }
        // ]
      },
      {
        path: 'favorites',
        component: FavoritesPage,
        // children: [
        //   {
        //     path: '',
            
        //   }
        // ]
      },
      {
        path: 'search',
        redirectTo: '/meetings/tab/search',
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
      // {
      //   path: 'attendance',
      //   children: [
      //     {
      //       path: '',
      //       component: AttendancePage
      //     }
      //   ]
      // },
      // {
      //   path: 'friends',
      //   children: [
      //     {
      //       path: '',
      //       component: FriendsPage
      //     }
      //   ]
      // },
      // {
      //   path: 'favorites',
      //   children: [
      //     {
      //       path: '',
      //       component: FavoritesPage
      //     }
      //   ]
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabPageRoutingModule { }
