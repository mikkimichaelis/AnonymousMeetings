import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupTabPageRoutingModule } from './group-tab-routing.module';

import { GroupTabPage } from './group-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupTabPageRoutingModule
  ],
  declarations: [GroupTabPage]
})
export class GroupTabPageModule {}
