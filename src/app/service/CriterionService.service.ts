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
    null
  );

  constructor(private queryService: QueryService) {
    this.initCriterionMap();
  }

  public getCriterionUIDMap(): Observable<Map<string, Criterion>> {
    return this.criterionUIDMapSubject.asObservable();
  }
  public getCriterionByUID(uid: string): Criterion {
    return this.criterionUIDMap.get(uid);
  }

  public setCriterionByUID(criterion: Criterion) {
    const criterionMapItem = this.criterionUIDMap.set(criterion.uniqueID, criterion);
    this.criterionUIDMapSubject.next(criterionMapItem);
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
          // Emit the updated maps
          this.criterionUIDMapSubject.next(this.criterionUIDMap);
        },
      });
  }
}
