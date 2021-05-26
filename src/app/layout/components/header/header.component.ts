import { Component, OnInit } from '@angular/core'
import { OAuthService, UserInfo } from 'angular-oauth2-oidc'

@Component({
  selector: 'num-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profile: UserInfo

  constructor(private oauthService: OAuthService) {}

  ngOnInit(): void {
    this.initProfile()
  }

  async initProfile(): Promise<void> {
    const isLoggedIn = this.oauthService.hasValidAccessToken()
    if (isLoggedIn) {
      this.profile = await this.oauthService.loadUserProfile()
    }
  }
}
