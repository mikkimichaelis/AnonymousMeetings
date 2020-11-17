import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Feature } from '../enums/feature.enum';
import { TranslateUniversalLoader } from './translateuniversalloader';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if( this.userService.hasFeature(Feature.HomeGroup) ) {
      return true;
    } else {
      return false;
    }
  }
}