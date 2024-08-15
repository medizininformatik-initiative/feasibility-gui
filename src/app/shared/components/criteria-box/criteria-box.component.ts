import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MenuItemInterface } from 'src/app/service/MenuService/MenuItemInterface';
import { MenuServiceCriterion } from '../../service/MenuServiceCriterion';
import { CriterionFilterChipService } from '../../service/FilterChips/Criterion/CriterionFilterChips.service';
import { Component, Input } from '@angular/core';

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

  constructor(private menuService: MenuServiceCriterion) {}

  ngOnInit() {
    this.getMenuItems();
  }

  getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForCriterion();
  }

  getFilterChips() {
    this.$filterChips = this.filterChipsService.generateFilterChipsFromCriterion(this.criterion);
  }
}
