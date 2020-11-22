import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { GroupsTabPageRoutingModule } from './groups-tab-routing.module';

import { GroupsTabPage } from './groups-tab.page';
import { FavoritesPage } from './favorites/favorites.page';
import { MapPage } from './map/map.page';
import { SearchPage } from './search/search.page';
import { SearchSettingsPage } from './search/search-settings/search-settings.page';

@NgModule({
  imports: [
    SharedModule,
    GroupsTabPageRoutingModule
  ],
  declarations: [
    GroupsTabPage,
    FavoritesPage,
    MapPage,
    SearchPage,
    SearchSettingsPage
  ]
})
export class GroupsTabPageModule {}
