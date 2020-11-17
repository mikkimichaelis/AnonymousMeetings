import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from './classes/authUser.guard';
import { FeatureGuard } from './classes/feature.guard';
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
  },
  {
    path: 'group', canActivate: [AuthUserGuard, FeatureGuard],
    loadChildren: () => import('./pages/group-tab/group-tab.module').then( m => m.GroupTabPageModule)
  },
  {
    path: 'meetings', canActivate: [AuthUserGuard],
    loadChildren: () => import('./pages/meetings-tab/meetings-tab.module').then( m => m.MeetingsTabPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'secretary',
    loadChildren: () => import('./pages/secretary-tab/secretary-tab.module').then( m => m.SecretaryTabPageModule)
  },
  {
    path: 'meeting',
    loadChildren: () => import('./pages/meeting/meeting.module').then( m => m.MeetingPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./pages/feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'meeting-info',
    loadChildren: () => import('./pages/meeting-info/meeting-info.module').then( m => m.MeetingInfoPageModule)
  },
  {
    path: 'sponsors',
    loadChildren: () => import('./pages/sponsors/sponsors.module').then( m => m.SponsorsPageModule)
  },
  {
    path: 'sponsor',
    loadChildren: () => import('./pages/sponsor/sponsor.module').then( m => m.SponsorPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'minutes',
    loadChildren: () => import('./pages/minutes/minutes.module').then( m => m.MinutesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./pages/friends/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
