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
        label: 'DELETE',
        action: (url: string) =>
          this.menuServiceDataSelectionFunctions.deleteDataSelectionObject(url),
      },
      {
        disabled: true,
        icon: 'clone',
        label: 'DUPLICATE',
        action: (id: string) => this.menuServiceDataSelectionFunctions.cloneDataSelectionObject(id),
      },
      {
        disabled: false,
        icon: 'filter',
        label: 'APPLY_FILTERS',
        action: (url: string) =>
          this.menuServiceDataSelectionFunctions.openDataSelectionFilterModal(url),
      },
      {
        disabled: false,
        icon: 'clipboard-list',
        label: 'DEFINE_FIELDS',
        action: (url: string) =>
          this.menuServiceDataSelectionFunctions.openDataSelectionFieldModal(url),
      },
    ];
  }
}
