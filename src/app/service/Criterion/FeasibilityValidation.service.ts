import { combineLatest, map, Observable } from 'rxjs';
import { CriterionValidationManagerService } from './Validation/CriterionValidationManager.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CriterionValidationService {
  constructor(
    private feasibilityQueryProvider: FeasibilityQueryProviderService,
    private criterionValidationManagerService: CriterionValidationManagerService
  ) {}

  /**
   *
   * @returns Observable<string[]
   */
  public getMissingRequiredFilterCriteria(): Observable<string[]> {
    return this.getActiveFeasibilityQuery().pipe(
      map((query) =>
        query ? this.criterionValidationManagerService.getMissingRequiredFilterCriteria(query) : []
      )
    );
  }

  /**
   *
   * @returns Observable<string[]>
   */
  public getInvalidCriteria(): Observable<string[]> {
    return this.getActiveFeasibilityQuery().pipe(
      map((query) =>
        query ? this.criterionValidationManagerService.getInvalidCriteria(query) : []
      )
    );
  }

  /**
   *
   * @returns Observable<boolean>
   */
  public getIsInclusionSet(): Observable<boolean> {
    return this.getActiveFeasibilityQuery().pipe(
      map((query) => (query ? this.criterionValidationManagerService.isInclusionSet(query) : false))
    );
  }

  /**
   *
   * @returns Observable<boolean>
   */
  public getIsFeasibilityQuerySet(): Observable<boolean> {
    return this.getActiveFeasibilityQuery().pipe(
      map((query) =>
        query ? this.criterionValidationManagerService.isFeasibilityQuerySet(query) : false
      )
    );
  }

  /**
   *
   * @returns Observable<boolean>
   */
  public getIsFeasibilityQueryValid(): Observable<boolean> {
    return combineLatest([
      this.getMissingRequiredFilterCriteria().pipe(map((criteria) => criteria.length === 0)),
      this.getInvalidCriteria().pipe(map((criteria) => criteria.length === 0)),
      this.getIsInclusionSet(),
    ]).pipe(
      map(
        ([noMissingCriteria, noInvalidCriteria, isInclusionSet]) =>
          noMissingCriteria && noInvalidCriteria && isInclusionSet
      )
    );
  }

  /**
   *
   * @returns Observable<FeasibilityQuery>
   */
  private getActiveFeasibilityQuery(): Observable<FeasibilityQuery> {
    return this.feasibilityQueryProvider.getActiveFeasibilityQuery();
  }
}
