import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { MessagesTabPageRoutingModule } from './messages-tab-routing.module';

import { ContactsPage } from './contacts/contacts.page';
import { ConversationsPage } from './conversations/conversations.page';
import { MessagesPage } from './messages/messages.page';
import { MessagesTabPage } from './messages-tab.page';

import { CometchatAngularUiKitModule } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-angular-ui-kit.module';

@NgModule({
  imports: [
    SharedModule,
    CometchatAngularUiKitModule,
    MessagesTabPageRoutingModule
  ],
  declarations: [
    MessagesTabPage,
    ContactsPage,
    ConversationsPage,
    MessagesPage
  ]
})
export class MessagesTabPageModule { }
