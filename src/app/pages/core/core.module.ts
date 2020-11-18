import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { CoreRoutingModule } from './core-routing.module';

import { AboutPage } from './about/about.page';
import { AccountPage } from './account/account.page';
import { LandingPage } from './landing/landing.page';
import { LoginPage } from './login/login.page';
import { LogoutPage } from './logout/logout.page';
import { ProfilePage } from './profile/profile.page';
import { SettingsPage } from './settings/settings.page';
import { SignupPage } from './signup/signup.page';
import { TutorialPage } from './tutorial/tutorial.page';

@NgModule({
  imports: [
    SharedModule,
    CoreRoutingModule
  ],
  declarations: [
    AboutPage,
    AccountPage,
    LandingPage,
    LoginPage,
    LogoutPage,
    ProfilePage,
    SettingsPage,
    SignupPage,
    TutorialPage
  ]
})
export class CoreModule { }
