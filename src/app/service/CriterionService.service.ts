import { BehaviorSubject, Observable } from 'rxjs';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { Injectable } from '@angular/core';
import { QueryService } from './QueryService.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CriterionService {
  private criterionUIDMap: Map<string, Criterion> = new Map();

  private criterionUIDMapSubject: BehaviorSubject<Map<string, Criterion>> = new BehaviorSubject(
    new Map()
  );

  constructor(private queryService: QueryService) {
    this.initCriterionMap();
  }

  /**
   *
   * @returns
   */
  public getCriterionUIDMap(): Observable<Map<string, Criterion>> {
    return this.criterionUIDMapSubject.asObservable();
  }

  public getCriterionByUID(uid: string): Criterion {
    return this.criterionUIDMap.get(uid);
  }

  public setCriterionByUID(criterion: Criterion) {
    this.criterionUIDMap.set(criterion.uniqueID, criterion);
    this.criterionUIDMapSubject.next(new Map(this.criterionUIDMap));
  }

  /**
   * Delete criterion by UID from the map
   *
   * @param uid string
   */
  public deleteCriterionByUID(uid: string) {
    this.criterionUIDMap.delete(uid);
    this.criterionUIDMapSubject.next(new Map(this.criterionUIDMap));
  }

  private initCriterionMap() {
    this.queryService
      .getFeasibilityQuery()
      .pipe(
        tap({
          next: () => {
            // Clear the maps before updating
            this.criterionUIDMap.clear();
          },
        }),
        switchMap((feasibilityQuery) => feasibilityQuery.groups),
        tap({
          next: (group) => {
            for (const inex of ['inclusion', 'exclusion']) {
              group[inex + 'Criteria'].forEach((criteriaArray: Criterion[]) => {
                criteriaArray.forEach((criteria) => {
                  if (criteria.uniqueID) {
                    this.criterionUIDMap.set(criteria.uniqueID, criteria);
                  }
                });
              });
            }
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
