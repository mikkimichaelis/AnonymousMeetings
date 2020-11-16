import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTabPageRoutingModule } from './home-tab-routing.module';

import { HomeTabPage } from './home-tab.page';
import { HomeGroupPageModule } from '../home-group/home-group.module';
import { FavoritesPageModule } from '../favorites/favorites.module';
import { ProfilePageModule } from '../profile/profile.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeGroupPageModule,
    FavoritesPageModule,
    ProfilePageModule,
    HomeTabPageRoutingModule
  ],
  declarations: [HomeTabPage]
})
export class HomeTabPageModule {}
