import { BehaviorSubject, Observable } from 'rxjs';
import { FeasibilityQuery } from '../../model/FeasibilityQuery/FeasibilityQuery';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryProviderService {
  private readonly STORAGE_QUERY_KEY = 'QUERY';
  private feasibilityQueryMap: Map<string, FeasibilityQuery> = new Map();
  private feasibilityQueryMapSubject: BehaviorSubject<Map<string, FeasibilityQuery>> =
    new BehaviorSubject(new Map());

  private feasibilityQueryIDToResultIDMap: Map<string, string> = new Map();
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.loadInitialQuery();
  }

  /**
   * Loads the initial feasibility query from local storage.
   * If no query is stored, initializes with a default query.
   */
  private loadInitialQuery(): void {
    const storedQuery = this.storage.get(this.STORAGE_QUERY_KEY);
    const uid = '1'; //uuidv4();
    if (storedQuery && storedQuery.groups) {
      this.storage.remove(this.STORAGE_QUERY_KEY);
      this.setFeasibilityQueryByID(new FeasibilityQuery(uid), uid);
    } else {
      this.feasibilityQueryMap = new Map<string, FeasibilityQuery>();
      this.feasibilityQueryMap.set(uid, new FeasibilityQuery(uid));
      this.feasibilityQueryMapSubject = new BehaviorSubject(this.feasibilityQueryMap);
    }
  }

  /**
   * Sets the feasibility query and updates local storage.
   *
   * @param id the uid to set
   * @param feasibilityQuery The new feasibility query to set
   */
  public setFeasibilityQueryByID(feasibilityQuery: FeasibilityQuery, id: string): void {
    this.storage.set(this.STORAGE_QUERY_KEY, feasibilityQuery);
    this.feasibilityQueryMap.set(id, feasibilityQuery);
    this.feasibilityQueryMapSubject.next(new Map(this.feasibilityQueryMap));
  }

  /**
   * Retrieves the current feasibility query as an observable.
   *
   * @returns Observable<Query>
   */
  public getFeasibilityQueryByID(id?: string): Observable<Map<string, FeasibilityQuery>> {
    return this.feasibilityQueryMapSubject.asObservable();
  }

  /**
   * Resets the feasibility query to the default query and updates local storage.
   */
  public resetToDefaultQuery(): void {
    //const defaultQuery = new FeasibilityQuery();
    this.storage.clear();
    //this.storage.set(this.STORAGE_QUERY_KEY, defaultQuery);
    //this.feasibilityQueryMapSubject.next(defaultQuery);
  }

  /**
   * Updates the feasibility query with a new query object.
   *
   * @param updatedQuery The updated query object
   */
  public updateFeasibilityQuery(updatedQuery: FeasibilityQuery): void {
    //this.setFeasibilityQuery(updatedQuery);
  }

  public setInclusionCriteria(criteria: string[][]): void {
    const feasibilityQuery = this.feasibilityQueryMap.get('1');
    feasibilityQuery.setInclusionCriteria(criteria);
    this.feasibilityQueryMap.set('1', feasibilityQuery);
    this.feasibilityQueryMapSubject.next(new Map(this.feasibilityQueryMap));
  }

  public setExclusionCriteria(criteria: string[][]): void {
    const feasibilityQuery = this.feasibilityQueryMap.get('1');
    feasibilityQuery.setExclusionCriteria(criteria);
    this.feasibilityQueryMap.set('1', feasibilityQuery);
    this.feasibilityQueryMapSubject.next(new Map(this.feasibilityQueryMap));
  }

  public deleteFromInclusion(uid: string): void {
    const feasibilityQuery = this.feasibilityQueryMap.get('1');
    const criteria = this.deleteCriterion(feasibilityQuery.getInclusionCriteria(), uid);
    this.setInclusionCriteria(criteria);
  }
  public deleteFromExclusion(uid: string): void {
    const feasibilityQuery = this.feasibilityQueryMap.get('1');
    const criteria = this.deleteCriterion(feasibilityQuery.getExclusionCriteria(), uid);
    this.setExclusionCriteria(criteria);
  }

  private deleteCriterion(inexclusion: string[][], criterionID: string): string[][] {
    inexclusion.forEach((idArray) => {
      const index = idArray.indexOf(criterionID);
      if (index > -1) {
        idArray.splice(index, 1);
      }
    });
    inexclusion = inexclusion.filter((item) => item.length > 0);
    return inexclusion;
  }
}
