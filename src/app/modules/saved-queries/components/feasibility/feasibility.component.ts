import { Component, OnInit, OnDestroy, Query } from '@angular/core';
import { FeasibilityQueryProviderService } from '../../../../service/Provider/FeasibilityQueryProvider.service';
import { first, Observable, Subscription } from 'rxjs';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SavedFeasibilityQueryService } from '../../services/SavedFeasibilityQuery.service';
import { StructuredQuery2FeasibilityQueryService } from '../../../../service/Translator/StructureQuery/StructuredQuery2FeasibilityQuery.service';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { v4 as uuidv4 } from 'uuid';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { StructuredQuery2UIQueryTranslatorService } from '../../../../service/Translator/StructureQuery/StructuredQuery2UIQueryTranslator.service';
import { ConsentService } from '../../../../service/Consent/Consent.service';
import { SavedDataQuery } from 'src/app/model/SavedDataQuery/SavedDataQuery';

@Component({
  selector: 'num-feasibility',
  templateUrl: './feasibility.component.html',
  styleUrls: ['./feasibility.component.scss'],
})
export class FeasibilityComponent implements OnInit, OnDestroy {
  savedQueries$: Observable<InterfaceSavedQueryTile[]>;
  loadSubscription: Subscription;
  constructor(
    private savedFeasibilityQueryService: SavedFeasibilityQueryService,
    private SQToFQTranslator: StructuredQuery2FeasibilityQueryService,
    private SQToUIQueryTranslator: StructuredQuery2UIQueryTranslatorService,
    private feasibilityQueryService: FeasibilityQueryProviderService,
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
    this.savedQueries$ = this.savedFeasibilityQueryService.loadSavedQueries();
  }

  public deleteSavedFeasibility(id: string) {
    this.savedFeasibilityQueryService
      .deleteQuery(Number(id))
      .pipe(first())
      .subscribe(() => {
        this.loadSavedQueries();
      });
  }

  loadQueryIntoEditor(id: string) {
    this.loadSubscription = this.savedFeasibilityQueryService
      .getDataQueryById(Number(id))
      .subscribe((savedFeasibilityQuery: SavedDataQuery) => {
        console.log(savedFeasibilityQuery);
        const feasibilityQuery = savedFeasibilityQuery.getCrtdl().getFeasibilityQuery();
        const queryResult = new QueryResult(
          false,
          feasibilityQuery.getId(),
          savedFeasibilityQuery.getTotalNumberOfPatients(),
          uuidv4()
        );
        this.resultProviderService.setResultByID(queryResult, queryResult.getId());
        feasibilityQuery.setResultIds([queryResult.getId()]);
        if (!feasibilityQuery.getConsent()) {
          this.consentService.setProvisionCode(false, false, false, false);
          this.consentService.setConsent(false);
        }
        this.feasibilityQueryService.setFeasibilityQueryByID(
          feasibilityQuery,
          feasibilityQuery.getId(),
          true
        );
        this.navigationHelperService.navigateToDataQueryCohortDefinition();
      });
  }
}
