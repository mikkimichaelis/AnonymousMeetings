import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { SignupPageModule } from './signup/signup.module';

import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountRoutingModule
  ],
  declarations: [
  ]
})
export class AccountModule { }
