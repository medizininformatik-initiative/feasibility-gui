import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DataSelectionFieldsChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFieldsChips.service';
import { DataSelectionFiltersFilterChips } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFiltersFilterChips.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { groupBy, map, Observable, of } from 'rxjs';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { FilterChipProfileRefrenceAdapter } from 'src/app/shared/models/FilterChips/Adapter/DataSelection/FilterChipProfileRefrenceAdapter';
import { StagedProfileService } from 'src/app/service/StagedDataSelectionProfile.service';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { ProfileReferenceGroup } from 'src/app/shared/models/FilterChips/ProfileReferenceChipData';
import { DisplayTranslationPipe } from '../../../../../../shared/pipes/DisplayTranslationPipe';

@Component({
  selector: 'num-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  providers: [DataSelectionFieldsChipsService, DataSelectionFiltersFilterChips],
})
export class ProfileHeaderComponent implements OnChanges, OnInit {
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
    this.getFilterChips();
    this.label = this.translation.transform(this.profile.getLabel());
    this.placeholder = this.translation.transform(this.profile.getDisplay());
    this.getProfileReferenceChips();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.profile.currentValue?.getFilters()) {
      this.getFilterChipsForProfileFilters(changes.profile.currentValue.getFilters());
      const profile: DataSelectionProfile = changes.profile.currentValue;
      this.generateAndStoreFilterChips(profile.getProfileFields().getSelectedBasicFields());
    }
  }

  public getFilterChips(): void {
    const selectedFields = this.profile.getProfileFields().getSelectedBasicFields();
    this.generateAndStoreFilterChips(selectedFields);
  }

  private generateAndStoreFilterChips(selectedFields: SelectedBasicField[]): void {
    this.$fieldsFilterChips =
      this.fieldsFilterChipsService.generateFilterChipsFromDataSelectionFields(selectedFields);
  }

  private getFilterChipsForProfileFilters(filter: AbstractProfileFilter[]): void {
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
