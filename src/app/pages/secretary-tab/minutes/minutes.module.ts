import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinutesPageRoutingModule } from './minutes-routing.module';

import { MinutesPage } from './minutes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinutesPageRoutingModule
  ],
  declarations: [MinutesPage]
})
export class MinutesPageModule {}
