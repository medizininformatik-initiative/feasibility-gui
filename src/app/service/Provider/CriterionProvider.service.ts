import { BehaviorSubject, Observable, of } from 'rxjs';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { Injectable } from '@angular/core';
import { FeasibilityQueryProviderService } from './FeasibilityQueryProvider.service';
import { switchMap, tap } from 'rxjs/operators';
import { FeasibilityQuery } from '../../model/FeasibilityQuery/FeasibilityQuery';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';

@Injectable({
  providedIn: 'root',
})
export class CriterionProviderService {
  private criterionUIDMap: Map<string, Criterion> = new Map();
  private criterionUIDMapSubject: BehaviorSubject<Map<string, Criterion>> = new BehaviorSubject(
    new Map()
  );

  constructor(private queryService: FeasibilityQueryProviderService) {
    //this.initCriterionMap();
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
  /*private initCriterionMap(): void {
    this.queryService
      .getFeasibilityQuery()
      .pipe(
        tap({
          next: () => {
            // Clear the map before updating
            this.criterionUIDMap.clear();
          },
        }),
        switchMap((feasibilityQuery: FeasibilityQuery) => {
          const inclusionCriteriaGroups = feasibilityQuery.getInclusionCriteria();
          const exclusionCriteriaGroups = feasibilityQuery.getExclusionCriteria();
          const allCriteriaGroups = [...inclusionCriteriaGroups, ...exclusionCriteriaGroups];
          allCriteriaGroups.forEach((criteriaGroup: Criterion[]) => {
            criteriaGroup.forEach((criteria) => {
              if (criteria.getUniqueID()) {
                this.criterionUIDMap.set(criteria.getUniqueID(), criteria);
              }
            });
          });
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          this.criterionUIDMapSubject.next(this.criterionUIDMap);
        },
        error: (error) => {
          console.error('Error updating criterion map:', error);
        },
      });
  }*/
}
