import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { FeatureGuard } from './guards/feature.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'core',
    loadChildren: () => import('./pages/core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'common',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/common/common.module').then(m => m.CommonModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home-tab/home-tab.module').then(m => m.HomeTabPageModule)
  },
  {
    path: 'group',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/group-tab/group-tab.module').then(m => m.GroupTabPageModule)
  },
  {
    path: 'groups',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/groups-tab/groups-tab.module').then(m => m.GroupsTabPageModule)
  },
  {
    path: 'secretary',
    canActivate: [AuthGuard, FeatureGuard],
    data: {roles: ['Secretary']},
    loadChildren: () => import('./pages/secretary-tab/secretary-tab.module').then(m => m.SecretaryTabPageModule)
  },
  {
    path: '**',
    redirectTo: '/core/landing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
