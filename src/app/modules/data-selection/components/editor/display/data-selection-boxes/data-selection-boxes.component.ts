import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionFieldsChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFieldsChips.service';
import { DataSelectionFiltersFilterChips } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFiltersFilterChips.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { StagedProfileService } from 'src/app/service/StagedDataSelectionProfile.service';

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

  display: Display;

  filterChipsSelected = false;
  $fieldsFilterChips: Observable<InterfaceFilterChip[]> = of([]);

  filtersFilterChips: InterfaceFilterChip[] = [];
  filtersFilterChips$: Observable<InterfaceFilterChip[]> = of([]);

  unlinkedRequiredOrRecommendedReferences: ReferenceField[];

  selectedReferenceFields: SelectedReferenceField[] = [];

  constructor(
    private fieldsFilterChipsService: DataSelectionFieldsChipsService,
    private filtersFilterChipsService: DataSelectionFiltersFilterChips,
    private navigationHelperService: NavigationHelperService,
    private stagedProfileService: StagedProfileService
  ) {}

  ngOnInit(): void {
    this.getFilterChips();
    this.getRequiredOrRecommendedReferences();
    this.getSelectedReferenceFields();
    this.display = this.profile.getDisplay();
  }

  public getFilterChips(): void {
    const selectedFields = this.profile.getProfileFields().getSelectedBasicFields();
    this.generateAndStoreFilterChips(selectedFields);
    this.getFilterChipsForProfileFilters();
  }

  private generateAndStoreFilterChips(selectedFields: SelectedBasicField[]): void {
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
      this.filtersFilterChips$ = of([]);
    }
  }

  public editProfile(id: string): void {
    this.stagedProfileService.initialize(this.profile);
    this.navigationHelperService.navigateToEditProfile(id);
  }

  public toggleIsReferenceSet(reference: ProfileReference): void {
    reference.setIsReferenceSet(!reference.getIsReferenceSet());
  }

  /**
   * Retrieves all unlinked required or recommended reference fields from the profiles.
   */
  private getRequiredOrRecommendedReferences(): void {
    const fields = this.profile.getProfileFields();
    this.unlinkedRequiredOrRecommendedReferences =
      fields.getUnlinkedRequiredOrRecommendedReferences();
  }

  public getSelectedReferenceFields(): void {
    this.selectedReferenceFields = this.profile.getProfileFields().getSelectedReferenceFields();
  }
}
