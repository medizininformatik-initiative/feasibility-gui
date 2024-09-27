import { AfterFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AfterFilter';
import { AtFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AtFilter';
import { BeforeFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BeforeFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { Injectable } from '@angular/core';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';

@Injectable({
  providedIn: 'root',
})
export class UITimeRestrictionFactoryService {
  constructor() {}

  public createTimeRestrictionForDataSelection(timeRestriction: any): AbstractTimeRestriction {
    if (timeRestriction.start && timeRestriction.end) {
      if (timeRestriction.start === timeRestriction.end) {
        return new AtFilter(timeRestriction.start, timeRestriction.end);
      } else {
        return new BetweenFilter(timeRestriction.start, timeRestriction.end);
      }
    }
    if (timeRestriction.end && !timeRestriction.start) {
      return new BeforeFilter(timeRestriction.end);
    }
    if (!timeRestriction.end && timeRestriction.start) {
      return new AfterFilter(timeRestriction.start);
    }
  }

  public createTimeRestrictionForFeasibilityQuery(timeRestriction: any): AbstractTimeRestriction {
    if (timeRestriction.beforeDate && timeRestriction.afterDate) {
      if (timeRestriction.beforeDate === timeRestriction.afterDate) {
        return new AtFilter(timeRestriction.afterDate, timeRestriction.beforeDate);
      } else {
        return new BetweenFilter(timeRestriction.afterDate, timeRestriction.beforeDate);
      }
    }
    if (timeRestriction.beforeDate && !timeRestriction.afterDate) {
      return new BeforeFilter(timeRestriction.beforeDate);
    }
    if (!timeRestriction.beforeDate && timeRestriction.afterDate) {
      return new AfterFilter(timeRestriction.afterDate);
    }
  }
}
