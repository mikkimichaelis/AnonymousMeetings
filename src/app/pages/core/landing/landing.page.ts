import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  showSign = false;

  constructor(private router: Router, private route: ActivatedRoute, private loading: LoadingService, private authService: AuthService) {
    let authStateUserSubscription = this.authService.authStateUser.subscribe(user => {
      if( user ) {
        this.router.navigateByUrl('/home/tab/home');
      } else {
        this.showSign = true;
        this.router.navigateByUrl('/core/landing');
      }
    })
  }

  async ionViewDidEnter() {
    this.loading.dismiss();
    if( this.route.snapshot.queryParamMap.get('logout') === 'true' ) {
      // this.loading.present();
      await this.authService.logout()
      this.showSign = true;
      // this.loading.dismiss();
    }
    
  }

  ionViewWillLeave() {
    this.loading.dismiss();
  }
  
  async doSign(signup: boolean, anonymous?: boolean, complete?: boolean) {
    if( anonymous === undefined ) {
      this.router.navigate(['/login'], { queryParams: { signup: signup }});
    } else {
      this.loading.present();
      await this.authService.createAnonymous(complete);
      this.loading.dismiss();
    }
  }
}
