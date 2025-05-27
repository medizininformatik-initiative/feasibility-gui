import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { DataSelectionFilterType } from 'src/app/model/Utilities/DataSelectionFilterType';
import { DataSelectionProfile } from '../../../../../../model/DataSelection/Profile/DataSelectionProfile';
import { ProfileFilterCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFilterCloner';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'num-profile-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-filter.component.html',
  styleUrls: ['./profile-filter.component.scss'],
})
export class ProfileFilterComponent implements OnInit {
  @Input() profileFilter: AbstractProfileFilter[] = [];
  @Input() profile: DataSelectionProfile;
  @Output() profileFiltersChanged = new EventEmitter<AbstractProfileFilter[]>();

  profileTokenFilter: ProfileTokenFilter | null = null;
  profileTimeFilters: ProfileTimeRestrictionFilter[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initializeFilters();
  }

  /**
   * Initializes the token and time restriction filters from the input profile filters.
   */
  private initializeFilters(): void {
    this.profileTimeFilters = [];
    this.profileTokenFilter = null;
    this.profileFilter.forEach((filter) => {
      if (filter.getType() === DataSelectionFilterType.TOKEN) {
        this.profileTokenFilter = filter as ProfileTokenFilter;
      } else if (filter.getType() === DataSelectionFilterType.DATE) {
        this.profileTimeFilters.push(filter as ProfileTimeRestrictionFilter);
      }
    });
  }

  /**
   * Updates the token filter and emits the updated profile filters.
   * @param tokenFilter - The updated token filter.
   */
  public updateProfileTokenFilter(tokenFilter: ProfileTokenFilter): void {
    this.updateFilter(DataSelectionFilterType.TOKEN, tokenFilter);
  }

  /**
   * Updates a time restriction filter and emits the updated profile filters.
   * @param timeFilter - The updated time restriction filter.
   */
  public updateProfileTimeRestrictionFilter(timeFilter: ProfileTimeRestrictionFilter): void {
    this.updateFilter(DataSelectionFilterType.DATE, timeFilter);
  }

  /**
   * Updates a filter in the profile filters array and emits the changes.
   * @param type - The type of the filter to update.
   * @param updatedFilter - The updated filter.
   */
  private updateFilter(type: DataSelectionFilterType, updatedFilter: AbstractProfileFilter): void {
    const index = this.profileFilter.findIndex((filter) => filter.getType() === type);

    if (index !== -1) {
      this.profileFilter[index] = updatedFilter;
    } else {
      this.profileFilter.push(updatedFilter);
    }

    this.emitProfileFiltersChanged();
  }

  /**
   * Emits the updated profile filters.
   */
  private emitProfileFiltersChanged(): void {
    this.profileFiltersChanged.emit(ProfileFilterCloner.deepCopyFilters(this.profileFilter));
  }
}
