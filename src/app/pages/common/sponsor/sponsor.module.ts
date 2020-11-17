import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SponsorPageRoutingModule } from './sponsor-routing.module';

import { SponsorPage } from './sponsor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SponsorPageRoutingModule
  ],
  declarations: [SponsorPage]
})
export class SponsorPageModule {}
