import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { Query } from '../model/FeasibilityQuery/Query';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CriterionService } from './CriterionService.service';

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
    if (storedQuery) {
      this.feasibilityQuery.next(storedQuery);
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
    this.storage.set(this.STORAGE_QUERY_KEY, defaultQuery);
    this.feasibilityQuery.next(defaultQuery);
  }
}
