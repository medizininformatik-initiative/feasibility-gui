import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';

@Injectable({
  providedIn: 'root',
})
export class ReferenceCriterionProviderService {
  private referenceCriterionMap: Map<string, ReferenceCriterion> = new Map();
  private referenceCriterionMapSubject: BehaviorSubject<Map<string, ReferenceCriterion>> =
    new BehaviorSubject(new Map());

  constructor() {}

  /**
   * Retrieves the observable of the reference criterion map.
   *
   * @returns Observable<Map<string, ReferenceCriterion[]>>
   */
  public getReferenceCriterionMap(): Observable<Map<string, ReferenceCriterion>> {
    return this.referenceCriterionMapSubject.asObservable();
  }

  /**
   * Retrieves a reference criterion array by UID from the map.
   *
   * @param uid The unique ID of the reference criterion
   * @returns ReferenceCriterion[] | undefined
   */
  public getReferenceCriterionByUID(uid: string): ReferenceCriterion | undefined {
    return this.referenceCriterionMap.get(uid);
  }

  /**
   * Sets a reference criterion array by its unique ID and updates the map.
   *
   * @param id The id of the reference criterion
   * @param referenceCriterion The array of reference criteria to set
   */
  public setReferenceCriterionByUID(id: string, referenceCriterion: ReferenceCriterion): void {
    this.referenceCriterionMap.set(id, referenceCriterion);
    this.referenceCriterionMapSubject.next(new Map(this.referenceCriterionMap));
  }

  /**
   * Sets a reference criterion array by its unique ID and updates the map.
   *
   * @param uid The unique ID of the reference criterion
   * @param referenceCriterion The array of reference criteria to set
   */
  public setReferenceCriteriaById(referenceCriteria: ReferenceCriterion[]): void {
    referenceCriteria.forEach((referenceCriterion) => {
      this.referenceCriterionMap.set(referenceCriterion.getId(), referenceCriterion);
    });
    this.referenceCriterionMapSubject.next(new Map(this.referenceCriterionMap));
  }

  /**
   * Deletes a reference criterion array by its UID from the map.
   *
   * @param uid The unique ID of the reference criterion to delete
   */
  public deleteReferenceCriterionFromMapByUID(uid: string): void {
    this.referenceCriterionMap.delete(uid);
    this.referenceCriterionMapSubject.next(new Map(this.referenceCriterionMap));
  }
}
