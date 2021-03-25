import { Component, OnDestroy, OnInit } from '@angular/core'
import { Query } from '../../model/api/query/query'
import { QueryProviderService } from '../../service/query-provider.service'
import { QueryResult } from '../../model/api/result/QueryResult'
import { interval, Observable, Subscription, timer } from 'rxjs'
import { BackendService } from '../../service/backend.service'
import { map, share, switchAll, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'num-querybuilder',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit, OnDestroy {
  readonly POLLING_INTERVALL_MILLISECONDS = 1000
  readonly POLLING_MAXL_MILLISECONDS = 300 * 1000

  query: Query

  result: QueryResult

  resultUrl: string

  showSpinningIcon = false

  subscriptionPolling: Subscription
  private subscriptionResult: Subscription
  public resultObservable$: Observable<QueryResult>

  constructor(public queryProviderService: QueryProviderService, public backend: BackendService) {}

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
  }

  ngOnDestroy(): void {
    this.subscriptionPolling?.unsubscribe()
    this.subscriptionResult?.unsubscribe()
  }

  storeQuery(query: Query): void {
    this.query = query
    this.queryProviderService.store(query)
  }

  startRequestingResult(resultUrl: string): void {
    this.resultUrl = resultUrl

    this.resultObservable$ = interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS)),
      map(() => this.backend.getResult(this.resultUrl)),
      share(),
      switchAll()
    )
    this.subscriptionPolling = this.resultObservable$.subscribe(
      (result) => {
        this.result = result
      },
      (error) => {
        console.error(error)
      },
      () => {
        this.resultUrl = ''
      }
    )
  }

  doSend(): void {
    this.showSpinningIcon = true
    this.subscriptionResult?.unsubscribe()
    this.subscriptionResult = this.backend
      .postQuery(this.query)
      .subscribe((response) => this.startRequestingResult(response.location))
  }

  doReset(): void {
    this.query = QueryProviderService.createDefaultQuery()
    this.queryProviderService.store(this.query)
  }
}
