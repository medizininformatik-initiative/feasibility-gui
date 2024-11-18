import { Injectable } from '@angular/core';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { MenuServiceCriterionFunctions } from './MenuServiceCriterionFunctions';

@Injectable({
  providedIn: 'root',
})
export class CriterionMenuItems {
  constructor(private menuServiceCriterionFunctions: MenuServiceCriterionFunctions) {}

  /**
   * @todo Labels need to be redefined for translation jsons
   * @returns Array of Menu functions for a criterion box
   */
  public getMenuItemsForCriterion(isReferenceEnabled: boolean): MenuItemInterface[] {
    return [
      {
        disabled: false,
        icon: 'trash',
        label: 'DELETE',
        action: (id: string) => this.menuServiceCriterionFunctions.deleteCriterion(id),
      },
      {
        disabled: false,
        icon: 'clone',
        label: 'DUPLICATE',
        action: (id: string) => this.menuServiceCriterionFunctions.duplicateCriterion(id),
      },
      {
        disabled: !isReferenceEnabled,
        icon: 'link',
        label: 'REFERENCE',
        action: (id: string) => this.menuServiceCriterionFunctions.editLinkedCriteria(id),
      },
      {
        disabled: false,
        icon: 'filter',
        label: 'APPLY_FILTERS',
        action: (id: string) => this.menuServiceCriterionFunctions.applyCriterionFilter(id),
      },
    ];
  }
}
