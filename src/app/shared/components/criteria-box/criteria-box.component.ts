import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { CriterionFilterChipService } from '../../service/FilterChips/Criterion/CriterionFilterChips.service';
import { Component, Input, OnInit } from '@angular/core';
import { InterfaceFilterChip } from '../../models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';
import { CriterionMenuItems } from '../../service/Menu/Criterion/CriterionMenuItems.service';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { forEach } from 'lodash';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';

@Component({
  selector: 'num-criteria-box',
  templateUrl: './criteria-box.component.html',
  styleUrls: ['./criteria-box.component.scss'],
  providers: [CriterionFilterChipService],
})
export class CriteriaBoxComponent implements OnInit {
  @Input() criterion: Criterion;
  @Input() isEditable: boolean;

  menuItems: MenuItemInterface[] = [];

  referenceCriterion: ReferenceCriterion[] = [];

  $filterChips: Observable<InterfaceFilterChip[]> = of([]);

  system: string;

  isFilterRequired: boolean;

  constructor(
    private menuService: CriterionMenuItems,
    private filterChipsService: CriterionFilterChipService
  ) {}

  ngOnInit() {
    this.system = TerminologySystemDictionary.getNameByUrl(
      this.criterion.getTermCodes()[0].getSystem()
    );
    this.getMenuItems();
    this.getFilterChips();
    this.isFilterRequired = this.setIsFilterRequired();
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

  private setIsFilterRequired(): boolean {
    return (
      this.criterion
        .getValueFilters()
        .filter(
          (valueFilter) =>
            !valueFilter.getOptional() &&
            valueFilter.getConcept()?.getSelectedConcepts().length <= 0
        ).length > 0 ||
      this.criterion
        .getAttributeFilters()
        .filter(
          (attributeFilter) =>
            !attributeFilter.getOptional() &&
            attributeFilter.getConcept()?.getSelectedConcepts().length <= 0
        ).length > 0
    );
  }
}
