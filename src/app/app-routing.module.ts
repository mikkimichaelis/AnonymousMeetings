import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

///import { AuthUserGuard } from '../../classes/authUser.guard';
//import { FeatureGuard } from '../../classes/feature.guard';

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
    loadChildren: () => import('./pages/common/common.module').then(m => m.CommonModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home-tab/home-tab.module').then(m => m.HomeTabPageModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./pages/meeting-tab/meeting-tab.module').then(m => m.MeetingTabPageModule)
  },
  {
    path: 'meetings',
    loadChildren: () => import('./pages/meetings-tab/meetings-tab.module').then(m => m.MeetingsTabPageModule)
  },
  {
    path: 'secretary',
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
