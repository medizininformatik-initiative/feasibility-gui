import { Injectable } from '@angular/core';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { MenuServiceDataSelectionFunctions } from './MenuServiceDataSelectionFunctions';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceDataSelection {
  constructor(private menuServiceDataSelectionFunctions: MenuServiceDataSelectionFunctions) {}

  /**
   * @todo Labels need to be redefined for translation jsons
   * @returns Array of Menu functions for a criterion box
   */
  public getMenuItemsForDataSelection(): MenuItemInterface[] {
    return [
      {
        disabled: false,
        icon: 'trash',
        label: 'löschen',
        action: (id: string) =>
          this.menuServiceDataSelectionFunctions.deleteDataSelectionObject(id),
      },
      {
        disabled: false,
        icon: 'clone',
        label: 'dublizieren',
        action: (id: string) => this.menuServiceDataSelectionFunctions.cloneDataSelectionObject(id),
      },
      {
        disabled: false,
        icon: 'cog',
        label: 'Filter anwenden',
        action: (id: string) =>
          this.menuServiceDataSelectionFunctions.openDataSelectionFilterModal(id),
      },
      {
        disabled: false,
        icon: 'cog',
        label: 'Felder definieren',
        action: (id: string) =>
          this.menuServiceDataSelectionFunctions.openDataSelectionFieldModal(id),
      },
    ];
  }
}
