import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarPage } from '../calendar/calendar.page';
import { FeedPage } from '../feed/feed.page';
import { MeetingInfoPage } from '../meeting-info/meeting-info.page';
import { MeetingPage } from '../meeting/meeting.page';
import { MessagesPage } from '../messages/messages.page';
import { SponsorsPage } from '../sponsors/sponsors.page';

import { GroupTabPage } from './group-tab.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'group/tab',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    component: GroupTabPage,
    children: [
      {
        path: 'meeting',
        children: [
          {
            path: '',
            component: MeetingInfoPage
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
        path: 'messages',
        children: [
          {
            path: '',
            component: MessagesPage
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
      },
      {
        path: '',
        redirectTo: 'group/tab/meeting',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupTabPageRoutingModule {}
