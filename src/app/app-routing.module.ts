import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from './classes/authUser.guard';
import { HomeTabPage } from './pages/home-tab/home-tab.page';
import { LandingPage } from './pages/landing/landing.page';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing', 
    component: LandingPage
    // loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    component: LoginPage
    // loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home', canActivate: [AuthUserGuard],
    loadChildren: () => import('./pages/home-tab/home-tab.module').then( m => m.HomeTabPageModule)
    //component: HomeTabPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
