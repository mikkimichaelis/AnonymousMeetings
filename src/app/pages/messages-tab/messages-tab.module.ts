import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { MessagesTabPageRoutingModule } from './messages-tab-routing.module';

import { ContactsPage } from './contacts/contacts.page';
import { ConversationsPage } from './conversations/conversations.page';
import { MessagesPage } from './messages/messages.page';
import { MessagesTabPage } from './messages-tab.page';

import { ChatPage } from './chat/chat';
import { ChatService } from "../../services/chat-service";
import { RelativeTime } from "../../pipes/relative-time";
import { EmojiPickerComponentModule } from "../../components/emoji-picker/emoji-picker.module";
import { EmojiProvider } from "../../services/emoji";

import { CometchatAngularUiKitModule } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-angular-ui-kit.module';

@NgModule({
  imports: [
    SharedModule,
    CometchatAngularUiKitModule,
    MessagesTabPageRoutingModule,
    EmojiPickerComponentModule
  ],
  declarations: [
    MessagesTabPage,
    ContactsPage,
    ConversationsPage,
    MessagesPage,
    ChatPage,
    RelativeTime
  ],
  providers: [
    ChatService,
    EmojiProvider
  ]
})
export class MessagesTabPageModule { }
