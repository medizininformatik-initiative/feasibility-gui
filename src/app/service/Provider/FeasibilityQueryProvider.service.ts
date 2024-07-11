import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { FeasibilityQuery } from '../../model/FeasibilityQuery/FeasibilityQuery';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryProviderService {
  private readonly STORAGE_QUERY_KEY = 'QUERY';
  private feasibilityQuery: BehaviorSubject<FeasibilityQuery> = new BehaviorSubject(
    new FeasibilityQuery()
  );

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.loadInitialQuery();
  }

  /**
   * Loads the initial feasibility query from local storage.
   * If no query is stored, initializes with a default query.
   */
  private loadInitialQuery(): void {
    const storedQuery = this.storage.get(this.STORAGE_QUERY_KEY);
    if (storedQuery && storedQuery.groups) {
      this.storage.remove(this.STORAGE_QUERY_KEY);
      this.setFeasibilityQuery(new FeasibilityQuery());
    } else {
      this.feasibilityQuery = new BehaviorSubject(new FeasibilityQuery());
    }
  }

  /**
   * Sets the feasibility query and updates local storage.
   *
   * @param feasibilityQuery The new feasibility query to set
   */
  public setFeasibilityQuery(feasibilityQuery: FeasibilityQuery): void {
    this.storage.set(this.STORAGE_QUERY_KEY, feasibilityQuery);
    this.feasibilityQuery.next(feasibilityQuery);
    console.log(this.feasibilityQuery);
  }

  /**
   * Retrieves the current feasibility query as an observable.
   *
   * @returns Observable<Query>
   */
  public getFeasibilityQuery(): Observable<FeasibilityQuery> {
    return this.feasibilityQuery.asObservable();
  }

  /**
   * Resets the feasibility query to the default query and updates local storage.
   */
  public resetToDefaultQuery(): void {
    const defaultQuery = new FeasibilityQuery();
    this.storage.clear();
    this.storage.set(this.STORAGE_QUERY_KEY, defaultQuery);
    this.feasibilityQuery.next(defaultQuery);
  }

  /**
   * Updates the feasibility query with a new query object.
   *
   * @param updatedQuery The updated query object
   */
  public updateFeasibilityQuery(updatedQuery: FeasibilityQuery): void {
    this.setFeasibilityQuery(updatedQuery);
  }
}
