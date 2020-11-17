import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecretaryTabPageRoutingModule } from './secretary-tab-routing.module';

import { SecretaryTabPage } from './secretary-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecretaryTabPageRoutingModule
  ],
  declarations: [SecretaryTabPage]
})
export class SecretaryTabPageModule {}
