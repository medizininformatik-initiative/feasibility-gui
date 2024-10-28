import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { FeatureService } from '../../../service/Feature.service';
import { IUserProfile } from '../../../shared/models/user/user-profile.interface';
import { FeatureProviderService } from 'src/app/modules/feasibility-query/service/feature-provider.service';

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

  constructor(
    private oauthService: OAuthService,
    private featureProviderService: FeatureProviderService,
    public featureService: FeatureService
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
      this.profile = (await this.oauthService.loadUserProfile()) as IUserProfile;
    }
  }
  public logout() {
    this.oauthService.logOut();
  }
}
