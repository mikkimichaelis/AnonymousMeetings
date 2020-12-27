import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services';
import { CONTACT_LIST_ACTIONS, CONVERSATION_LIST_ACTIONS } from 'src/libs/cometchat-angular-ui-kit/src/lib/string_constants';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  constructor(private router: Router, private shared: SharedDataService) { }

  ngOnInit() {
  }

  onItemSelected(event: { action: string, payload?: object | any }) {
    switch (event.action) {
      case CONTACT_LIST_ACTIONS.CONTACT_ITEM_SELECTED:
      case CONVERSATION_LIST_ACTIONS.CONVERSATION_ITEM_SELECTED:
        if (event.payload.hasOwnProperty('user')) {
          this.shared.data.chatUser = event.payload.user;
        }
        this.router.navigateByUrl(`/messages/tab/messages`);
        break;
      default:
        console.log(event);
        break;
    }
  }
}
