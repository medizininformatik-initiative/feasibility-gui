/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppConfigService } from '../../../../config/app-config.service';
import { FeatureService } from '../../../../service/feature.service';
import { TranslateService } from '@ngx-translate/core';
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface';

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
    public translate: TranslateService
  ) {}

  config = this.appConfig.config;
  authTest: string;
  stylesheet: string;
  roles: string[];
  displayInfoMessage: boolean;

  ngOnInit(): void {
    this.roles = this.featureService.getRoles('main');
    this.init();
    this.stylesheet = this.featureService.getStylesheet();
    this.displayInfoMessage = this.featureService.showInfoPage();
  }

  newQuery(): void {}

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
