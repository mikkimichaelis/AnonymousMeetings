import { SharedModule } from './shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

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

import { CometchatAngularUiKitModule } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-angular-ui-kit.module';

import { google } from '@google/maps';
import { AgmCoreModule } from '@agm/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctions, AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';

import { FirestoreService } from './services/firestore.service';

import { NgCalendarModule  } from 'ionic2-calendar';

import { TranslateUniversalLoader } from './utils/translateuniversalloader';
import { GroupService, GroupsService, LogService, UserService, AuthService, BusyService, SettingsService, SharedDataService,
  GROUP_SERVICE, SETTINGS_SERVICE, BUSY_SERVICE, USER_SERVICE, GROUPS_SERVICE, 
  LOG_SERVICE, AUTH_SERVICE, ANGULAR_FIRE_AUTH, TRANSLATE_SERVICE, ANGULAR_FIRESTORE, FIRESTORE_SERVICE, 
  ANGULAR_FIRE_FUNCTIONS, TOAST_SERVICE, ToastService } from './services';

import { CoreModule } from './pages/core/core.module';
import { HomeTabPageModule } from './pages/home-tab/home-tab.module';
import { MessagesTabPageModule } from './pages/messages-tab/messages-tab.module';
import { GroupTabPageModule } from './pages/group-tab/group-tab.module';
import { AuthGuard, FeatureGuard } from './guards';

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
    CometchatAngularUiKitModule,
    AgmCoreModule.forRoot({ apiKey: environment.googleCloudConfig.agmKey }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    AngularFirestoreModule,     // AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    NgCalendarModule,
    CoreModule,
    GroupTabPageModule,
    HomeTabPageModule,
    MessagesTabPageModule
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestore,
    TranslateService,
    AngularFireAuth,
    AuthGuard,
    FeatureGuard,

    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.firebaseConfig.useEmulators ? ['localhost', 5001] : undefined },
    { provide: FIRESTORE_SERVICE, useExisting: FirestoreService},
    { provide: ANGULAR_FIRESTORE, useExisting: AngularFirestore},
    { provide: ANGULAR_FIRE_AUTH, useExisting: AngularFireAuth },
    { provide: ANGULAR_FIRE_FUNCTIONS, useExisting: AngularFireFunctions },
    { provide: TRANSLATE_SERVICE, useExisting: TranslateService},
    { provide: AUTH_SERVICE, useExisting: AuthService },
    { provide: LOG_SERVICE, useExisting: LogService },
    { provide: GROUPS_SERVICE, useExisting: GroupsService },
    { provide: GROUP_SERVICE, useExisting: GroupService },
    { provide: USER_SERVICE, useExisting: UserService },
    { provide: BUSY_SERVICE, useExisting: BusyService },
    { provide: TOAST_SERVICE, useExisting: ToastService },
    { provide: SETTINGS_SERVICE, useExisting: SettingsService },
    SharedDataService,

    // { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.firebaseConfig.useEmulators ? ['localhost', 5001] : undefined },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
