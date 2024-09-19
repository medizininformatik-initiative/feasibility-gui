import { Injectable } from '@angular/core';
import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';
import { TimeRestrictionChipService } from '../Criterion/TimeRestrictionChip.service';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { FilterChipConceptAdapter } from 'src/app/shared/models/FilterChips/Adapter/FilterChipConceptAdapter';
import { ProfileCodeFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionFiltersFilterChips {
  constructor(private timeRestrictionFilterChipsService: TimeRestrictionChipService) {}

  public generateFilterChipsForDataSelectionFilters(
    filters: AbstractProfileFilter[]
  ): InterfaceFilterChip[] {
    return filters.reduce<InterfaceFilterChip[]>((filterChips, filter) => {
      filterChips.push(...this.getChipsForFilter(filter));
      return filterChips;
    }, []);
  }

  private getChipsForFilter(filter: AbstractProfileFilter): InterfaceFilterChip[] {
    switch (filter.getUiType()) {
      case DataSelectionFilterTypes.TIMERESTRICTION:
        return this.getTimeRestrictionChips(filter as ProfileTimeRestrictionFilter);
      case DataSelectionFilterTypes.CODE:
        return this.getCodeFilterChips(filter as ProfileCodeFilter);
      default:
        return [];
    }
  }

  private getTimeRestrictionChips(filter: ProfileTimeRestrictionFilter): InterfaceFilterChip[] {
    return this.timeRestrictionFilterChipsService.generateTimeRestrictionChips(
      filter.getTimeRestriction()
    );
  }

  private getCodeFilterChips(filter: ProfileCodeFilter): InterfaceFilterChip[] {
    return FilterChipConceptAdapter.adaptCodeableConcept(filter.getSelectedTokens());
  }
}
