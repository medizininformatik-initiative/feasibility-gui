import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { CriterionFilterChipService } from '../../service/FilterChips/Criterion/CriterionFilterChips.service';
import { Component, Input, OnInit } from '@angular/core';
import { InterfaceFilterChip } from '../../models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';
import { CriterionMenuItems } from '../../service/Menu/Criterion/CriterionMenuItems.service';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { forEach } from 'lodash';

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

  referenceCriterion: ReferenceCriterion[] = [];

  $filterChips: Observable<InterfaceFilterChip[]> = of([]);

  constructor(
    private menuService: CriterionMenuItems,
    private filterChipsService: CriterionFilterChipService
  ) {}

  ngOnInit() {
    this.getMenuItems();
    this.getFilterChips();
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForCriterion(this.isRefrenceSet());
  }

  private getFilterChips() {
    this.$filterChips = this.filterChipsService.generateFilterChipsFromCriterion(this.criterion);
  }

  private isRefrenceSet(): boolean {
    return this.criterion
      .getAttributeFilters()
      .some((attributeFilter) => attributeFilter.isReferenceSet());
  }
}
