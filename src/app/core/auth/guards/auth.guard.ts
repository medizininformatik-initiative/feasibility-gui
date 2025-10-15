import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const redirectUri = window.location.origin + state.url;
    return Promise.resolve(true);
  }

  canLoad(route: Route): Promise<boolean> {
    const redirectUri = window.location.origin + '/' + route.path;
    return Promise.resolve(true); //this.isAllowed(route, redirectUri);
  }
}
