import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { GroupListPage } from './group-list';
import { GroupListPageRoutingModule } from './group-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GroupListPageRoutingModule
  ],
  declarations: [GroupListPage],
})
export class GroupListModule {}
