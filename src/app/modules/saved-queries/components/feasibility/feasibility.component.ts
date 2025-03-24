import { ConsentService } from '../../../../service/Consent/Consent.service';
import { DataQueryStorageService } from 'src/app/service/DataQuery/DataQueryStorage.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../../../../service/Provider/FeasibilityQueryProvider.service';
import { first, Observable, Subscription } from 'rxjs';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { SavedDataQuery } from 'src/app/model/SavedDataQuery/SavedDataQuery';
import { v4 as uuidv4 } from 'uuid';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'num-feasibility',
  templateUrl: './feasibility.component.html',
  styleUrls: ['./feasibility.component.scss'],
})
export class FeasibilityComponent implements OnInit, OnDestroy {
  savedQueries$: Observable<InterfaceSavedQueryTile[]>;
  loadSubscription: Subscription;
  constructor(
    private dataQueryStorageService: DataQueryStorageService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService,
    private navigationHelperService: NavigationHelperService,
    private resultProviderService: ResultProviderService,
    private consentService: ConsentService
  ) {}

  ngOnInit() {
    this.loadSavedQueries();
  }

  ngOnDestroy() {
    this.loadSubscription?.unsubscribe();
  }

  private loadSavedQueries() {
    this.savedQueries$ = this.dataQueryStorageService.readDataQueries();
  }

  public deleteSavedFeasibility(id: string) {
    this.dataQueryStorageService
      .deleteDataQueryById(Number(id))
      .pipe(first())
      .subscribe(() => {
        this.loadSavedQueries();
      });
  }

  public loadQueryIntoEditor(id: string) {
    this.loadSubscription = this.dataQueryStorageService
      .readDataQueryById(Number(id))
      .subscribe((savedQuery: SavedDataQuery) => {
        const feasibilityQuery = this.extractFeasibilityQuery(savedQuery);
        const queryResult = this.createQueryResult(feasibilityQuery, savedQuery);
        this.resultProviderService.setResultByID(queryResult, queryResult.getId());
        feasibilityQuery.setResultIds([queryResult.getId()]);

        this.handleConsent(feasibilityQuery);
        this.saveQueryAndNavigate(feasibilityQuery);
      });
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

  private handleConsent(feasibilityQuery: FeasibilityQuery): void {
    if (!feasibilityQuery.getConsent()) {
      this.consentService.setProvisionCode(false, false, false, false);
      this.consentService.setConsent(false);
    }
  }

  private saveQueryAndNavigate(feasibilityQuery: FeasibilityQuery): void {
    this.feasibilityQueryProviderService.setFeasibilityQueryByID(
      feasibilityQuery,
      feasibilityQuery.getId(),
      true
    );
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
