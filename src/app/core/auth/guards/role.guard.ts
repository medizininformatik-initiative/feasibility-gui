import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { IUserProfile } from '../../../shared/models/user/user-profile.interface';
import { FeatureService } from '../../../service/Feature.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanLoad {
  constructor(private oauthService: OAuthService, public featureService: FeatureService) {}

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
        expandedAllowedRoles = expandedAllowedRoles.concat(this.featureService.getRoles('main'));
      } else if (role === 'option') {
        expandedAllowedRoles = expandedAllowedRoles.concat(this.featureService.getRoles('optionpage'));
      } else {
        expandedAllowedRoles.push(role);
      }
    });

    const isLoggedIn = this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();

    if (!isLoggedIn) {
      await this.oauthService.loadDiscoveryDocumentAndLogin({ customRedirectUri: redirectUri });
    }

    let userRoles: string[];
    await this.oauthService.loadUserProfile().then((userinfo: IUserProfile) => {
      userRoles = userinfo.info.realm_access.roles;
    });

    if (userRoles) {
      return Promise.resolve(expandedAllowedRoles.some((role) => userRoles.indexOf(role) >= 0));
    }
    return Promise.resolve(false);
  }
}
