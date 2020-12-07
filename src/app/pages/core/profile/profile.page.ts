import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BUSY_SERVICE, IBusyService, IToastService, IUserBLLService, IUserService, TOAST_SERVICE, USER_BLL_SERVICE, USER_SERVICE } from '../../../services';
import { IUser } from 'src/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userForm: FormGroup;
  user: IUser;

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(TOAST_SERVICE) private toastService: IToastService,
    @Inject(USER_BLL_SERVICE) private userBLLService: IUserBLLService,
    @Inject(USER_SERVICE) private userService: IUserService) {
      this.initialize();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.initialize();
  }

  initialize() {
    this.user = this.userService.user.serialize();
    this.userForm = this.formBuilder.group({
      "firstName": [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      "lastInitial": [this.user.lastInitial, [Validators.required, Validators.maxLength(1)]],
    })
  }

  async submitForm() {
    if (this.userForm.valid) {
      try {
        this.busyService.present('Saving Changes');
        await this.userService.setName(this.userForm.value.firstName, this.userForm.value.lastInitial);
        this.location.back();
      } catch (e) {
        this.initialize();
        this.toastService.present('Error saving changes')
      } finally {
        this.busyService.dismiss();
      }
    }
  }
}
