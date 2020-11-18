import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { CommonRoutingModule } from './common-routing.module';

import { CalendarPage } from './calendar/calendar.page';
import { ChatPage } from './chat/chat.page';
import { FeedPage } from './feed/feed.page';
import { MessagesPage } from './messages/messages.page';
import { SponsorPage } from './sponsor/sponsor.page';
import { UserPage } from './user/user.page';

@NgModule({
  imports: [
    SharedModule,
    CommonRoutingModule
  ],
  declarations: [
    CalendarPage,
    ChatPage,
    FeedPage,
    MessagesPage,
    SponsorPage,
    UserPage
  ],
  
})
export class CommonModule { }
