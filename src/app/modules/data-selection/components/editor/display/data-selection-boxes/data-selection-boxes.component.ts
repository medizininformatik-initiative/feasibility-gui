import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataSelectionFieldsChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFieldsChips.service';
import { DataSelectionFiltersFilterChips } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFiltersFilterChips.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { FeatureService } from '../../../../../../service/Feature.service';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { MenuItemInterface } from '../../../../../../shared/models/Menu/MenuItemInterface';
import { MenuServiceDataSelection } from '../../../../../../shared/service/Menu/DataSelection/MenuServiceDataSelection.service';
import { map, Observable, of, Subscription, take } from 'rxjs';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { RemoveReferenceService } from 'src/app/service/RemoveReference.service';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';

@Component({
  selector: 'num-data-selection-boxes',
  templateUrl: './data-selection-boxes.component.html',
  styleUrls: ['./data-selection-boxes.component.scss'],
  providers: [DataSelectionFieldsChipsService],
})
export class DataSelectionBoxesComponent implements OnInit, OnDestroy {
  @Input()
  profile: DataSelectionProfile;

  @Input()
  isEditable: boolean;

  display: string;
  label: Display;
  menuItems: MenuItemInterface[] = [];
  filterChipsSelected = false;
  $fieldsFilterChips: Observable<InterfaceFilterChip[]> = of([]);

  filtersFilterChips: InterfaceFilterChip[] = [];
  filtersFilterChips$: Observable<InterfaceFilterChip[]> = of([]);

  profileRefrenceChips: InterfaceFilterChip[] = [];

  unlinkedRequiredOrRecommendedReferences: ReferenceField[];

  selectedReferenceFields: SelectedReferenceField[] = [];
  subs: Subscription;
  isReferenced = false;

  constructor(
    private fieldsFilterChipsService: DataSelectionFieldsChipsService,
    private filtersFilterChipsService: DataSelectionFiltersFilterChips,
    private removeReferenceService: RemoveReferenceService,
    private menuService: MenuServiceDataSelection,
    private featureService: FeatureService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private profileProviderService: ProfileProviderService
  ) {}

  ngOnInit(): void {
    this.getFilterChips();
    this.getRequiredOrRecommendedReferences();
    this.getSelectedReferenceFields();
    this.getMenuItems();
    this.displayIsReferenceSet();
    this.display = this.profile.getDisplay().getOriginal();
    this.label = this.profile.getLabel();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
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

  private displayIsReferenceSet() {
    this.subs?.unsubscribe();
    this.subs = this.dataSelectionProviderService
      .getActiveDataSelection()
      .pipe(
        map((dataSelection) => {
          this.isReferenced = dataSelection.getProfiles().some((profile) => profile
              .getProfileFields()
              .getSelectedReferenceFields()
              .some((referenceField) => referenceField.getLinkedProfileIds().some((linkedProfileId) => this.profile.getId() === linkedProfileId)));
          return this.isReferenced;
        })
      )
      .subscribe();
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

  public deleteProfile(id: string): void {
    this.removeReferenceService.delete(id);
  }
  public updateRequiredOrRecommendedReferences() {
    this.getRequiredOrRecommendedReferences();
  }
  private getMenuItems() {
    const isMainProfile = this.featureService.getPatientProfileUrl() === this.profile.getUrl();
    this.menuItems = this.menuService.getMenuItemsForDataSelection(isMainProfile);
  }
}
