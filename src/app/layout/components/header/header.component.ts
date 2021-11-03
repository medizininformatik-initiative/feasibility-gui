import { AfterViewInit, Component, OnInit } from '@angular/core'
import { OAuthService, UserInfo } from 'angular-oauth2-oidc'
import { FeatureProviderService } from '../../../modules/querybuilder/service/feature-provider.service'

@Component({
  selector: 'num-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  profile: UserInfo
  stylesheet: string
  urlSrc: string
  urlAlt: string

  constructor(
    private oauthService: OAuthService,
    private featureProviderService: FeatureProviderService
  ) {}

  ngOnInit(): void {
    this.initProfile()
    this.stylesheet = this.featureProviderService.getFeatures().stylesheet
  }
  ngAfterViewInit(): void {
    this.featureProviderService.setTheme(this.stylesheet, this.stylesheet)
  }

  async initProfile(): Promise<void> {
    const isLoggedIn = this.oauthService.hasValidAccessToken()
    if (isLoggedIn) {
      this.profile = await this.oauthService.loadUserProfile()
    }
  }
}
