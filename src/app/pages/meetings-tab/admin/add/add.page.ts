import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BUSY_SERVICE, IBusyService, IToastService, IUserService, TOAST_SERVICE, USER_SERVICE } from '../../../../services';
import { IUser } from 'src/shared/models';

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
    @Inject(USER_SERVICE) private userService: IUserService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  ionViewWillEnter() {

  }

  initialize() {
    this.addForm = this.formBuilder.group({
      "name": ['', [Validators.required, ]],
      "meetingNumber": ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999), Validators.minLength(10)]],
      "topic": ['', [Validators.required, Validators.minLength(5)]],
      "continuous": [false, [Validators.min(0)]],

      "timezone": ['', [Validators.required]],
      "startTime": ['', [Validators.required, Validators.min(0)]],
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

  add() {
    this.busyService.present("Retrieving Zoom Meeting");
  }

  async submitForm() {
    if (this.addForm.valid) {
      try {
        await this.busyService.present('Saving New Meeting');
        // await this.userService.setName(this.userForm.value.firstName, this.userForm.value.lastInitial);
        this.dismiss();
      } catch (e) {
        this.initialize();
        await this.toastService.present('Error saving meeting, please try again')
      } finally {
        await this.busyService.dismiss();
      }
    }
  }
}
