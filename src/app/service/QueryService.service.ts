import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { Query } from '../model/FeasibilityQuery/Query';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private STORAGE_QUERY_KEY = 'QUERY';
  private SAVE_QUERY_KEY = 'SAVEDQUERIES';
  private latestQueryId: string;

  private feasibilityQuery: BehaviorSubject<Query> = new BehaviorSubject(new Query());

  public constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {}

  public setFeasibilityQuery(feasibilityQuery: Query) {
    this.storage.set(this.STORAGE_QUERY_KEY, feasibilityQuery);
    this.feasibilityQuery.next(feasibilityQuery);
  }

  /**
   * Accessing the data asynchronously --> You need to subscribe
   *
   * @returns Observable<Query>
   */
  public getFeasibilityQuery(): Observable<Query> {
    return this.feasibilityQuery.asObservable();
  }

  public resetToDefaultQuery(): void {
    const defaultQuery = new Query();
    this.storage.set(this.STORAGE_QUERY_KEY, defaultQuery);
    this.feasibilityQuery.next(defaultQuery);
  }
}
