import { SharedModule } from './shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { google } from '@google/maps';
import { AgmCoreModule } from '@agm/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { TranslateUniversalLoader } from './classes/translateuniversalloader';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LogService } from './services/log.service';
import { GroupsService } from './services/groups.service';
import { LoadingService } from './services/loading.service';
import { SettingsService } from './services/settings.service';

import { AuthGuard } from './classes/auth.guard';

import { CoreModule } from './pages/core/core.module';

import { HomeTabPageModule } from './pages/home-tab/home-tab.module';
import { GroupTabPageModule } from './pages/group-tab/group-tab.module';
import { FeatureGuard } from './classes/feature.guard';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateUniversalLoader
      }
    }),
    AgmCoreModule.forRoot({ apiKey: environment.googleCloudConfig.agmKey }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CoreModule,
    GroupTabPageModule,
    HomeTabPageModule
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireDatabase,
    AngularFirestore,
    TranslateService,

    AuthService,
    LogService,
    GroupsService,
    UserService,
    LoadingService,
    SettingsService,


    AuthGuard,
    FeatureGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
