import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarPage } from '../common/calendar/calendar.page';
import { FeedPage } from '../common/feed/feed.page';
import { MeetingPage } from './meeting/meeting.page';
import { SponsorsPage } from './sponsors/sponsors.page';

import { MeetingTabPage } from './meeting-tab.page';
import { ChatPage } from '../common/chat/chat.page';

const routes: Routes = [
  {
    path: 'group',
    redirectTo: 'group/tab',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    component: MeetingTabPage,
    children: [
      {
        path: 'group/tab',
        redirectTo: 'group/tab/meeting',
        pathMatch: 'full'
      },
      {
        path: 'meeting',
        children: [
          {
            path: '',
            component: MeetingPage
          }
        ]
      },
      {
        path: 'feed',
        children: [
          {
            path: '',
            component: FeedPage
          }
        ]
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            component: CalendarPage
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            component: ChatPage
          }
        ]
      },
      {
        path: 'sponsors',
        children: [
          {
            path: '',
            component: SponsorsPage
          }
        ]
      },
      {
        path: 'host',
        children: [
          {
            path: '',
            component: MeetingPage
          }
        ]
      }
    ]
  },
  {
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then( m => m.MeetingPageModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingTabPageRoutingModule {}
