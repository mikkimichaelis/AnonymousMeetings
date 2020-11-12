import { SharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
