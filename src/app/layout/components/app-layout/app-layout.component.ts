import INavItem from '../../models/nav-item.interface';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { mainNavItems } from '../../../core/constants/navigation';
import { MatSidenav } from '@angular/material/sidenav';
import { routeAnimations } from 'src/app/route-animations';

@Component({
  selector: 'num-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  animations: [routeAnimations],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) public drawer: MatSidenav;
  isHandset: boolean;
  isSideMenuExpanded = true;
  private subscriptions = new Subscription();
  showSideNav = true;

  mainNavItems = mainNavItems;
  currentNavId: string;
  currentMainNavItem: INavItem;
  currentTabNav: INavItem[] = null;
  currentTabNavSelected: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((state) => {
      this.isHandset = !!state.matches;
    });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute.firstChild),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.showSideNav = data.hideSideNav ?? true;
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleRouterEvent(routerEvent: ActivationEnd): void {
    this.currentTabNavSelected = routerEvent.snapshot.firstChild?.data?.tabNavId;

    const navId = routerEvent.snapshot.data.navId;
    if (navId !== this.currentNavId) {
      this.currentNavId = navId;
      this.setHeader();
    }
  }

  setHeader(): void {
    const navItem = this.mainNavItems.find((item) => item.routeTo === this.currentNavId);
    if (navItem?.routeTo === 'options') {
      this.currentMainNavItem = navItem;
    } else {
      this.currentMainNavItem = undefined;
    }
    this.currentTabNav = navItem?.tabNav;
  }
}
