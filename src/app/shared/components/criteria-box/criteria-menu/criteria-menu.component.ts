import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/MenuService/MenuService.service';

@Component({
  selector: 'num-criteria-menu',
  templateUrl: './criteria-menu.component.html',
  styleUrls: ['./criteria-menu.component.scss'],
})
export class CriteriaMenuComponent implements OnInit {
  @Input() criterionUuid: string;

  menuItems = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems(this.criterionUuid); // Pass UUID to getMenuItems
  }
}
