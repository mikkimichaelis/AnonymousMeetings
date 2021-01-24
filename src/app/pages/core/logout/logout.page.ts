import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { AUTH_SERVICE, IAuthService } from 'src/app/services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router: Router, @Inject(AUTH_SERVICE) private authService: IAuthService) { }

  ngOnInit() {
    console.log('LogoutPage.ngOnInit()');
  }

  redirect: any;
  async ionViewWillEnter() {
    console.log('LogoutPage.ionViewWillEnter()');
    await this.authService.logout();
    this.redirect = from(['/core/login']).pipe(
      concatMap(item => of(item).pipe(delay(2000))) // TODO  config
    ).subscribe(async redirect => {
      await this.authService.logout()
      console.log(`logout.page.ionViewWillEnter().redirect => navigateByUrl("${redirect}"`);
      this.router.navigateByUrl(redirect);
    });
  }

  async ionViewWillLeave() {
    if (this.redirect.closed) {
      console.log('LogoutPage.ionViewWillLeave():');
    } else {
      this.redirect.unsubscribe();
      console.log('LogoutPage.ionViewWillLeave().redirect.unsubscribe()');
    }
  }
}
