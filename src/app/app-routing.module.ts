import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from './classes/authUser.guard';
import { FeatureGuard } from './classes/feature.guard';
import { LandingPage } from './pages/core/landing/landing.page';
import { LoginPage } from './pages/core/login/login.page';

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
    loadChildren: () => import('./pages/meeting-tab/meeting-tab.module').then( m => m.MeetingTabPageModule)
  },
  {
    path: 'meetings', canActivate: [AuthUserGuard],
    loadChildren: () => import('./pages/meetings-tab/meetings-tab.module').then( m => m.MeetingsTabPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/common/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'secretary',
    loadChildren: () => import('./pages/secretary-tab/secretary-tab.module').then( m => m.SecretaryTabPageModule)
  },
  {
    path: 'meeting',
    loadChildren: () => import('./pages/meeting-tab/meeting/meeting.module').then( m => m.MeetingPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./pages/common/feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/common/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/home-tab/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  // {
  //   path: 'search',
  //   loadChildren: () => import('./pages/meetsearch/search.module').then( m => m.SearchPageModule)
  // },
  // {
  //   path: 'map',
  //   loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  // },
  {
    path: 'admin',
    loadChildren: () => import('./pages/secretary-tab/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'minutes',
    loadChildren: () => import('./pages/secretary-tab/minutes/minutes.module').then( m => m.MinutesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/core/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./pages/home-tab/friends/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/core/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/core/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/core/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/core/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/core/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/core/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/core/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/common/chat/chat.module').then( m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
