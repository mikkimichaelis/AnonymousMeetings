import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTabPage } from './home-tab.page';
import { HomePage } from '../home/home.page';
import { HomeGroupPage } from '../home-group/home-group.page';
import { FavoritesPage } from '../favorites/favorites.page';
import { ProfilePage } from '../profile/profile.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/tab',
    pathMatch: 'full'
  },
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
      {
        path: 'group',
        children: [
          {
            path: '',
            component: HomeGroupPage
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
      },
      {
        path: '',
        redirectTo: 'home/tab/group',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabPageRoutingModule { }
