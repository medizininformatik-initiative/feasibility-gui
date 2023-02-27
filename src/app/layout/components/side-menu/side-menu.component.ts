import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { routes } from '../../../app-routing.module';
import INavItem from '../../models/nav-item.interface';
import { OAuthService } from 'angular-oauth2-oidc';
import { mainNavItems, secondaryNavItems } from '../../../core/constants/navigation';
import { FeatureService } from '../../../service/feature.service';

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  routes = routes;
  mainNavItems = mainNavItems;
  secondaryNavItems = secondaryNavItems;

  @Input() isSideMenuExpanded = true;
  @Output() toggleSideMenu = new EventEmitter();

  constructor(private oauthService: OAuthService, public featureService: FeatureService) {}

  ngOnInit(): void {
    this.mainNavItems?.forEach((item) => {
      let roles = item.roles ? item.roles : [];
      if (roles[0] === 'main') {
        roles = [].concat(this.featureService.getRoles('main'));
      }
      if (roles[0] === 'option') {
        roles = [].concat(this.featureService.getRoles('optionpage'));
      }
      const routesForNavItem = this.routes.filter((route) => item.routeTo === route.path);

      if (routesForNavItem && routesForNavItem.length > 0) {
        if (routesForNavItem[0].data?.roles) {
          roles = roles.concat(routesForNavItem[0].data?.roles);
        }
      }
      item.roles = roles;
    });
  }

  menuItemClicked($event: Event, item?: INavItem): void {
    if (item?.routeTo === '#logout') {
      this.oauthService.logOut();
    }

    const target = $event.currentTarget as HTMLElement;
    target.blur();
    this.toggleSideMenu.emit({ item });
  }

  showPage(itemRoute): boolean {
    let showIt = true;
    if (itemRoute === 'options' && !this.featureService.useFeatureOptionsPage()) {
      showIt = false;
    }
    return showIt;
  }
}
