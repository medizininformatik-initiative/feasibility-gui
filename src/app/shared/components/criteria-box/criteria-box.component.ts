import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MatMenuTrigger } from '@angular/material/menu';
import { MenuItemInterface } from 'src/app/service/MenuService/MenuItemInterface';
import { MenuServiceCriterion } from '../../service/MenuServiceCriterion';

@Component({
  selector: 'num-criteria-box',
  templateUrl: './criteria-box.component.html',
  styleUrls: ['./criteria-box.component.scss'],
})
export class CriteriaBoxComponent implements OnInit {
  @Input()
  criterion: Criterion;

  menuItems: MenuItemInterface[] = [];

  constructor(private menuService: MenuServiceCriterion) {}

  ngOnInit() {
    this.getMenuItems();
  }

  getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForCriterion();
  }
}
