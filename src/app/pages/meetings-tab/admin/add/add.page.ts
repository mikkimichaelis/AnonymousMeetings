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
      "recurrenceType": ['', []],
      "meetingNumber": ['', [Validators.required, Validators.minLength(3)]],
      "topic": ['', [Validators.required, Validators.minLength(3)]],
      "continuous": ['', [Validators.required, Validators.min(0)]],

      "timezone": ['', [Validators.required, Validators.minLength(3)]],
      "startTime": ['', [Validators.required, Validators.min(0)]],
      "duration": ['', [Validators.required, Validators.min(0)]],


      "repeat_interval": ['', []],
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
