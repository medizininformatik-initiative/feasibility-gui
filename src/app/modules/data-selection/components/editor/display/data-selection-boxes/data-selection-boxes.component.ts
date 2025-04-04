import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionFilterChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFilterChips.service';
import { DataSelectionFiltersFilterChips } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFiltersFilterChips.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { MenuServiceDataSelection } from 'src/app/shared/service/Menu/DataSelection/MenuServiceDataSelection.service';
import { Observable, of } from 'rxjs';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';
import { SelectedField } from 'src/app/model/DataSelection/Profile/Fields/SelectedField';

@Component({
  selector: 'num-data-selection-boxes',
  templateUrl: './data-selection-boxes.component.html',
  styleUrls: ['./data-selection-boxes.component.scss'],
  providers: [DataSelectionFilterChipsService],
})
export class DataSelectionBoxesComponent implements OnInit {
  @Input() profile: DataSelectionProfile;
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
    const selectedFields = this.profile.getSelectedFields();
    this.generateAndStoreFilterChips(selectedFields);
    this.getFilterChipsForProfileFilters();
  }

  private generateAndStoreFilterChips(selectedFields: SelectedField[]): void {
    this.$fieldsFilterChips =
      this.fieldsFilterChipsService.generateFilterChipsFromDataSelectionFields(selectedFields);
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
