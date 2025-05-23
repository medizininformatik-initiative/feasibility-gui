import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { DataSelectionFieldsChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFieldsChips.service';
import { DataSelectionFiltersFilterChips } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFiltersFilterChips.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { DisplayTranslationPipe } from '../../../../../../shared/pipes/DisplayTranslationPipe';
import { FilterChipProfileRefrenceAdapter } from 'src/app/shared/models/FilterChips/Adapter/DataSelection/FilterChipProfileRefrenceAdapter';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { map, Observable, of } from 'rxjs';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { ProfileReferenceGroup } from 'src/app/shared/models/FilterChips/ProfileReferenceChipData';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { StagedProfileService } from 'src/app/service/StagedDataSelectionProfile.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'num-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  providers: [DataSelectionFieldsChipsService, DataSelectionFiltersFilterChips],
})
export class ProfileHeaderComponent implements OnInit {
  profile$: Observable<DataSelectionProfile>;

  @Input()
  profile: DataSelectionProfile;

  @Output()
  updatedLabel: EventEmitter<string> = new EventEmitter<string>();

  label: string;
  placeholder: string;

  filterChipsSelected = false;
  $fieldsFilterChips: Observable<InterfaceFilterChip[]> = of([]);

  filtersFilterChips: InterfaceFilterChip[] = [];
  filtersFilterChips$: Observable<InterfaceFilterChip[]> = of([]);

  profileRefrenceChips$: Observable<InterfaceFilterChip[]> = of([]);

  constructor(
    private stagedProfileService: StagedProfileService,
    private profileProviderService: ProfileProviderService,
    private fieldsFilterChipsService: DataSelectionFieldsChipsService,
    private filtersFilterChipsService: DataSelectionFiltersFilterChips,
    private translation: DisplayTranslationPipe
  ) {}

  ngOnInit(): void {
    this.profile$ = this.stagedProfileService.getProfileObservable();
    this.stagedProfileService.getProfileObservable().subscribe((profile) => {
      this.profile = profile;
      this.label = this.translation.transform(this.profile.getLabel());
      this.placeholder = this.translation.transform(this.profile.getDisplay());
      this.getProfileFieldsChips();
      this.getProfileReferenceChips();
      this.getProfileFilterChips(this.profile.getFilters());
    });
  }

  public getProfileFieldsChips(): void {
    const selectedFields = this.profile.getProfileFields().getSelectedBasicFields();
    this.$fieldsFilterChips =
      this.fieldsFilterChipsService.generateFilterChipsFromDataSelectionFields(selectedFields);
  }

  private getProfileFilterChips(filter: AbstractProfileFilter[]): void {
    if (filter.length > 0) {
      this.filtersFilterChips$ = of(
        this.filtersFilterChipsService.generateFilterChipsForDataSelectionFilters(
          this.profile.getFilters()
        )
      );
    } else {
      this.filtersFilterChips$ = of([]); // Emit an empty array if no filters are present
    }
  }
  public setLabel(label: string) {
    this.updatedLabel.emit(label);
  }

  private getProfileReferenceChips(): void {
    this.profileRefrenceChips$ = this.profile$.pipe(
      map((profile) => {
        const selectedReferenceFields = profile.getProfileFields().getSelectedReferenceFields();
        const groupedByElementId = selectedReferenceFields.reduce((acc, ref) => {
          const key = ref.getElementId();
          if (!acc[key]) {
            acc[key] = [];
          }
          const linkedProfiles = ref
            .getLinkedProfileIds()
            .map((id) => this.profileProviderService.getProfileById(id).getDisplay())
            .filter((profileDisplay): profileDisplay is Display => !!profileDisplay); // Type-safe filter

          acc[key].push(...linkedProfiles);
          return acc;
        }, {} as ProfileReferenceGroup);
        const groups: ProfileReferenceGroup[] = Object.entries(groupedByElementId).map(
          ([elementId, profiles]) => ({ elementId, profiles })
        );
        const chips = groups.map((group) =>
          FilterChipProfileRefrenceAdapter.adaptToProfileReferenceChipData(group)
        );
        return chips;
      })
    );
  }
}
