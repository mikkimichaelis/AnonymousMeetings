import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateUniversalLoader } from './translateuniversalloader';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if( this.authService.isAuthenticated() ) {
      return true;
    } else {
      this.router.navigate(['/landing']);
      return false;
    }
  }
}
