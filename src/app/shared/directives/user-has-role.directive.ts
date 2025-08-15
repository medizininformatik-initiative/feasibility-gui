import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { IUserProfile } from '../models/user/user-profile.interface';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserProfileService } from 'src/app/service/User/UserProfile.service';

/**
 * @deprecated Verify
 */
@Directive({
  selector: '[numUserHasRole]',
})
export class UserHasRoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private oauthService: OAuthService,
    private userProfileService: UserProfileService
  ) {}

  @Input() set numUserHasRole(allowedRoles: string[]) {
    const userRoles: string[] = this.userProfileService.getCurrentProfile().info.realm_access.roles;

    if (allowedRoles && allowedRoles.length) {
      if (userRoles && userRoles.length) {
        if (allowedRoles.some((role) => userRoles.indexOf(role) >= 0)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      } else {
        this.viewContainer.clear();
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
