import { Injectable } from '@angular/core';
import { MenuItemInterface } from 'src/app/service/MenuService/MenuItemInterface';
import { MenuServiceCriterionFunctions } from './MenuServiceCriterionFunctions';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceCriterion {
  constructor(private menuServiceCriterionFunctions: MenuServiceCriterionFunctions) {}

  /**
   * @todo Labels need to be redefined for translation jsons
   * @returns Array of Menu functions for a criterion box
   */
  public getMenuItemsForCriterion(): MenuItemInterface[] {
    return [
      {
        icon: 'trash',
        label: 'löschen',
        action: (id: string) => this.menuServiceCriterionFunctions.deleteCriterion(id),
      },
      {
        icon: 'clone',
        label: 'dublizieren',
        action: (id: string) => this.menuServiceCriterionFunctions.deleteCriterion(id),
      },
      {
        icon: 'link',
        label: 'kriterien verknüpfen',
        action: (id: string) => this.menuServiceCriterionFunctions.editLinkedCriteria(id),
      },
      {
        icon: 'cog',
        label: 'Filter anwenden',
        action: (id: string) => this.menuServiceCriterionFunctions.applyCriterionFilter(id),
      },
    ];
  }
}
