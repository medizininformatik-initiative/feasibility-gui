import { Component, OnInit } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { AppConfigService } from '../../../../config/app-config.service'
import { FeatureService } from '../../../../service/feature.service'

@Component({
  selector: 'num-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private appConfig: AppConfigService,
    private oauthService: OAuthService,
    private featureService: FeatureService
  ) {}

  config = this.appConfig.config
  authTest: string
  stylesheet: string

  ngOnInit(): void {
    this.init()
    this.stylesheet = this.featureService.getStylesheet()
  }

  newQuery(): void {}

  async init(): Promise<void> {
    const isLoggedIn = this.oauthService.hasValidAccessToken()
    if (isLoggedIn) {
      const profile = await this.oauthService.loadUserProfile()
      const roles = profile.groups
      this.authTest = 'Hello ' + profile.name
      if (roles) {
        this.authTest = this.authTest + ', Roles: ' + roles.join(', ')
      }
    } else {
      this.authTest = 'Not logged in'
    }
  }
}
