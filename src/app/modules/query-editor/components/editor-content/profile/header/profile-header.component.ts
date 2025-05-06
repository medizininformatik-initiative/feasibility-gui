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
import { map, Observable, of } from 'rxjs';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';

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

  label = '';

  filterChipsSelected = false;
  $fieldsFilterChips: Observable<InterfaceFilterChip[]> = of([]);

  filtersFilterChips: InterfaceFilterChip[] = [];
  filtersFilterChips$: Observable<InterfaceFilterChip[]> = of([]);

  constructor(
    private fieldsFilterChipsService: DataSelectionFieldsChipsService,
    private filtersFilterChipsService: DataSelectionFiltersFilterChips
  ) {}

  ngOnInit(): void {
    this.getFilterChips();
    this.label = this.profile.getLabel();
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
  setLabel() {
    this.updatedLabel.emit(this.label);
  }
}
