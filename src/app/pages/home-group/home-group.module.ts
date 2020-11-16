import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeGroupPageRoutingModule } from './home-group-routing.module';

import { HomeGroupPage } from './home-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeGroupPageRoutingModule
  ],
  declarations: [HomeGroupPage]
})
export class HomeGroupPageModule {}
