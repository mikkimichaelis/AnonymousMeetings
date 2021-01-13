import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import LogRocket from 'logrocket';
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
  }

  redirect: any;
  async ionViewWillEnter() {
    await this.authService.logout();
    this.redirect = from(['/core/login']).pipe(
      concatMap(item => of(item).pipe(delay(2000))) // TODO  config
    ).subscribe(async redirect => {
      LogRocket.log(`logout.page.ionViewWillEnter().redirect.subscribe() => navigateByUrl("${redirect}"`);
      await this.authService.logout()
      this.router.navigateByUrl(redirect);
    });
  }

  async ionViewWillLeave() {
    if( !this.redirect.closed ){
      this.redirect.unsubscribe();
    }
  }
}
