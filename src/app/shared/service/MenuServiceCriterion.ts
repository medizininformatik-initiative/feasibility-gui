import { Injectable } from '@angular/core';
import { EditCriterionService } from 'src/app/service/CriterionService/EditCriterionService.service';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { MenuServiceCriterionFunctions } from './MenuServiceCriterionFunctions';
import { MenuItem } from '../../service/MenuService/MenuItemInterface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private menuServiceCriterionFunctions: MenuServiceCriterionFunctions) {}

  public getMenuItemsForCriterion(criterionUuid: string): MenuItem[] {
    return [
      {
        icon: 'trash',
        label: 'löschen',
        action: () => this.menuServiceCriterionFunctions.deleteAction(criterionUuid),
      },
      {
        icon: 'clone',
        label: 'dublizieren',
        action: () => this.menuServiceCriterionFunctions.duplicateAction(criterionUuid),
      },
      {
        icon: 'link',
        label: 'kriterien verknüpfen',
        action: () => this.menuServiceCriterionFunctions.linkCriteriaAction(criterionUuid),
      },
      {
        icon: 'cog',
        label: 'Filter anwenden',
        action: () => this.menuServiceCriterionFunctions.applyFilterAction(criterionUuid),
      },
    ];
  }
}
