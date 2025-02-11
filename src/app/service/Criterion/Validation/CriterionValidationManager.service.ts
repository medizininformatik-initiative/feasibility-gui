import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { Injectable } from '@angular/core';
import { InvalidCriteriaService } from './InvalidCriteria.service';
import { MissingCriteriaService } from './MissingCriteria.service';

@Injectable({
  providedIn: 'root',
})
export class CriterionValidationManagerService {
  constructor(
    private missingCriteriaService: MissingCriteriaService,
    private invalidCriteriaService: InvalidCriteriaService
  ) {}

  public getMissingRequiredFilterCriteria(feasibilityQuery: FeasibilityQuery): string[] {
    return this.missingCriteriaService.getMissingCriteria(feasibilityQuery);
  }

  public getInvalidCriteria(feasibilityQuery: FeasibilityQuery): string[] {
    return this.invalidCriteriaService.getInvalidCriteriaList(feasibilityQuery);
  }

  public isInclusionSet(feasibilityQuery: FeasibilityQuery): boolean {
    return feasibilityQuery.getInclusionCriteria().length > 0;
  }

  public isFeasibilityQuerySet(feasibilityQuery: FeasibilityQuery): boolean {
    return (
      this.isInclusionSet(feasibilityQuery) || feasibilityQuery.getExclusionCriteria().length > 0
    );
  }
}
