
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { from, interval, Observable, of, pipe, Subscription } from 'rxjs';
import { concatMap, delay, map, take } from 'rxjs/operators';
import { BusyService } from 'src/app/services/busy.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {


  /***
   * Just a Bob Ross "Happy litte" LandingPage
   * 
   * Just gonna sit here and be quiet and wait for auth handling to route
   * away and leave me still sitting here quietly in the background.
   * 
   * and whats worse is i'll only ever get used if theres an error
   */

  constructor(private router: Router, private route: ActivatedRoute, private busySvc: BusyService, private authService: AuthService) {
  }

  redirect: Subscription;
  async ionViewDidEnter() {
    this.redirect = from(['redirect']).pipe(
      concatMap(item => of(item).pipe(delay(3000)))
    ).subscribe(redirect => {
      this.router.navigateByUrl('/core/login');
    });
  }

  async ionViewWillLeave() {
    if( !this.redirect.closed ){
      this.redirect.unsubscribe();
    }
  }
}
