import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DataSelectionFieldsChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFieldsChips.service';
import { DataSelectionFiltersFilterChips } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFiltersFilterChips.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { MenuServiceDataSelection } from 'src/app/shared/service/Menu/DataSelection/MenuServiceDataSelection.service';
import { map, Observable, of, tap } from 'rxjs';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';
import { SelectedField } from 'src/app/model/DataSelection/Profile/Fields/SelectedField';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';

@Component({
  selector: 'num-data-selection-boxes',
  templateUrl: './data-selection-boxes.component.html',
  styleUrls: ['./data-selection-boxes.component.scss'],
  providers: [DataSelectionFieldsChipsService],
})
export class DataSelectionBoxesComponent implements OnInit {
  @Input()
  profile: DataSelectionProfile;

  @Input()
  isEditable: boolean;

  profile$: Observable<DataSelectionProfile>;

  menuItems: MenuItemInterface[] = [];

  display: Display;

  filterChipsSelected = false;
  $fieldsFilterChips: Observable<InterfaceFilterChip[]> = of([]);

  filtersFilterChips: InterfaceFilterChip[] = [];
  filtersFilterChips$: Observable<InterfaceFilterChip[]> = of([]);

  constructor(
    private fieldsFilterChipsService: DataSelectionFieldsChipsService,
    private menuService: MenuServiceDataSelection,
    private filtersFilterChipsService: DataSelectionFiltersFilterChips,
    private navigationHelperService: NavigationHelperService,
    private cdr: ChangeDetectorRef,
    private profileProviderService: ProfileProviderService
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

  private getFilterChipsForProfileFilters(): void {
    if (this.profile.getFilters()) {
      this.filtersFilterChips$ = of(
        this.filtersFilterChipsService.generateFilterChipsForDataSelectionFilters(
          this.profile.getFilters()
        )
      );
    } else {
      this.filtersFilterChips$ = of([]); // Emit an empty array if no filters are present
    }
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForDataSelection();
  }

  public editProfile(id: string): void {
    this.navigationHelperService.navigateToEditProfile(id);
  }

  public toggleIsReferenceSet(reference: ProfileReference): void {
    reference.setIsReferenceSet(!reference.getIsReferenceSet());
  }
}
