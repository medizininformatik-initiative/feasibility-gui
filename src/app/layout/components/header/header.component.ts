import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivationEnd, Router, RouterEvent } from '@angular/router'
import { Subscription } from 'rxjs'
import INavItem from '../../models/nav-item.interface'
import { mainNavItems } from '../../../core/constants/navigation'
import { OAuthService, UserInfo } from 'angular-oauth2-oidc'

@Component({
  selector: 'num-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  mainNavItems = mainNavItems
  currentNavId: string
  currentMainNavItem: INavItem
  currentTabNav: INavItem[] = null
  currentTabNavSelected: string

  profile: UserInfo

  constructor(private router: Router, private oauthService: OAuthService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.subscribe((event) => this.handleRouterEvent(event as RouterEvent))
    )
    this.initProfile()
  }

  async initProfile(): Promise<void> {
    const isLoggedIn = this.oauthService.hasValidAccessToken()
    if (isLoggedIn) {
      this.profile = await this.oauthService.loadUserProfile()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof ActivationEnd) {
      this.currentTabNavSelected = routerEvent.snapshot.firstChild?.data?.tabNavId

      const navId = routerEvent.snapshot.data.navId
      if (navId !== this.currentNavId) {
        this.currentNavId = navId
        this.setHeader()
      }
    }
  }

  setHeader(): void {
    const navItem = this.mainNavItems.find((item) => item.routeTo === this.currentNavId)
    this.currentMainNavItem = navItem
    this.currentTabNav = navItem?.tabNav
  }
}
