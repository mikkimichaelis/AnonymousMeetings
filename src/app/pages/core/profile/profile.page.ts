import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userForm: FormGroup;
  submitAttempt = false;
  user: any

  constructor( private formBuilder: FormBuilder, private location: Location, private userService: UserService) {
    this.user = Object.assign({}, this.userService.user);
    this.userForm = this.formBuilder.group({
      "firstName": [this.user.firstName, [Validators.required, Validators.minLength(2)]],
      "lastInitial": [this.user.lastInitial, [Validators.required, Validators.maxLength(1)]],
    })
   }

  ngOnInit() {}

  ionViewWillEnter() {
    // make a copy of current user
    this.user = Object.assign({}, this.userService.user);
  }

  async submitForm() {
    this.submitAttempt = true;
    if( this.userForm.valid) {

      await this.userService.saveUserAsync(this.userForm.value);
      this.location.back();
    }
  }

}
