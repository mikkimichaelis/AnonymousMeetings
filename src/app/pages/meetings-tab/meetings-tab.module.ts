import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { MeetingsTabPageRoutingModule } from './meetings-tab-routing.module';

import { MeetingsTabPage } from './meetings-tab.page';
import { FavoritesPage } from './favorites/favorites.page';
import { MapPage } from './map/map.page';
import { SearchPage } from './search/search.page';

@NgModule({
  imports: [
    SharedModule,
    MeetingsTabPageRoutingModule
  ],
  declarations: [
    MeetingsTabPage,
    FavoritesPage,
    MapPage,
    SearchPage
  ]
})
export class MeetingsTabPageModule {}
