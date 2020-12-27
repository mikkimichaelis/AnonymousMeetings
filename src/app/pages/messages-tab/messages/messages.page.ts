import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services';
import { CONVERSATIONS_SCREEN_ACTIONS } from 'src/libs/cometchat-angular-ui-kit/src/lib/string_constants';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  user?: object;
  group?: object;
  json = JSON;
  inProgressCall;
  messagesActions;

  constructor(private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private shared: SharedDataService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.shared.data.chatUser;
  }

  handleActionByConversationScreen = (event: { action: string, payload?: object | any }) => {
    this.messagesActions = event;
    switch (event.action) {

      case CONVERSATIONS_SCREEN_ACTIONS.MESSAGES_COMPOSER_ACTIONS.MESSAGE_SENT: {

        break;
      }
      case CONVERSATIONS_SCREEN_ACTIONS.MEDIA_MESSAGES_COMPOSER_ACTIONS.MEDIA_MESSAGE_SENT: {

        break;
      } case CONVERSATIONS_SCREEN_ACTIONS.ADD_MEMBERES_CONTS.ACTIONS.MEMBERS_ADDED: {

        break;
      }
      case CONVERSATIONS_SCREEN_ACTIONS.CONVERSATION_SCREEN_HEADER_ACTIONS.AUDIO_CALL_STARTED: {

        this.inProgressCall = JSON.stringify(event.payload.outGoingCall);

        break;
      }
      case CONVERSATIONS_SCREEN_ACTIONS.CONVERSATION_SCREEN_HEADER_ACTIONS.VIDEO_CALL_STARTED: {

        this.inProgressCall = JSON.stringify(event.payload.outGoingCall);

        break;
      }

    }
    this.cdRef.detectChanges()

  }

}
