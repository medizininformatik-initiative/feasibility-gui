import { AboutModalComponent } from '../about-modal/about-modal.component';
import { AppSettingsProviderService } from 'src/app/service/Config/AppSettingsProvider.service';
import { Component, OnInit } from '@angular/core';
import { IUserProfile } from '../../../shared/models/user/user-profile.interface';
import { MatDialog } from '@angular/material/dialog';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserProfileService } from 'src/app/service/User/UserProfile.service';

@Component({
  selector: 'num-dataportal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profile: IUserProfile;
  stylesheet: string;
  urlSrc: string;
  urlAlt: string;
  proposalPortalLink: string;

  constructor(
    private oauthService: OAuthService,
    public appSettingsProviderService: AppSettingsProviderService,
    private matDialog: MatDialog,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.initProfile();
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
    this.proposalPortalLink = this.appSettingsProviderService.getProposalPortalLink();
    window.open(this.proposalPortalLink, '_blank');
  }
}
