import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services';
import { CONVERSATION_LIST_ACTIONS } from 'src/libs/cometchat-angular-ui-kit/src/lib/string_constants';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {

  user?: object;
  group?: object;
  json = JSON;
  inProgressCall;
  messagesActions;

  constructor(private router: Router, private shared: SharedDataService) { }

  ngOnInit() {
  }
  onItemSelected(event: { action: string, payload?: object | any }) {
    switch (event.action) {
      case CONVERSATION_LIST_ACTIONS.CONVERSATION_ITEM_SELECTED:
        if (event.payload.hasOwnProperty('user')) {
          this.user = event.payload.user;
          this.shared.data.chatUser = this.user;
        }
        this.router.navigateByUrl(`/messages/tab/messages`);
        break;
      default:
        console.log(event);
        break;
    }
  }
}
