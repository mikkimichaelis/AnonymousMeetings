import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BUSY_SERVICE, IBusyService, IToastService, IUserService, MEETING_SERVICE, TOAST_SERVICE, USER_SERVICE } from '../../../services';
import { IUser, Meeting } from 'src/shared/models';
import { IMeetingService } from 'src/app/services/meeting.service.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  addForm: FormGroup;
  user: IUser;

  get showRecurrence(): boolean {
    return this.addForm.controls.continuous.value === false;
  }

  get recurrenceType(): string {
    return this.addForm.controls.recurrenceType.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(TOAST_SERVICE) private toastService: IToastService,
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  ionViewWillEnter() {

  }

  initialize() {
    this.addForm = this.formBuilder.group({
      "owner": [false, [Validators.min(0)]],
      "name": ["Mikki's Meeting", [Validators.required,]],
      "zoomMeetingNumber": ['1112223333', [Validators.required, Validators.min(1000000000), Validators.max(9999999999), Validators.minLength(10)]],
      "topic": ['Whatever Mikki wants', [Validators.required, Validators.minLength(5)]],
      "continuous": [false, [Validators.min(0)]],

      "timezone": ["-5", [Validators.required]],
      "startTime": ['12:00', [Validators.required, Validators.min(0)]],
      "duration": ['60', [Validators.required, Validators.min(0)]],

      "recurrenceType": ['1', [Validators.required]],
      // "repeat_interval_1": ['', [Validators.min(1), Validators.max(90)]],
      // "repeat_interval_2": ['', [Validators.min(1), Validators.max(12)]],
      // "repeat_interval_3": ['', [Validators.min(1), Validators.max(3)]],
      "weekly_day": ['', []],
      "weekly_days": ['', []],
      "monthly_day": ['', []],
      "monthly_week": ['', []],
      "monthly_week_day": ['', []],
      "end_times": ['', []],
      "end_date_time": ['', []],

    })
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async submitForm() {
    if (this.addForm.valid) {
      const add = new Meeting(<any>{
        id: this.userService.user.id,
        isOwner: this.addForm.controls.owner.value,
        name: this.addForm.controls.name.value,
        zoomMeetingNumber: this.addForm.controls.zoomMeetingNumber.value,
        topic: this.addForm.controls.topic.value,
        continuous: this.addForm.controls.continuous.value,

        timezone: this.addForm.controls.timezone.value,
        startTime: this.addForm.controls.startTime.value,
        duration: this.addForm.controls.duration.value,

        recurrence: {
          type: this.addForm.controls.recurrenceType.value,
          repeat_interval: null,
          weekly_day: this.addForm.controls.weekly_day.value,
          weekly_days: this.addForm.controls.weekly_days.value,
          monthly_day: this.addForm.controls.monthly_day.value,
          monthly_week: this.addForm.controls.monthly_week.value,
          monthly_week_day: this.addForm.controls.monthly_week_day.value,
          end_times: this.addForm.controls.end_times.value,
          end_date_time: this.addForm.controls.end_date_time.value,
        }
      });

      this.busyService.present('Saving Meeting');
      this.meetingService.add(add);
      this.busyService.dismiss();

      // TODO 
      // toast confirmation of saved meeting
    }

    //   try {
    //     await this.busyService.present('Saving New Meeting');
    //     //await this.meetingService.add({

    //   }
    //   // await this.userService.setName(this.userForm.value.firstName, this.userForm.value.lastInitial);
    //   this.dismiss();
    // } catch(e) {
    //   this.initialize();
    //   await this.toastService.present('Error saving meeting, please try again')
    // } finally {
    //   await this.busyService.dismiss();
    // }
    //   }
  }
}
