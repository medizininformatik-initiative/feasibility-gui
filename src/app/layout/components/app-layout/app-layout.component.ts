import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav'
import INavItem from '../../models/nav-item.interface'
import { ActivationEnd, Router, RouterEvent } from '@angular/router'
import { Subscription } from 'rxjs'
import { mainNavItems } from '../../../core/constants/navigation'

@Component({
  selector: 'num-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) public drawer: MatSidenav
  isHandset: boolean
  isSideMenuExpanded = true
  private subscriptions = new Subscription()

  mainNavItems = mainNavItems
  currentNavId: string
  currentMainNavItem: INavItem
  currentTabNav: INavItem[] = null
  currentTabNavSelected: string

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((state) => {
      this.isHandset = !!state.matches
    })

    this.subscriptions.add(
      this.router.events.subscribe((event) => this.handleRouterEvent(event as RouterEvent))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  toggleMenu($event): void {
    // On Desktop version do not minimize side menu when choosing item
    if (this.isHandset || !$event?.item) {
      this.isSideMenuExpanded = !this.isSideMenuExpanded
    }
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
