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
  private criterionHashMapSubject: BehaviorSubject<Map<string, Criterion[]>> = new BehaviorSubject(
    null
  );
  private criterionUIDMapSubject: BehaviorSubject<Map<string, Criterion>> = new BehaviorSubject(
    null
  );
  private criterionMapInitialized: Promise<void>;
  private criterionHashMap: Map<string, Criterion[]> = new Map();
  private criterionUIDMap: Map<string, Criterion> = new Map();

  public constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {
    this.criterionMapInitialized = new Promise<void>((resolve) => {
      this.updateCriterionMap().then(() => resolve());
    });
  }

  public async setFeasibilityQuery(feasibilityQuery: Query) {
    await this.criterionMapInitialized;
    this.updateCriterionMap();
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

  public getCriterionHashMap(): Observable<Map<string, Criterion[]>> {
    return this.criterionHashMapSubject.asObservable();
  }
  public getCriterionUIDMap(): Observable<Map<string, Criterion>> {
    return this.criterionUIDMapSubject.asObservable();
  }
  public getCriterionByHash(hash: string): Criterion[] {
    return this.criterionHashMap.get(hash);
  }
  public getCriterionByUID(uid: string): Criterion {
    return this.criterionUIDMap.get(uid);
  }
  private async updateCriterionMap() {
    this.criterionHashMap.clear();
    this.criterionUIDMap.clear();

    this.feasibilityQuery.getValue().groups.forEach((group) => {
      for (const inex of ['inclusion', 'exclusion']) {
        group[inex + 'Criteria'].forEach((criteriaArray: Criterion[]) => {
          criteriaArray.forEach((criteria) => {
            if (criteria.criterionHash) {
              this.addToMap(this.criterionHashMap, criteria.criterionHash, criteria);
            }
            if (criteria.uniqueID) {
              this.criterionUIDMap.set(criteria.uniqueID, criteria);
            }
          });
        });
      }
    });

    this.criterionHashMapSubject.next(this.criterionHashMap);
    this.criterionUIDMapSubject.next(this.criterionUIDMap);
  }

  private addToMap(map: Map<string, Criterion[]>, key: string, value: Criterion) {
    if (map.has(key)) {
      map.get(key).push(value);
    } else {
      map.set(key, [value]);
    }
  }
}
