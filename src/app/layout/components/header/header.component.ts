import { AboutModalComponent } from '../about-modal/about-modal.component';
import { ActuatorInformationService } from 'src/app/service/Actuator/ActuatorInformation.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FeatureProviderService } from 'src/app/service/FeatureProvider.service';
import { FeatureService } from '../../../service/Feature.service';
import { IUserProfile } from '../../../shared/models/user/user-profile.interface';
import { MatDialog } from '@angular/material/dialog';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserProfileService } from 'src/app/service/User/UserProfile.service';

@Component({
  selector: 'num-dataportal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  profile: IUserProfile;
  stylesheet: string;
  urlSrc: string;
  urlAlt: string;
  proposalPortalLink: string;

  constructor(
    private oauthService: OAuthService,
    private featureProviderService: FeatureProviderService,
    public featureService: FeatureService,
    private matDialog: MatDialog,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.initProfile();
    this.stylesheet = this.featureService.getStylesheet();
  }
  ngAfterViewInit(): void {
    this.featureProviderService.setTheme(this.stylesheet, this.stylesheet);
  }

  async initProfile(): Promise<void> {
    const isLoggedIn = this.oauthService.hasValidAccessToken();
    if (isLoggedIn) {
      this.profile = this.userProfileService.getCurrentProfile();
    }
  }
  public logout() {
    this.oauthService.logOut();
  }

  public getActuatorInfo() {
    this.matDialog.open(AboutModalComponent, {});
  }

  public navigateToProposalPortal() {
    this.proposalPortalLink = this.featureService.getProposalPortalLink();
    window.open(this.proposalPortalLink, '_blank');
  }
}
