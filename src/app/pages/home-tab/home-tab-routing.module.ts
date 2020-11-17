import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTabPage } from './home-tab.page';
import { HomePage } from '../home/home.page';
import { MessagesPage } from '../messages/messages.page';
import { FavoritesPage } from '../favorites/favorites.page';
import { ProfilePage } from '../profile/profile.page';
import { AttendancePage } from '../attendance/attendance.page';

const routes: Routes = [
  {
    path: '/home',
    redirectTo: '/home/tab',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    component: HomeTabPage,
    children: [
      {
        path: '/home/tab',
        redirectTo: '/home/tab/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            component: HomePage
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            component: MessagesPage
          }
        ]
      },
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
        path: 'favorites',
        children: [
          {
            path: '',
            component: FavoritesPage
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: ProfilePage
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
export class HomeTabPageRoutingModule { }
