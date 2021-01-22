import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BUSY_SERVICE, IBusyService, IToastService, IUserService, MEETING_SERVICE, TOAST_SERVICE, USER_SERVICE } from '../../../services';
import { IMeeting, IUser, Meeting } from 'src/shared/models';
import { IMeetingService } from 'src/app/services/meeting.service.interface';
import { ActivatedRoute } from '@angular/router';

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
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(TOAST_SERVICE) private toastService: IToastService,
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService
  ) { }

  update = false;

  ngOnInit() {

  }

  async dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
