import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  async ionViewWillEnter() {
    await this.authService.logout();
  }

}
