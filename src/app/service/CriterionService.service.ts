import { BehaviorSubject, Observable } from 'rxjs';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { Injectable } from '@angular/core';
import { QueryService } from './QueryService.service';
import { switchMap, tap } from 'rxjs/operators';
import { InclusionExclusionService } from './CriteriaService.service';

@Injectable({
  providedIn: 'root',
})
export class CriterionService {
  private criterionUIDMap: Map<string, Criterion> = new Map();
  private criterionUIDMapSubject: BehaviorSubject<Map<string, Criterion>> = new BehaviorSubject(
    new Map()
  );

  constructor(
    private queryService: QueryService,
    private criteriaService: InclusionExclusionService
  ) {
    this.initCriterionMap();
  }

  /**
   * Retrieves the observable of the criterion UID map.
   *
   * @returns Observable<Map<string, Criterion>>
   */
  public getCriterionUIDMap(): Observable<Map<string, Criterion>> {
    return this.criterionUIDMapSubject.asObservable();
  }

  /**
   * Retrieves a criterion by UID from the map.
   *
   * @param uid The unique ID of the criterion
   * @returns Criterion | undefined
   */
  public getCriterionByUID(uid: string): Criterion | undefined {
    return this.criterionUIDMap.get(uid);
  }

  /**
   * Sets a criterion by its unique ID and updates the map.
   *
   * @param criterion The criterion to set
   */
  public setCriterionByUID(criterion: Criterion): void {
    this.criterionUIDMap.set(criterion.getUniqueID(), criterion);
    this.criterionUIDMapSubject.next(new Map(this.criterionUIDMap));
  }

  /**
   * Sets a criterion for inclusion.
   *
   * @param criterion The criterion to set for inclusion
   */
  public setCriterionForInclusion(criterion: Criterion): void {
    this.criteriaService.setCriterionByUIDAndType(criterion, 'inclusion');
  }

  /**
   * Sets a criterion for exclusion.
   *
   * @param criterion The criterion to set for exclusion
   */
  public setCriterionForExclusion(criterion: Criterion): void {
    this.criteriaService.setCriterionByUIDAndType(criterion, 'exclusion');
  }

  /**
   * Deletes a criterion by its UID from the map.
   *
   * @param uid The unique ID of the criterion to delete
   */
  public deleteCriterionByUID(uid: string): void {
    this.criterionUIDMap.delete(uid);
    this.criterionUIDMapSubject.next(new Map(this.criterionUIDMap));
  }

  /**
   * Initializes the criterion map from the current feasibility query.
   */
  private initCriterionMap(): void {
    this.queryService
      .getFeasibilityQuery()
      .pipe(
        tap({
          next: () => {
            // Clear the map before updating
            this.criterionUIDMap.clear();
          },
        }),
        switchMap((feasibilityQuery) => feasibilityQuery.groups),
        tap({
          next: (group) => {
            ;['inclusion', 'exclusion'].forEach((type) => {
              group[type + 'Criteria'].forEach((criteriaArray: Criterion[]) => {
                criteriaArray.forEach((criteria) => {
                  if (criteria.getUniqueID()) {
                    this.criterionUIDMap.set(criteria.getUniqueID(), criteria);
                  }
                });
              });
            });
          },
        })
      )
      .subscribe({
        next: () => {
          this.criterionUIDMapSubject.next(this.criterionUIDMap);
        },
      })
      .unsubscribe();
  }
}
