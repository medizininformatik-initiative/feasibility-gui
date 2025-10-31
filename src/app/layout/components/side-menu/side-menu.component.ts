import INavItem from '../../models/nav-item.interface';
import { mainNavItems } from '../../../core/constants/navigation';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  mainNavItems = mainNavItems;
  @Input() isSideMenuExpanded = true;

  constructor() {}

  ngOnInit(): void {}

  menuItemClicked($event: Event, item?: INavItem): void {
    const target = $event.currentTarget as HTMLElement;
    target.blur();
  }

  public toggleMenu(): void {
    this.isSideMenuExpanded = !this.isSideMenuExpanded;
  }
}
