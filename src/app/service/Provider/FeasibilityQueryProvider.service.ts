import { BehaviorSubject, map, Observable, switchMap, combineLatest } from 'rxjs';
import { FeasibilityQuery } from '../../model/FeasibilityQuery/FeasibilityQuery';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ActiveFeasibilityQueryService } from './ActiveFeasibilityQuery.service';
import { v4 as uuidv4 } from 'uuid';
import { CriterionProviderService } from './CriterionProvider.service';
import { ResultProviderService } from './ResultProvider.service';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryProviderService {
  private readonly STORAGE_QUERY_KEY = 'QUERY';
  private feasibilityQueryMap: Map<string, FeasibilityQuery> = new Map();
  private feasibilityQueryMapSubject: BehaviorSubject<Map<string, FeasibilityQuery>> =
    new BehaviorSubject(new Map());
  private foundMissingFilterCriteria: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private foundInvalidCriteria: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private isInclusionSet: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isFeasibilityQuerySet: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private hasQueryResult: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private feasibilityQueryIDToResultIDMap: Map<string, string> = new Map();
  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private activeFeasibilityQuery: ActiveFeasibilityQueryService,
    private criterionService: CriterionProviderService,
    private resultProvider: ResultProviderService
  ) {
    this.loadInitialQuery();
  }

  /**
   * Loads the initial feasibility query from local storage.
   * If no query is stored, initializes with a default query.
   */
  private loadInitialQuery(): void {
    const storedQuery = this.storage.get(this.STORAGE_QUERY_KEY);
    const uid = uuidv4();
    if (storedQuery && storedQuery.groups) {
      this.storage.remove(this.STORAGE_QUERY_KEY);
    }
    this.setFeasibilityQueryByID(new FeasibilityQuery(uid), uid, true);
  }

  /**
   * Sets the feasibility query and updates local storage.
   *
   * @param id the uid to set
   * @param feasibilityQuery The new feasibility query to set
   */
  public setFeasibilityQueryByID(
    feasibilityQuery: FeasibilityQuery,
    id: string,
    setAsActive: boolean = false
  ): void {
    this.storage.set(this.STORAGE_QUERY_KEY, feasibilityQuery);
    this.feasibilityQueryMap.set(id, feasibilityQuery);
    this.feasibilityQueryMapSubject.next(new Map(this.feasibilityQueryMap));
    if (setAsActive) {
      this.activeFeasibilityQuery.setActiveFeasibilityQueryID(id);
    }
    this.checkCriteria();
  }

  /**
   * Retrieves the current feasibility query as an observable.
   *
   * @returns Observable<Query>
   */
  public getFeasibilityQueryByID(id: string): Observable<FeasibilityQuery> {
    return this.feasibilityQueryMapSubject.pipe(
      map((feasibilityQueryMap) => feasibilityQueryMap.get(id))
    );
  }

  public getActiveFeasibilityQuery(): Observable<FeasibilityQuery> {
    return this.activeFeasibilityQuery
      .getActiveFeasibilityQueryIdObservable()
      .pipe(
        switchMap((id) =>
          this.feasibilityQueryMapSubject.pipe(
            map((feasibilityQueryMap) => feasibilityQueryMap.get(id))
          )
        )
      );
  }
  /**
   * Retrieves the current feasibility query map as an observable.
   *
   * @returns Observable<Query>
   */
  public getFeasibilityQueryMap(): Observable<Map<string, FeasibilityQuery>> {
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

  public setInclusionCriteria(criteria: string[][]): void {
    const feasibilityQuery = this.feasibilityQueryMap.get(
      this.activeFeasibilityQuery.getActiveFeasibilityQueryID()
    );
    feasibilityQuery.setInclusionCriteria(criteria);
    this.feasibilityQueryMap.set(
      this.activeFeasibilityQuery.getActiveFeasibilityQueryID(),
      feasibilityQuery
    );
    this.checkCriteria();
    this.feasibilityQueryMapSubject.next(new Map(this.feasibilityQueryMap));
  }

  public setExclusionCriteria(criteria: string[][]): void {
    const feasibilityQuery = this.feasibilityQueryMap.get(
      this.activeFeasibilityQuery.getActiveFeasibilityQueryID()
    );
    feasibilityQuery.setExclusionCriteria(criteria);
    this.feasibilityQueryMap.set(
      this.activeFeasibilityQuery.getActiveFeasibilityQueryID(),
      feasibilityQuery
    );
    this.checkCriteria();
    this.feasibilityQueryMapSubject.next(new Map(this.feasibilityQueryMap));
  }

  public deleteFromInclusion(uid: string): void {
    const feasibilityQuery = this.feasibilityQueryMap.get(
      this.activeFeasibilityQuery.getActiveFeasibilityQueryID()
    );
    const criteria = this.deleteCriterion(feasibilityQuery.getInclusionCriteria(), uid);
    this.setInclusionCriteria(criteria);
  }
  public deleteFromExclusion(uid: string): void {
    const feasibilityQuery = this.feasibilityQueryMap.get(
      this.activeFeasibilityQuery.getActiveFeasibilityQueryID()
    );
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

  public checkCriteria(): void {
    const foundMissingFilterCriteria: string[] = [];
    const foundInvalidCriteria: string[] = [];

    const feasibilityQuery = this.feasibilityQueryMap.get(
      this.activeFeasibilityQuery.getActiveFeasibilityQueryID()
    );
    feasibilityQuery.getInclusionCriteria().forEach((innerArray) => {
      foundMissingFilterCriteria.push(
        ...innerArray.filter(
          (criterion) =>
            this.criterionService.getCriterionByUID(criterion).getIsRequiredFilterSet() === false
        )
      );
      this.foundMissingFilterCriteria.next(foundMissingFilterCriteria);
      foundInvalidCriteria.push(
        ...innerArray.filter(
          (criterion) => this.criterionService.getCriterionByUID(criterion).getIsInvalid() === true
        )
      );

      this.foundInvalidCriteria.next(foundInvalidCriteria);
    });
    feasibilityQuery.getExclusionCriteria().forEach((innerArray) => {
      foundMissingFilterCriteria.push(
        ...innerArray.filter(
          (criterion) =>
            this.criterionService.getCriterionByUID(criterion).getIsRequiredFilterSet() === false
        )
      );
      this.foundMissingFilterCriteria.next(foundMissingFilterCriteria);
      foundInvalidCriteria.push(
        ...innerArray.filter(
          (criterion) => this.criterionService.getCriterionByUID(criterion).getIsInvalid() === true
        )
      );
      this.foundInvalidCriteria.next(foundInvalidCriteria);
    });
    this.isInclusionSet.next(feasibilityQuery.getInclusionCriteria().length > 0);
    this.isFeasibilityQuerySet.next(
      feasibilityQuery.getInclusionCriteria().length > 0 ||
        feasibilityQuery.getExclusionCriteria().length > 0
    );

    this.resultProvider
      .getResultMap()
      .pipe(
        map((resultMap) => {
          const resultArray = Array.from(resultMap.values());
          const latestResult = resultArray[resultArray.length - 1];
          return !!latestResult?.getTotalNumberOfPatients();
        })
      )
      .subscribe((hasResult) => {
        this.hasQueryResult.next(hasResult);
      });
  }
  public getMissingRequiredFilterCriteria(): Observable<string[]> {
    return this.foundMissingFilterCriteria.asObservable();
  }
  public getInvalidCriteria(): Observable<string[]> {
    return this.foundInvalidCriteria.asObservable();
  }
  public getIsInclusionSet(): Observable<boolean> {
    return this.isInclusionSet.asObservable();
  }
  public getIsFeasibilityQuerySet(): Observable<boolean> {
    return this.isFeasibilityQuerySet.asObservable();
  }
  public getIsFeasibilityQueryValid(): Observable<boolean> {
    return combineLatest([
      this.getMissingRequiredFilterCriteria().pipe(map((criteria) => criteria.length === 0)),
      this.getInvalidCriteria().pipe(map((criteria) => criteria.length === 0)),
      this.getIsInclusionSet(),
    ]).pipe(
      map(
        ([noMissingCriteria, noInvalidCriteria, isInclusionSet]) =>
          noMissingCriteria && noInvalidCriteria && isInclusionSet
      )
    );
  }
  public getHasQueryResult(): Observable<boolean> {
    return this.hasQueryResult.asObservable();
  }
}
