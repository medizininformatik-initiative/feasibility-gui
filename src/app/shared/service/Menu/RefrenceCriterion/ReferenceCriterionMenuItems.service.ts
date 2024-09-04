import { Injectable } from '@angular/core';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { MenuServiceCriterionFunctions } from '../Criterion/MenuServiceCriterionFunctions';
import { RefrenceCriterionMenuFunctionsService } from './RefrenceCriterionMenuFunctions.service';

@Injectable({
  providedIn: 'root',
})
export class ReferenceCriterionMenuItems {
  constructor(private referenceCriterionMenuFunctions: RefrenceCriterionMenuFunctionsService) {}

  /**
   * @todo Labels need to be redefined for translation jsons
   * @returns Array of Menu functions for a criterion box
   */
  public getMenuItemsForRefrenceCriterion(): MenuItemInterface[] {
    return [
      {
        disabled: false,
        icon: 'trash',
        label: 'DELETE',
        action: (id: string) => this.referenceCriterionMenuFunctions.deleteCriterion(id),
      },
      {
        disabled: true,
        icon: 'clone',
        label: 'DUPLICATE',
        action: (id: string) => this.referenceCriterionMenuFunctions.deleteCriterion(id),
      },
      {
        disabled: true,
        icon: 'link',
        label: 'REFERENCE',
        action: (id: string) => this.referenceCriterionMenuFunctions.editLinkedCriteria(id),
      },
      {
        disabled: false,
        icon: 'cog',
        label: 'APPLY_FILTERS',
        action: (id: string, params) =>
          this.referenceCriterionMenuFunctions.applyReferenceCriterionFilter(params),
      },
    ];
  }
}
