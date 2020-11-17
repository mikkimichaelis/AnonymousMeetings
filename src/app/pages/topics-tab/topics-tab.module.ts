import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicsTabPageRoutingModule } from './topics-tab-routing.module';

import { TopicsTabPage } from './topics-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicsTabPageRoutingModule
  ],
  declarations: [TopicsTabPage]
})
export class TopicsTabPageModule {}
