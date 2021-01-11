import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { MeetingsTabPageRoutingModule } from './meetings-tab-routing.module';

import { MeetingsTabPage } from './meetings-tab.page';
import { FavoritesPage } from './favorites/favorites.page';
import { SearchPage } from './search/search.page';
import { MapPage } from './search/map/map.page';
import { SearchSettingsPage } from './search/search-settings/search-settings.page';
import { AdminPage } from './admin/admin.page';
import { AddPage } from './admin/add/add.page';

@NgModule({
  imports: [
    SharedModule,
    MeetingsTabPageRoutingModule,
    AgmCoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    MeetingsTabPage,
    FavoritesPage,
    SearchPage,
    MapPage,
    SearchSettingsPage,
    AdminPage,
    AddPage
  ]
})
export class MeetingsTabPageModule {}
