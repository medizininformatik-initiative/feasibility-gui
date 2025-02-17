import { BehaviorSubject, Observable, of } from 'rxjs';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CriterionProviderService {
  private criterionUIDMap: Map<string, Criterion> = new Map();
  private criterionUIDMapSubject: BehaviorSubject<Map<string, Criterion>> = new BehaviorSubject(
    new Map()
  );

  constructor() {}

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
  public setCriterionByUID(criterion: Criterion, id: string): void {
    this.criterionUIDMap.set(id, criterion);
    this.criterionUIDMapSubject.next(new Map(this.criterionUIDMap));
  }

  /**
   * Sets criteria by their unique IDs and updates the map.
   *
   * @param criteria The array of criteria to set
   */
  public setCriteriaById(criteria: Criterion[]): void {
    criteria.forEach((criterion) => {
      this.criterionUIDMap.set(criterion.getId(), criterion);
    });
    this.criterionUIDMapSubject.next(new Map(this.criterionUIDMap));
  }

  /**
   * Deletes a criterion by its UID from the map.
   *
   * @param uid The unique ID of the criterion to delete
   */
  public deleteCriterionFromMapByUID(uid: string): void {
    this.criterionUIDMap.delete(uid);
    this.criterionUIDMapSubject.next(new Map(this.criterionUIDMap));
  }
}
