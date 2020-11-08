import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapPage } from './map';
import { MapPageRoutingModule } from './map-routing.module';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule,
    AgmCoreModule
  ],
  declarations: [
    MapPage,
  ]
})
export class MapModule { }
