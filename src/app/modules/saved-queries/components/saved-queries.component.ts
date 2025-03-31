import { Component, OnInit } from '@angular/core';
import { ConsentService } from 'src/app/service/Consent/Consent.service';
import { DataQueryStorageService } from 'src/app/service/DataQuery/DataQueryStorage.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { map, tap } from 'rxjs/operators';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable } from 'rxjs';
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

  t = [
    {
      title: 'cohort',
      length: 0,
    },
    {
      title: 'dataselection',
      length: 0,
    },
    {
      title: 'datadefinition',
      length: 0,
    },
  ];

  selectedValues = 'Cohort';

  savedQueriesLength: number;

  cohortDefinitions: InterfaceSavedQueryTile[];
  dataDefinitions: InterfaceSavedQueryTile[];
  dataSelection: InterfaceSavedQueryTile[];

  resultSize: number;

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

  public onSelectionChange() {
    console.log(this.selectedValues);
  }

  private loadSavedQueries() {
    this.dataQueryStorageService
      .readDataQueries()
      .pipe(
        map((queries) => {
          this.cohortDefinitions = queries
            .filter((query) => query.ccdl.exists && !query.dataExtraction.exists)
            .map((query) => this.adaptQuery(query));
          this.t[0].length = this.cohortDefinitions.length;

          this.dataSelection = queries
            .filter((query) => !query.ccdl.exists && query.dataExtraction.exists)
            .map((query) => this.adaptQuery(query));
          this.t[1].length = this.dataSelection.length;

          this.dataDefinitions = queries
            .filter((query) => query.ccdl.exists && query.dataExtraction.exists)
            .map((query) => this.adaptQuery(query));
          this.t[2].length = this.dataDefinitions.length;
        })
      )
      .subscribe(() => {
        this.savedQueriesLength =
          this.dataDefinitions.length + this.cohortDefinitions.length + this.dataSelection.length;
      });
  }

  private adaptQuery(query: any): InterfaceSavedQueryTile {
    const savedDataQueryListItem = SavedDataQueryListItem.fromJson(query);
    return SavedFeasibilityQueryAdapter.adapt(savedDataQueryListItem);
  }

  public deleteSavedFeasibility(id: string) {
    this.dataQueryStorageService.deleteDataQueryById(Number(id)).subscribe(() => {
      this.loadSavedQueries();
    });
  }

  public loadQueryIntoEditor(id: string) {
    this.consentService.clearConsent();
    this.dataQueryStorageService
      .readDataQueryById(Number(id))
      .pipe(
        map((savedQuery: SavedDataQuery) => {
          const feasibilityQuery = this.extractFeasibilityQuery(savedQuery);
          const queryResult = this.createQueryResult(feasibilityQuery, savedQuery);
          feasibilityQuery.setResultIds([queryResult.getId()]);
          return queryResult;
        }),
        tap((queryResult) => {
          this.resultProviderService.setResultByID(queryResult, queryResult.getId());
        })
      )
      .subscribe(() => this.navigate());
  }

  private extractFeasibilityQuery(savedQuery: SavedDataQuery): FeasibilityQuery {
    return savedQuery.getCrtdl().getFeasibilityQuery();
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

  private navigate(): void {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
