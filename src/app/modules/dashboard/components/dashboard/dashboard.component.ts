import { AppConfigService } from '../../../../config/app-config.service';
import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../service/Feature.service';
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface';
import { OAuthService } from 'angular-oauth2-oidc';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from 'src/app/core/components/snack-bar/snack-bar.component';

@Component({
  selector: 'num-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private appConfig: AppConfigService,
    private oauthService: OAuthService,
    private featureService: FeatureService,
    public translate: TranslateService,
    private snackbar: SnackbarService
  ) {}

  config = this.appConfig.config;
  authTest: string;
  stylesheet: string;
  roles: string[];
  displayInfoMessage: boolean;
  proposalPortalLink: string;

  ngOnInit(): void {
    this.roles = this.featureService.getRoles('main');
    this.init();
    this.stylesheet = this.featureService.getStylesheet();
    this.displayInfoMessage = this.featureService.showInfoPage();
    this.proposalPortalLink = this.featureService.getproposalPortalLink();

    if (this.featureService.showUpdateInfo()) {
      this.snackbar.displayInfoMessage('UPDATE_NOTE');
    }
  }

  async init(): Promise<void> {
    const isLoggedIn = this.oauthService.hasValidAccessToken();
    if (isLoggedIn) {
      const profile: IUserProfile = (await this.oauthService.loadUserProfile()) as IUserProfile;
      const roles = profile.info.realm_access.roles;
      this.authTest = 'Hello ' + profile.info.name;
      if (roles) {
        this.authTest = this.authTest + ', Roles: ' + roles.join(', ');
      }
    } else {
      this.authTest = 'Not logged in';
    }
  }
}
