import { Component, Input, OnInit } from '@angular/core';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { CriterionFilterChipService } from '../../service/FilterChips/Criterion/CriterionFilterChips.service';
import { InterfaceFilterChip } from '../../models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';
import { MenuItemInterface } from '../../models/Menu/MenuItemInterface';
import { ReferenceCriterionMenuItems } from '../../service/Menu/RefrenceCriterion/ReferenceCriterionMenuItems.service';
import {TerminologySystemDictionary} from "../../../model/Utilities/TerminologySystemDictionary";

@Component({
  selector: 'num-reference-criteria-box',
  templateUrl: './reference-criteria-box.component.html',
  styleUrls: ['./reference-criteria-box.component.scss'],
  providers: [CriterionFilterChipService],
})
export class ReferenceCriteriaBoxComponent implements OnInit {
  @Input()
  referenceCriterion: ReferenceCriterion;

  @Input()
  criterionId: string;

  menuItems: MenuItemInterface[] = [];

  $filterChips: Observable<InterfaceFilterChip[]> = of([]);

  translatedSystem: string;

  constructor(
    private menuService: ReferenceCriterionMenuItems,
    private filterChipsService: CriterionFilterChipService
  ) {}

  ngOnInit() {
    this.getMenuItems();
    this.getFilterChips();
    this.translatedSystem = TerminologySystemDictionary.getNameByUrl(this.referenceCriterion.getTermCodes()[0].getSystem())
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForRefrenceCriterion();
  }

  private getFilterChips() {
    this.$filterChips = this.filterChipsService.generateFilterChipsFromCriterion(
      this.referenceCriterion
    );
  }
}
