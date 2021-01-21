import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BUSY_SERVICE, IBusyService, IToastService, IUserService, MEETING_SERVICE, TOAST_SERVICE, USER_SERVICE } from '../../../services';
import { IMeeting, IUser, Meeting } from 'src/shared/models';
import { IMeetingService } from 'src/app/services/meeting.service.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  @Input() meeting: IMeeting;

  meetingForm: FormGroup;
  user: IUser;

  get showRecurrence(): boolean {
    return this.meetingForm.controls.continuous.value === false;
  }

  get recurrenceType(): string {
    return this.meetingForm.controls.recurrenceType.value;
  }

  get formControls() {
    return this.meetingForm.controls;
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

    if (this.meeting) {
      this.update = true;
    } else {
      this.update = false;
      this.meeting = new Meeting();
    }

    this.initialize();
  }

  initialize() {
    this.meetingForm = this.formBuilder.group({
      "id": [this.meeting.zid, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      "owner": [this.meeting.isZoomOwner, [Validators.min(0)]],
      "name": [this.meeting.name, [Validators.required,]],
      "password": [this.meeting.password],
      "topic": [this.meeting.topic],
      "continuous": [this.meeting.continuous, [Validators.min(0)]],

      "timezone": [this.meeting.timezone, [Validators.required]],
      "startTime": [this.meeting.startTime, [Validators.required, Validators.min(0)]],
      "duration": [this.meeting.duration.toString(), [Validators.required, Validators.min(0)]],

      "recurrenceType": [this.meeting.recurrence.type.toString(), [Validators.required]],
      "weekly_day": [this.meeting.recurrence.weekly_day, []],
      // "weekly_days": [this.meeting.recurrence.weekly_days, []],
      // "monthly_day": [this.meeting.recurrence.monthly_day, []],
      // "monthly_week": [this.meeting.recurrence.monthly_week, []],
      // "monthly_week_day": [this.meeting.recurrence.monthly_week_day, []],
      // "end_times": [this.meeting.recurrence.end_times, []],
      // "end_date_time": [this.meeting.recurrence.end_date_time, []],

    })
  }

  async dismiss() {
    if (!this.meetingForm.dirty) {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Unsaved changes!',
        message: 'Save or Discard changes?',
        buttons: [
          {
            text: 'Save',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.submitForm();
              this.modalCtrl.dismiss({
                'saved': true
              });
            }
          }, {
            text: 'Discard',
            handler: () => {
              this.modalCtrl.dismiss({
                'dismissed': true
              });
            }
          }
        ]
      });

      await alert.present();
    }
  }

  async submitForm() {
    if (this.meetingForm.valid) {
      const meeting = new Meeting(<any>{
        id: this.meeting.id,
        zid: this.meetingForm.controls.id.value,
        uid: this.userService.user.id,
        isZoomOwner: this.meetingForm.controls.owner.value,
        name: this.meetingForm.controls.name.value,
        password: this.meetingForm.controls.password.value,
        topic: this.meetingForm.controls.topic.value,
        continuous: this.meetingForm.controls.continuous.value,

        timezone: this.meetingForm.controls.timezone.value,
        startTime: this.meetingForm.controls.startTime.value,
        duration: this.meetingForm.controls.duration.value,
        mills: 0,

        recurrence: {
          type: this.meetingForm.controls.recurrenceType.value,
          repeat_interval: null,

          //weekly_day: this.meetingForm.controls.weekly_day.value,
          weekly_days: [this.meetingForm.controls.weekly_day.value],

          // monthly_day: this.meetingForm.controls.monthly_day.value,
          // monthly_week: this.meetingForm.controls.monthly_week.value,
          // monthly_week_day: this.meetingForm.controls.monthly_week_day.value,
          // end_times: this.meetingForm.controls.end_times.value,
          // end_date_time: this.meetingForm.controls.end_date_time.value,
        }
      });

      meeting.updateDayTime();

      let rv: boolean;
      this.busyService.present('Saving Meeting');
      if (this.update) {
        rv = await this.meetingService.update(meeting);
      } else {
        rv = await this.meetingService.add(meeting);
      }
      this.busyService.dismiss();
      if (rv) {
        this.toastService.present('Meeting Saved');
        this.modalCtrl.dismiss({
          'saved': true
        });
      } else {
        this.toastService.present('Error Saving Meeting');  // TODO make red
        this.modalCtrl.dismiss({
          'saved': false
        });
      }


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
