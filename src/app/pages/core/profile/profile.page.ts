import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IUserBLLService, IUserService, USER_BLL_SERVICE, USER_SERVICE } from 'src/app/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userForm: FormGroup;
  user: any

  constructor( private formBuilder: FormBuilder, 
    private location: Location, 
    @Inject(USER_BLL_SERVICE) private userBLLService: IUserBLLService,
    @Inject(USER_SERVICE) private userService: IUserService) {
      
    this.user = Object.assign({}, this.userService.user);
    this.userForm = this.formBuilder.group({
      "firstName": [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      "lastInitial": [this.user.lastInitial, [Validators.required, Validators.maxLength(1)]],
    })
   }

  ngOnInit() {}

  ionViewWillEnter() {
    // make a copy of current user
    this.user = this.userService.user.serialize();
  }

  async submitForm() {
    if( this.userForm.valid) {
      this.userBLLService.setName(this.userService.user);
      await this.userService.saveUserAsync(this.userForm.value);
      this.location.back();
    }
  }

}
