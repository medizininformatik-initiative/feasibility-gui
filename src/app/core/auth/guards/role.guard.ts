import { AppSettingsProviderService } from 'src/app/service/Config/AppSettingsProvider.service';
import { Injectable } from '@angular/core';
import { UserProfileService } from 'src/app/service/User/UserProfile.service';
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
export class RoleGuard implements CanActivate, CanLoad {
  constructor(
    public appSettingsProviderService: AppSettingsProviderService,
    private userProfileService: UserProfileService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const redirectUri = window.location.origin + state.url;
    return this.isAllowed(route, redirectUri);
  }

  canLoad(route: Route): Promise<boolean> {
    const redirectUri = window.location.origin + '/' + route.path;
    return this.isAllowed(route, redirectUri);
  }
  async isAllowed(route: ActivatedRouteSnapshot | Route, redirectUri: string): Promise<boolean> {
    const allowedRoles = route.data?.roles;
    if (!(allowedRoles instanceof Array) || allowedRoles.length === 0) {
      return Promise.resolve(true);
    }

    let expandedAllowedRoles = [];

    allowedRoles.forEach((role) => {
      if (role === 'main') {
        expandedAllowedRoles = expandedAllowedRoles.concat(
          this.appSettingsProviderService.getAuthRoles()
        );
      } else {
        expandedAllowedRoles.push(role);
      }
    });

    const userRoles: string[] = this.userProfileService.getCurrentProfile().info.realm_access.roles;
    if (userRoles) {
      return Promise.resolve(expandedAllowedRoles.some((role) => userRoles.indexOf(role) >= 0));
    }
    return Promise.resolve(false);
  }
}
