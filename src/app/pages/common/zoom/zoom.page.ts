import { Component, Inject, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService, USER_SERVICE } from 'src/app/services';

// TODO 
// import { Zoom } from '@ionic-native/zoom/ngx';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.page.html',
  styleUrls: ['./zoom.page.scss'],
})
export class ZoomPage implements OnInit {

  meetingNumber = '5868415858';
  meetingPassword = '';
  displayName = 'Mike M';

  constructor(    private toastCtrl: ToastController,
    //private zoomService: any, // Zoom,
    @Inject(USER_SERVICE) private userService: UserService) { }

  ngOnInit() {
    this.displayName = this.userService.user.name;
  }

  ionViewDidEnter() {
    
  }

  ionViewDidLeave() {
 
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  joinMeeting() {
    console.log('Going to join meeting');
    // Prepare meeting option
    const options = {
      custom_meeting_id: "Customized Title",
      no_share: false,
      no_audio: false,
      no_video: false,
      no_driving_mode: true,
      no_invite: true,
      no_meeting_end_message: true,
      no_dial_in_via_phone: false,
      no_dial_out_to_phone: false,
      no_disconnect_audio: true,
      no_meeting_error_message: true,
      no_unmute_confirm_dialog: true,
      no_webinar_register_dialog: false,
      no_titlebar: false,
      no_bottom_toolbar: false,
      no_button_video: false,
      no_button_audio: false,
      no_button_share: false,
      no_button_participants: false,
      no_button_more: false,
      no_text_password: true,
      no_text_meeting_id: false,
      no_button_leave: false
    };
    // Call join meeting method.
    // this.zoomService.joinMeeting(this.meetingNumber, this.meetingPassword, this.displayName, options)
    //     .then((success) => {
    //       console.log(success);
    //       this.presentToast(success);
    //       this.meetingNumber = null;
    //       this.meetingPassword = null;
    //     }).catch((error) => {
    //       console.log(error);
    //       this.presentToast(error);
    // });
  }

}
