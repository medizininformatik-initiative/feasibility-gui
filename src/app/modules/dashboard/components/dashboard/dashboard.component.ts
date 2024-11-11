import { AppConfigService } from '../../../../config/app-config.service';
import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../service/Feature.service';
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { TranslateService } from '@ngx-translate/core';
import { ErrorCodes, SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';

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
    private snackbar: SnackbarService,
    private navigationHelperService: NavigationHelperService,
    private test: SnackbarService
  ) {}

  config = this.appConfig.config;
  authTest: string;
  roles: string[];
  displayInfoMessage: boolean;
  proposalPortalLink: string;

  ngOnInit(): void {
    this.roles = this.featureService.getRoles('main');
    this.init();
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

  public navigateToDataQueryEditor() {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }

  public navigateToQueryBuilderEditor() {
    this.navigationHelperService.navigateToFeasibilityQueryEditor();
  }

  public navigateToDataSelectionEditor() {
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  public navigateToSavedQueries() {
    this.navigationHelperService.navigateToSavedQueries();
  }

  public openProposalPortalLink(): void {
    window.open(this.proposalPortalLink, '_blank', 'noopener');
  }
}
