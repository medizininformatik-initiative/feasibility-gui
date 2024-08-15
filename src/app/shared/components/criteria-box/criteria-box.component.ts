import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MenuItemInterface } from 'src/app/service/MenuService/MenuItemInterface';
import { MenuServiceCriterion } from '../../service/MenuServiceCriterion';
import { CriterionFilterChipService } from '../../service/FilterChips/Criterion/CriterionFilterChips.service';
import { Component, Input, OnInit } from '@angular/core';
import { InterfaceFilterChip } from '../../models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'num-criteria-box',
  templateUrl: './criteria-box.component.html',
  styleUrls: ['./criteria-box.component.scss'],
  providers: [CriterionFilterChipService],
})
export class CriteriaBoxComponent implements OnInit {
  @Input()
  criterion: Criterion;

  menuItems: MenuItemInterface[] = [];

  $filterChips: Observable<InterfaceFilterChip[]> = of([]);

  constructor(
    private menuService: MenuServiceCriterion,
    private filterChipsService: CriterionFilterChipService
  ) {}

  ngOnInit() {
    this.getMenuItems();
    this.getFilterChips();
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForCriterion();
  }

  private getFilterChips() {
    this.$filterChips = this.filterChipsService.generateFilterChipsFromCriterion(this.criterion);
  }
}
