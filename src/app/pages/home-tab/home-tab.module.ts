import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { HomeTabPageRoutingModule } from './home-tab-routing.module';

import { HomeTabPage } from './home-tab.page';
import { HomePage } from './home/home.page';
import { FriendsPage } from './friends/friends.page';
import { AttendancePage } from './attendance/attendance.page';

import { NbThemeModule } from '@nebular/theme';
import { LivePage } from './live/live.page';
import { FavoritesPage } from './favorites/favorites.page';
import { MeetingListingComponent } from 'src/app/components/meeting-listing/meeting-listing.component';


@NgModule({
  imports: [
    SharedModule,
    HomeTabPageRoutingModule,
    NbThemeModule
  ],
  declarations: [
    HomeTabPage, 
    HomePage,
    FriendsPage,
    AttendancePage,
    LivePage,
    FavoritesPage
  ],
  providers: [
  ]
})
export class HomeTabPageModule {}
