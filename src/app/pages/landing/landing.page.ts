import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  showLanding = false;

  constructor(private router: Router, private authService: AuthService) {
    let authStateUserSubscription = this.authService.authStateUser.subscribe(user => {
      if( user ) {
        this.router.navigateByUrl('/home');
      } else {
        this.showLanding = true;
        this.router.navigateByUrl('/landing');
      }
    })
  }

  doSignIn() {
    this.router.navigate(['/login']);
  }

  doSignUp() {
    this.router.navigate(['/login'], { queryParams: { signup: true }});
  }

  doAnonymous(complete?:boolean) {
    this.authService.createAnonymous(complete);
  }

  ngOnInit() {
  }

}
