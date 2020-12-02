import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BusyService } from 'src/app/services/busy.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  showSign = false;

  constructor(private router: Router, private route: ActivatedRoute, private busySvc: BusyService, private authService: AuthService) {
    // let authStateUserSubscription = this.authService.authUser$.subscribe(user => {
    //   if( user ) {
    //     this.router.navigateByUrl('/home/tab/home');
    //   } else {
    //     this.doSignup(true);
    //     // this.showSign = true;
    //     // this.router.navigateByUrl('/core/landing');
    //   }
    // })
  }

  async ionViewDidEnter() {
    this.busySvc.dismiss();
    if( this.route.snapshot.queryParamMap.get('logout') === 'true' ) {
      // this.busySvc.present();
      await this.authService.logout()
      this.showSign = true;
      // this.busySvc.dismiss();
    }
    
  }

  ionViewWillLeave() {
    this.busySvc.dismiss();
  }
  
  async doSignup(anonymous: boolean) {
    if( anonymous === undefined || anonymous === false ) {
      this.router.navigate(['/login'], { queryParams: { signup: true }});
    } else {
      this.busySvc.present();
      await this.authService.createAnonymous();
      this.busySvc.dismiss();
    }
  }

  // async doSign(signup: boolean, anonymous?: boolean) {
  //   if( anonymous === undefined || anonymous === false ) {
  //     this.router.navigate(['/login'], { queryParams: { signup: signup }});
  //   } else {
  //     this.busySvc.present();
  //     await this.authService.createAnonymous();
  //     this.busySvc.dismiss();
  //   }
  // }
}
