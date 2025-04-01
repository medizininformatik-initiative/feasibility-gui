import { Component, OnInit } from '@angular/core';
import { ConsentService } from 'src/app/service/Consent/Consent.service';
import { DataQueryStorageService } from 'src/app/service/DataQuery/DataQueryStorage.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { map, tap, catchError } from 'rxjs/operators';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable, of } from 'rxjs';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { SavedDataQuery } from 'src/app/model/SavedDataQuery/SavedDataQuery';
import { SavedDataQueryListItem } from 'src/app/model/SavedDataQuery/SavedDataQueryListItem';
import { SavedFeasibilityQueryAdapter } from 'src/app/shared/models/SavedQueryTile/SavedFeasibilityQueryAdapter';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { v4 as uuidv4 } from 'uuid';
import { SavedDataQueryListItemData } from 'src/app/model/Interface/SavedDataQueryListItemData';

@Component({
  selector: 'num-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss'],
})
export class SavedQueriesComponent implements OnInit {
  savedQueries$: Observable<InterfaceSavedQueryTile[]>;

  saveTypes = ['Cohort', 'Datendefinition', 'Dataselection'];

  queryCategories = [
    { title: 'cohort', length: 0 },
    { title: 'dataselection', length: 0 },
    { title: 'datadefinition', length: 0 },
  ];

  selectedCategory = 'Cohort';

  savedQueriesLength = 0;

  cohortDefinitions: InterfaceSavedQueryTile[] = [];
  dataDefinitions: InterfaceSavedQueryTile[] = [];
  dataSelections: InterfaceSavedQueryTile[] = [];

  constructor(
    private terminologySystemProvider: TerminologySystemProvider,
    private dataQueryStorageService: DataQueryStorageService,
    private consentService: ConsentService,
    private navigationHelperService: NavigationHelperService,
    private resultProviderService: ResultProviderService
  ) {}

  ngOnInit() {
    this.loadSavedQueries();
  }

  public onSelectionChange(): void {
    console.log(`Selected category: ${this.selectedCategory}`);
  }

  private loadSavedQueries(): void {
    this.dataQueryStorageService
      .readDataQueries()
      .pipe(
        map((queries) => {
          this.cohortDefinitions = this.getCohortDefinitions(queries);
          this.dataSelections = this.getDataSelections(queries);
          this.dataDefinitions = this.getDataDefinitions(queries);

          this.queryCategories[0].length = this.cohortDefinitions.length;
          this.queryCategories[1].length = this.dataSelections.length;
          this.queryCategories[2].length = this.dataDefinitions.length;
        }),
        tap(() => this.updateSavedQueriesLength()),
        catchError((error) => {
          console.error('Error loading saved queries:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  private getCohortDefinitions(queries: any[]): InterfaceSavedQueryTile[] {
    return queries
      .filter((query) => query.ccdl.exists && !query.dataExtraction.exists)
      .map((query) => this.adaptQuery(query));
  }

  private getDataSelections(queries: any[]): InterfaceSavedQueryTile[] {
    return queries
      .filter((query) => !query.ccdl.exists && query.dataExtraction.exists)
      .map((query) => this.adaptQuery(query));
  }

  private getDataDefinitions(queries: any[]): InterfaceSavedQueryTile[] {
    return queries
      .filter((query) => query.ccdl.exists && query.dataExtraction.exists)
      .map((query) => this.adaptQuery(query));
  }

  private adaptQuery(query: any): InterfaceSavedQueryTile {
    const savedDataQueryListItem = SavedDataQueryListItem.fromJson(query);
    return SavedFeasibilityQueryAdapter.adapt(savedDataQueryListItem);
  }

  private updateSavedQueriesLength(): void {
    this.savedQueriesLength =
      this.cohortDefinitions.length + this.dataSelections.length + this.dataDefinitions.length;
  }

  public deleteSavedFeasibility(id: string): void {
    this.dataQueryStorageService
      .deleteDataQueryById(Number(id))
      .pipe(
        tap(() => this.loadSavedQueries()),
        catchError((error) => {
          console.error('Error deleting saved query:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  public loadQueryIntoEditor(id: string): void {
    this.consentService.clearConsent();
    this.dataQueryStorageService
      .readDataQueryById(Number(id))
      .pipe(
        map((savedQuery: SavedDataQuery) => this.prepareQueryResult(savedQuery)),
        tap((queryResult) =>
          this.resultProviderService.setResultByID(queryResult, queryResult.getId())
        ),
        tap(() => this.navigateToEditor()),
        catchError((error) => {
          console.error('Error loading query into editor:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  private prepareQueryResult(savedQuery: SavedDataQuery): QueryResult {
    const feasibilityQuery = savedQuery.getCrtdl().getFeasibilityQuery();
    const queryResult = this.createQueryResult(feasibilityQuery, savedQuery);
    feasibilityQuery.setResultIds([queryResult.getId()]);
    return queryResult;
  }

  private createQueryResult(
    feasibilityQuery: FeasibilityQuery,
    savedQuery: SavedDataQuery
  ): QueryResult {
    return new QueryResult(
      false,
      feasibilityQuery.getId(),
      savedQuery.getTotalNumberOfPatients(),
      uuidv4()
    );
  }

  private navigateToEditor(): void {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
