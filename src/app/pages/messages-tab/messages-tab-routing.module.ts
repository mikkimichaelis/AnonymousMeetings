import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesTabPage } from './messages-tab.page';

import { CometchatEmbeddedComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-embedded/cometchat-embedded.component';
import { ContactsPage } from './contacts/contacts.page';
import { ConversationsPage } from './conversations/conversations.page';
import { MessagesPage } from './messages/messages.page';

const routes: Routes = [
  {
    path: 'tab',
    component: MessagesTabPage,
    children: [
      {
        path: 'contacts',
        children: [
          {
            path: '',
            component: ContactsPage
          }
        ]
      },
      {
        path: 'conversations',
        children: [
          {
            path: '',
            component: ConversationsPage
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesTabPageRoutingModule { }
