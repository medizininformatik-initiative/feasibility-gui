import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { FilterChipTimeRestrictionAdapter } from '../../../models/FilterChips/Adapter/FilterChipTimeRestrictionAdapter';
import { Injectable } from '@angular/core';
import { InterfaceFilterChip } from '../../../models/FilterChips/InterfaceFilterChip';

@Injectable({
  providedIn: 'root',
})
export class TimeRestrictionChipService {
  /**
   * @param criterion
   * @returns
   */
  public generateTimeRestrictionChips(
    timeRestriction: AbstractTimeRestriction
  ): InterfaceFilterChip[] {
    if (this.isTimeRestrictionSet(timeRestriction)) {
      return FilterChipTimeRestrictionAdapter.adaptTimeRestriction(timeRestriction);
    }
    return [];
  }

  private isTimeRestrictionSet(timeRestriction: AbstractTimeRestriction) {
    return timeRestriction?.getBeforeDate() !== null || timeRestriction?.getAfterDate();
  }
}
