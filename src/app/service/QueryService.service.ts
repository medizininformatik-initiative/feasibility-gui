import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { Query } from '../model/FeasibilityQuery/Query';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private STORAGE_QUERY_KEY = 'QUERY';

  private feasibilityQuery: BehaviorSubject<Query> = new BehaviorSubject(new Query());

  constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {
    this.loadInitialQuery();
  }

  private loadInitialQuery() {
    const storedQuery = this.storage.get(this.STORAGE_QUERY_KEY);
    if (storedQuery && storedQuery.groups) {
      this.storage.remove(this.STORAGE_QUERY_KEY);
      this.setFeasibilityQuery(new Query());
    }
  }

  public setFeasibilityQuery(feasibilityQuery: Query) {
    this.storage.set(this.STORAGE_QUERY_KEY, feasibilityQuery);
    this.feasibilityQuery.next(feasibilityQuery);
  }

  public getFeasibilityQuery(): Observable<Query> {
    return this.feasibilityQuery.asObservable();
  }

  public resetToDefaultQuery(): void {
    const defaultQuery = new Query();
    this.storage.clear();
    this.storage.set(this.STORAGE_QUERY_KEY, defaultQuery);
    this.feasibilityQuery.next(defaultQuery);
  }

  /**
   * Function to set inclusion criteria for a specific group
   *
   * @param groupId
   * @param criteria
   */
  public setInclusionCriteria(groupId: number, criteria: Criterion[][]): void {
    this.feasibilityQuery.value.groups[0].inclusionCriteria.push(...criteria); // Using spread operator to push all elements of criteria array
    this.feasibilityQuery.next(this.feasibilityQuery.value);
  }

  /**
   * Function to set exclusion criteria for a specific group
   *
   * @param groupId
   * @param criteria
   */
  public setExclusionCriteria(groupId: number, criteria: Criterion[][]): void {
    this.feasibilityQuery.value.groups[0].exclusionCriteria.push(...criteria); // Using spread operator to push all elements of criteria array
    this.feasibilityQuery.next(this.feasibilityQuery.value);
  }
}
