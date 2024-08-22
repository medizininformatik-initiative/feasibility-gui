import { AbstractTimeRestriction as SQAbstractTimeRestriction } from '../../../model/StructuredQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { AbstractTimeRestriction as FQAbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { AfterFilter } from 'src/app/model/StructuredQuery/Criterion/TimeRestriction/AfterFilter';
import { AtFilter } from 'src/app/model/StructuredQuery/Criterion/TimeRestriction/AtFilter';
import { BeforeFilter } from 'src/app/model/StructuredQuery/Criterion/TimeRestriction/BeforeFilter';
import { BetweenFilter } from 'src/app/model/StructuredQuery/Criterion/TimeRestriction/BetweenFilter';
import { Injectable } from '@angular/core';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';

@Injectable({
  providedIn: 'root',
})
export class TimeRestrictionTranslationService {
  /**
   * Translates a Criterion's time restriction into a structured query.
   *
   * @param criterion The criterion containing the time restriction.
   * @returns The corresponding time restriction filter.
   */
  public translateTimeRestrictionToStructuredQuery(
    timeRestriction: FQAbstractTimeRestriction
  ): SQAbstractTimeRestriction | undefined {
    if (timeRestriction && timeRestriction.getAfterDate()) {
      const startDate = new Date(timeRestriction.getAfterDate());
      const endDate = new Date(timeRestriction.getBeforeDate());
      const offset = startDate.getTimezoneOffset() / -60;

      startDate.setHours(23 + offset, 59, 59, 999);
      endDate.setHours(offset, 0, 0, 0);

      switch (timeRestriction.getType()) {
        case TimeRestrictionType.AFTER:
          return this.createAfterFilter(startDate);
        case TimeRestrictionType.AT:
          return this.createAtFilter(startDate);
        case TimeRestrictionType.BEFORE:
          return this.createBeforeFilter(startDate);
        case TimeRestrictionType.BETWEEN:
          return this.createBetweenFilter(startDate, endDate);
      }
    }
    return undefined;
  }

  private createAfterFilter(startDate: Date): AfterFilter {
    const afterFilter = new AfterFilter();
    afterFilter.afterDate = startDate.toISOString().split('T')[0];
    return afterFilter;
  }

  private createAtFilter(startDate: Date): AtFilter {
    const atFilter = new AtFilter();
    atFilter.afterDate = startDate.toISOString().split('T')[0];
    atFilter.beforeDate = startDate.toISOString().split('T')[0];
    return atFilter;
  }

  private createBeforeFilter(startDate: Date): BeforeFilter {
    const beforeFilter = new BeforeFilter();
    beforeFilter.beforeDate = startDate.toISOString().split('T')[0];
    return beforeFilter;
  }

  private createBetweenFilter(startDate: Date, endDate: Date): BetweenFilter {
    const betweenFilter = new BetweenFilter();
    betweenFilter.afterDate = startDate.toISOString().split('T')[0];
    betweenFilter.beforeDate = endDate.toISOString().split('T')[0];
    return betweenFilter;
  }
}
