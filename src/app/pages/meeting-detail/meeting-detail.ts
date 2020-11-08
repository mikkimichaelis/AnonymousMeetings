import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingsData } from '../../providers/meetings-data';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'page-meeting-detail',
  templateUrl: 'meeting-detail.html',
  styleUrls: ['./meeting-detail.scss'],
})
export class MeetingDetailPage {
  meeting: any;

  constructor(
    private dataProvider: MeetingsData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: MeetingsData,
    public inAppBrowser: InAppBrowser,
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const meetingId = this.route.snapshot.paramMap.get('meetingId');
      if (data && data.meetings) {
        for (const meeting of data.meetings) {
          if (meeting && meeting.id === meetingId) {
            this.meeting = meeting;
            break;
          }
        }
      }
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async openMeetingShare(meeting: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + meeting.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + meeting.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + meeting.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(meeting: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + meeting.name,
      buttons: [
        {
          text: `Email ( ${meeting.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + meeting.email);
          }
        },
        {
          text: `Call ( ${meeting.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + meeting.phone);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
