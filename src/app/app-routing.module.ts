import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './classes/auth.guard';
import { FeatureGuard } from './classes/feature.guard';

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
    loadChildren: () => import('./pages/meeting-tab/meeting-tab.module').then(m => m.MeetingTabPageModule)
  },
  {
    path: 'meetings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/meetings-tab/meetings-tab.module').then(m => m.MeetingsTabPageModule)
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
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
