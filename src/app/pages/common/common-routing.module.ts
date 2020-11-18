import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthUserGuard } from '../../classes/authUser.guard';
import { FeatureGuard } from '../../classes/feature.guard';

import { CalendarPage } from './calendar/calendar.page';
import { ChatPage } from './chat/chat.page';
import { FeedPage } from './feed/feed.page';
import { MessagesPage } from './messages/messages.page';
import { SponsorPage } from './sponsor/sponsor.page';
import { UserPage } from './user/user.page';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full',
  //   canActivate: [AuthUserGuard]
  // },
  {
    path: 'calendar',
    component: CalendarPage
  },
  {
    path: 'feed',
    component: FeedPage
  },
  {
    path: 'user',
    component: UserPage
  },
  {
    path: 'chat',
    component: ChatPage,
    canActivate: [FeatureGuard],
    data: {roles: ['User']}
  },
  {
    path: 'messages',
    component: MessagesPage,
    canActivate: [FeatureGuard],
    data: {roles: ['User']}
  },
  {
    path: 'sponsor',
    component: SponsorPage,
    canActivate: [FeatureGuard],
    data: {roles: ['User']}
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule { }
