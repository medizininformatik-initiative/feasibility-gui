import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionFilterChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFilterChips.service';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { MenuServiceDataSelection } from 'src/app/shared/service/Menu/DataSelection/MenuServiceDataSelection.service';
import { Observable, of } from 'rxjs';
import { FilterChipTimeRestrictionAdapter } from 'src/app/shared/models/FilterChips/Adapter/FilterChipTimeRestrictionAdapter';
import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';
import { DataSelectionFiltersFilterChips } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFiltersFilterChips.service';

@Component({
  selector: 'num-data-selection-boxes',
  templateUrl: './data-selection-boxes.component.html',
  styleUrls: ['./data-selection-boxes.component.scss'],
  providers: [DataSelectionFilterChipsService],
})
export class DataSelectionBoxesComponent implements OnInit {
  @Input()
  profile: DataSelectionProfileProfile;

  menuItems: MenuItemInterface[] = [];

  $fieldsFilterChips: Observable<InterfaceFilterChip[]> = of([]);

  filtersFilterChips: InterfaceFilterChip[] = [];

  constructor(
    private fieldsFilterChipsService: DataSelectionFilterChipsService,
    private menuService: MenuServiceDataSelection,
    private filtersFilterChipsService: DataSelectionFiltersFilterChips
  ) {}

  ngOnInit(): void {
    this.getFilterChips();
    this.getMenuItems();
  }

  public getFilterChips(): void {
    const profileNodes = this.getProfileNodes();
    this.generateAndStoreFilterChips(profileNodes);
    this.getFilterChipsForProfileFilters();
  }

  private getProfileNodes(): DataSelectionProfileProfileNode[] {
    return this.profile.getFields();
  }

  private generateAndStoreFilterChips(profileNodes: DataSelectionProfileProfileNode[]): void {
    this.$fieldsFilterChips =
      this.fieldsFilterChipsService.generateFilterChipsFromDataSelectionFields(profileNodes);
  }

  private getFilterChipsForProfileFilters() {
    this.filtersFilterChips.push(
      ...this.filtersFilterChipsService.generateFilterChipsForDataSelectionFilters(
        this.profile.getFilters()
      )
    );
    console.log(this.filtersFilterChips);
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForDataSelection();
  }
}
