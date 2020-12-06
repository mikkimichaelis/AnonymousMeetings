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

  showLanding = false;

  constructor(private router: Router, private route: ActivatedRoute, private busySvc: BusyService, private authService: AuthService) { 
  }

  async ionViewDidEnter() {
    this.showLanding = this.route.snapshot.queryParams.showLanding;
  }

  ionViewWillLeave() {
    this.busySvc.dismiss();
  }
  
  async doSign(anonymous: boolean, signup: boolean) {
    if( anonymous ) {
      this.busySvc.present();
      await this.authService.createAnonymous();
      this.busySvc.dismiss();
    } else {
      this.router.navigate(['/core/login'], { queryParams: { signup: signup }});
    }
  }
}
