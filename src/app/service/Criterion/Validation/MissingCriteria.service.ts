import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MissingCriteriaService {
  constructor(private criterionService: CriterionProviderService) {}

  public getMissingCriteria(feasibilityQuery: FeasibilityQuery): string[] {
    const missingCriteria: string[] = [];

    feasibilityQuery.getInclusionCriteria().forEach((criteriaGroup) => {
      this.processMissingCriteria(criteriaGroup, missingCriteria);
    });
    feasibilityQuery.getExclusionCriteria().forEach((criteriaGroup) => {
      this.processMissingCriteria(criteriaGroup, missingCriteria);
    });

    return missingCriteria;
  }

  private processMissingCriteria(criteriaGroup: string[], missingCriteria: string[]): void {
    criteriaGroup.forEach((criterionId) => {
      const criterion = this.criterionService.getCriterionByUID(criterionId);
      if (!criterion.getIsRequiredFilterSet()) {
        missingCriteria.push(criterionId);
      }
    });
  }
}
