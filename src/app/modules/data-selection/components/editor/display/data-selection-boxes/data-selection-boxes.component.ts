import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionFilterChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFilterChips.service';
import { DataSelectionFiltersFilterChips } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFiltersFilterChips.service';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { Display } from 'src/app/model/DataSelection/Profile/DisplayData';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { MenuServiceDataSelection } from 'src/app/shared/service/Menu/DataSelection/MenuServiceDataSelection.service';
import { Observable, of } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';

@Component({
  selector: 'num-data-selection-boxes',
  templateUrl: './data-selection-boxes.component.html',
  styleUrls: ['./data-selection-boxes.component.scss'],
  providers: [DataSelectionFilterChipsService],
})
export class DataSelectionBoxesComponent implements OnInit {
  @Input() profile: DataSelectionProfileProfile;
  @Input() isEditable: boolean;

  menuItems: MenuItemInterface[] = [];

  display: Display;

  filterChipsSelected = false;
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
    this.display = this.profile.getDisplay();
  }

  public getFilterChips(): void {
    const profileNodes = this.profile.getFields();

    if (
      profileNodes.some(
        (item) => item.getIsSelected() === true || item.getIsRequired() || item.getRecommended()
      )
    ) {
      this.filterChipsSelected = true;
    }

    this.generateAndStoreFilterChips(profileNodes);
    this.getFilterChipsForProfileFilters();
  }

  private generateAndStoreFilterChips(profileNodes: ProfileFields[]): void {
    this.$fieldsFilterChips =
      this.fieldsFilterChipsService.generateFilterChipsFromDataSelectionFields(profileNodes);
  }

  private getFilterChipsForProfileFilters() {
    if (this.profile.getFilters()) {
      this.filtersFilterChips.push(
        ...this.filtersFilterChipsService.generateFilterChipsForDataSelectionFilters(
          this.profile.getFilters()
        )
      );
    }
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForDataSelection();
  }

  public toggleIsReferenceSet(reference: ProfileReference): void {
    reference.setIsReferenceSet(!reference.getIsReferenceSet());
  }
}
