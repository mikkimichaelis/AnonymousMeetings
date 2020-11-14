import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  showSign = false;

  constructor(private router: Router, private authService: AuthService) {
    debugger;
    let authStateUserSubscription = this.authService.authStateUser.subscribe(user => {
      if( user ) {
        this.router.navigateByUrl('/home');
      } else {
        this.showSign = true;
        this.router.navigateByUrl('/landing');
      }
    })
  }

  doSign(signup: boolean, anonymous?: boolean, complete?: boolean) {
    if( anonymous === undefined ) {
      this.router.navigate(['/login'], { queryParams: { signup: signup }});
    } else {
      this.authService.createAnonymous(complete);
    }
  }
}
