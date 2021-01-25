import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BUSY_SERVICE, IBusyService, IToastService, IUserService, MEETING_SERVICE, TOAST_SERVICE, USER_SERVICE } from '../../../services';
import { IMeeting, IUser, Meeting } from 'src/shared/models';
import { IMeetingService } from 'src/app/services/meeting.service.interface';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import _ from 'lodash';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  @Input() meeting: IMeeting;

  user: IUser;

  get showRecurrence(): boolean {
    return this.meeting.continuous == false;
  }

  get recurrenceType(): number {
    return this.meeting.recurrence.type;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private socialSharing: SocialSharing,
    private sanitizer: DomSanitizer,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(TOAST_SERVICE) private toastService: IToastService,
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService
  ) {
    // this.buymeacoffee_url = this.sanitizer.bypassSecurityTrustUrl(this.meeting.buymeacoffee.url);
  }

  buymeacoffee_url;
  update = false;

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.socialSharing.shareWithOptions(this.options);
  }

  async dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  sanitize(url: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  buymeacoffee(url: string) {
    window.open(url, "_blank");
  }

  options = {
    message: 'share this', // not supported on some apps (Facebook, Instagram)
    subject: 'the subject', // fi. for email
    files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://www.website.com/foo/#bar?a=b',
    chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
    appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
    iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
  };

  onSuccess = function (result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  };

  onError = function (msg) {
    console.log("Sharing failed with message: " + msg);
  };

  isHome(meeting: Meeting): boolean {
    return this.userService.user.homeMeeting.id === meeting.id;
  }

  async addHome(meeting: Meeting) {
    this.userService.user.homeMeeting = meeting;
    await this.userService.saveUserAsync(this.userService.user);
  }

  async removeHome(meeting: IMeeting) {
    if (this.userService.user.homeMeeting.id === meeting.id) {
      this.userService.user.homeMeeting = null;
      await this.userService.saveUserAsync(this.userService.user);
    }
  }

  isFavorite(meeting: Meeting): boolean {
    return -1 !== _.indexOf(this.userService.user.favMeetings, meeting.id)
  }

  async addFavorite(meeting: Meeting) {
    if (!this.isFavorite(meeting)) {
      this.userService.user.favMeetings.push(meeting.id);
      await this.userService.saveUserAsync(this.userService.user);
    }
  }

  async removeFavorite(meeting: IMeeting) {
    _.pull(this.userService.user.favMeetings, meeting.id);
    await this.userService.saveUserAsync(this.userService.user);
  }
}
