import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Feature } from '../enums/feature.enum';
import { TranslateUniversalLoader } from '../utils/translateuniversalloader';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let features = route.data.roles as Array<string>;
    if( this.userService.hasFeature(features) ) {
      return true;
    } else {
      return false;
    }
  }
}
