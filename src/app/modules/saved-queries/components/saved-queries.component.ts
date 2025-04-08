import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsentService } from 'src/app/service/Consent/Consent.service';
import { DataQueryStorageService } from 'src/app/service/DataQuery/DataQueryStorage.service';
import { map, take, tap } from 'rxjs/operators';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable, Subscription } from 'rxjs';
import { QueryResultFactoryService } from 'src/app/service/FeasibilityQuery/Result/QueryResultFactory.service';
import { SavedDataQuery } from 'src/app/model/SavedDataQuery/SavedDataQuery';
import { SavedQueryGroupingService } from 'src/app/service/SavedQueryGrouping.service';
import { SavedQueryType } from 'src/app/model/Types/SavedQuery';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';

@Component({
  selector: 'num-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss'],
})
export class SavedQueriesComponent implements OnInit, OnDestroy {
  queryCategories$: Observable<SavedQueryType[]>;
  savedQueriesLength$: Observable<number>;

  deleteSubscription: Subscription;
  readDataQueryByIdSubscription: Subscription;

  constructor(
    private terminologySystemProvider: TerminologySystemProvider,
    private dataQueryStorageService: DataQueryStorageService,
    private consentService: ConsentService,
    private navigationHelperService: NavigationHelperService,
    private savedQueryCategoriesService: SavedQueryGroupingService,
    private queryResultFactoryService: QueryResultFactoryService
  ) {}

  ngOnInit() {
    this.categorizeSavedQueries();
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
    this.readDataQueryByIdSubscription?.unsubscribe();
  }

  private categorizeSavedQueries() {
    const savedQueries$ = this.dataQueryStorageService.readDataQueries();
    this.queryCategories$ =
      this.savedQueryCategoriesService.categorizeSavedDataQueries(savedQueries$);
    this.setTotalNumberOfSavedQueries(this.queryCategories$);
  }

  private setTotalNumberOfSavedQueries(queryCategories$: Observable<SavedQueryType[]>) {
    this.savedQueriesLength$ = queryCategories$.pipe(
      map((categories) => categories.reduce((sum, category) => sum + category.length, 0))
    );
  }

  public deleteSavedFeasibility(id: string): void {
    this.deleteSubscription?.unsubscribe();
    this.deleteSubscription = this.dataQueryStorageService
      .deleteDataQueryById(Number(id))
      .pipe(tap(() => this.categorizeSavedQueries()))
      .subscribe();
  }

  public loadQueryIntoEditor(id: string): void {
    this.consentService.clearConsent();
    this.fetchSavedQueryById(id).subscribe({
      next: (savedQuery) => this.handleFetchedQuery(savedQuery),
      error: (error) => this.handleLoadError(error, id),
      complete: () => this.navigateToEditor(),
    });
  }

  private fetchSavedQueryById(id: string): Observable<SavedDataQuery> {
    return this.dataQueryStorageService.readDataQueryById(Number(id)).pipe(take(1));
  }

  private handleFetchedQuery(savedQuery: SavedDataQuery): void {
    const feasibilityQuery = savedQuery.getCrtdl()?.getFeasibilityQuery();
    if (feasibilityQuery) {
      this.setResult(feasibilityQuery, savedQuery.getTotalNumberOfPatients());
    }
  }

  private handleLoadError(error: any, id: string): void {
    console.error(`Error loading query with ID ${id}:`, error);
  }

  private setResult(feasibilityQuery: FeasibilityQuery, totalNumberOfPatients: number) {
    this.queryResultFactoryService.prepareQueryResult(feasibilityQuery, totalNumberOfPatients);
  }

  private navigateToEditor(): void {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
