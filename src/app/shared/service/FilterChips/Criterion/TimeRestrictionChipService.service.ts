import { Injectable } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { InterfaceFilterChip } from '../../../models/FilterChips/InterfaceFilterChip';
import { FilterChipTimeRestrictionAdapter } from '../../../models/FilterChips/Adapter/FilterChipTimeRestrictionAdapter';

@Injectable({
  providedIn: 'root',
})
export class TimeRestrictionChipService {
  /**
   *
   * @param criterion
   * @returns
   */
  public generateTimeRestrictionChips(criterion: Criterion): InterfaceFilterChip[] {
    const timeRestriction = criterion.getTimeRestriction();
    if (timeRestriction?.getBeforeDate() !== null || timeRestriction?.getAfterDate()) {
      return FilterChipTimeRestrictionAdapter.adaptTimeRestriction(criterion.getTimeRestriction());
    }
    return [];
  }
}
