import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  interval,
  map,
  Observable,
  share,
  Subscription,
  switchAll,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { UIQuery2StructuredQueryTranslatorService } from '../../../../../service/UIQuery2StructuredQueryTranslator.service';
import { QueryResult } from '../../../../../model/Result/QueryResult';
import { FeatureService } from '../../../../../service/Feature.service';
import { BackendService } from '../../../service/backend.service';

@Component({
  selector: 'num-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  readonly POLLING_INTERVALL_MILLISECONDS = this.featureService.getPollingIntervall() * 1000;
  readonly POLLING_MAXL_MILLISECONDS = this.featureService.getPollingTime() * 1000;
  subscriptionPolling: Subscription;
  private subscriptionResult: Subscription;
  public resultObservable$: Observable<QueryResult>;
  gottenDetailedResult: boolean;
  result: QueryResult;
  resultUrl: string;
  showSpinningIcon = false;
  loadedResult = false;
  callsLimit: number;
  callsRemaining: number;
  constructor(
    private queryProviderService: FeasibilityQueryProviderService,
    private translator: UIQuery2StructuredQueryTranslatorService,
    public backend: BackendService,
    public featureService: FeatureService
  ) {}

  ngOnInit() {
    this.getDetailedResultRateLimit();
    this.doSend();
  }
  ngOnDestroy(): void {
    this.subscriptionPolling?.unsubscribe();
    this.subscriptionResult?.unsubscribe();
  }

  doSend(): void {
    this.gottenDetailedResult = false;
    this.loadedResult = false;
    this.resultUrl = '';
    this.result = undefined;
    this.showSpinningIcon = true;
    this.subscriptionResult?.unsubscribe();
    this.subscriptionPolling?.unsubscribe();
    this.featureService.sendClickEvent(this.featureService.getPollingTime());
    this.getDetailedResultRateLimit();
    this.queryProviderService
      .getFeasibilityQueryByID()
      .subscribe((query) => {
        this.subscriptionResult = this.backend
          .postQueryNew(this.translator.translateToStructuredQuery(query.get('1')))
          .subscribe((response) => {
            this.resultUrl = response.headers.get('location'); // response.location)
            this.startRequestingResult();
          });
      })
      .unsubscribe();
  }
  startRequestingResult(): void {
    const summaryResultUrl = this.resultUrl + '/summary-result';
    this.loadedResult = false;
    //this.resultFromSavedQuery = false;
    console.log(summaryResultUrl);
    /*this.resultObservable$ = interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS + 100)),
      map(() => {
         // return this.backend.getSummaryResult(summaryResultUrl)
        this.backend.getSummaryResult(summaryResultUrl).pipe(map(result) => {
          new QueryResult(result.totalNumberOfPatients, result.queryId, result.resultLines, result.issues)
        })

        },
      share(),
      switchAll()
    );
*/

    this.resultObservable$ = interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS + 100)),
      switchMap(() =>
        this.backend
          .getSummaryResult(summaryResultUrl)
          .pipe(
            map(
              (result) =>
                new QueryResult(
                  result.totalNumberOfPatients,
                  result.queryId,
                  result.resultLines,
                  result.issues
                )
            )
          )
      ),
      share()
    );
    this.subscriptionPolling = this.resultObservable$.subscribe(
      (result) => {
        this.result = result;
        //this.storeQueryResult(this.result);
        if (result.getQueryId() !== undefined) {
          //this.hasQuerySend = result.queryId;
        }

        if (result.getIssues() !== undefined) {
          if (result.getIssues()[0].code !== undefined) {
            //this.resultsLargeEnough = false;
          }
        } else {
          //this.resultsLargeEnough = true;
          this.result = result;
          if (result.getQueryId() !== undefined) {
            //this.hasQuerySend = result.queryId;
          } else {
            //this.hasQuerySend = false;
          }
        }
      },
      (error) => {
        this.showSpinningIcon = false;
        //this.hasQuerySend = false;
        if (error.status === 404) {
          //this.snackbar.displayErrorMessage(this.snackbar.errorCodes['404']);
        }
        if (error.status === 429) {
          //this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10002']);
        }
      },
      () => {
        //    if (this.resultsLargeEnough === false) {
        //      this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10004']);
        //    } else {
        this.loadedResult = true;
        //    }
        this.showSpinningIcon = false;
      }
    );
  }

  getDetailedResultRateLimit(): void {
    this.backend.getDetailedResultRateLimit().subscribe(
      (result) => {
        this.callsLimit = result.limit;
        this.callsRemaining = result.remaining;
      },
      (error) => {
        if (error.error.issues !== undefined) {
          if (error.error.issues[0].code !== undefined) {
            //this.snackbar.displayErrorMessage(error.error.issues[0].code);
          }
        }
      }
    );
  }
}
