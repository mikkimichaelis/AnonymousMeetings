import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
  ]
})
export class AccountModule { }
