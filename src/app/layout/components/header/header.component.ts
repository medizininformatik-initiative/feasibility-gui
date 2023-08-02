import { AfterViewInit, Component, OnInit } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { FeatureProviderService } from '../../../modules/querybuilder/service/feature-provider.service'
import { FeatureService } from '../../../service/feature.service'
import { IUserProfile } from '../../../shared/models/user/user-profile.interface'

@Component({
  selector: 'num-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  profile: IUserProfile
  stylesheet: string
  urlSrc: string
  urlAlt: string

  constructor(
    private oauthService: OAuthService,
    private featureProviderService: FeatureProviderService,
    public featureService: FeatureService
  ) {}

  ngOnInit(): void {
    this.initProfile()
    this.stylesheet = this.featureService.getStylesheet()
  }
  ngAfterViewInit(): void {
    this.featureProviderService.setTheme(this.stylesheet, this.stylesheet)
  }

  async initProfile(): Promise<void> {
    const isLoggedIn = this.oauthService.hasValidAccessToken()
    if (isLoggedIn) {
      this.profile = (await this.oauthService.loadUserProfile()) as IUserProfile
    }
  }
}
