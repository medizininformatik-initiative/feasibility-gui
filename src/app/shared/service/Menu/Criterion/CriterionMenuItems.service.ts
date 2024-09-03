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
        label: 'löschen',
        action: (id: string) => this.menuServiceCriterionFunctions.deleteCriterion(id),
      },
      {
        disabled: false,
        icon: 'clone',
        label: 'duplizieren',
        action: (id: string) => this.menuServiceCriterionFunctions.duplicateCriterion(id),
      },
      {
        disabled: !isReferenceEnabled,
        icon: 'link',
        label: 'kriterien verknüpfen',
        action: (id: string) => this.menuServiceCriterionFunctions.editLinkedCriteria(id),
      },
      {
        disabled: false,
        icon: 'cog',
        label: 'Filter anwenden',
        action: (id: string, params) =>
          this.menuServiceCriterionFunctions.applyCriterionFilter(id, params),
      },
    ];
  }
}
