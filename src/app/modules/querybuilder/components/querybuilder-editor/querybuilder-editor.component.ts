import { Component, OnDestroy, OnInit } from '@angular/core'
import { Query } from '../../model/api/query/query'
import { QueryProviderService } from '../../service/query-provider.service'
import { QueryResult } from '../../model/api/result/QueryResult'
import { interval, Subscription, timer } from 'rxjs'
import { BackendService } from '../../service/backend.service'
import { map, switchAll, takeUntil } from 'rxjs/operators'

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

  private subscriptionPolling: Subscription

  constructor(public queryProviderService: QueryProviderService, private backend: BackendService) {}

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
  }

  ngOnDestroy(): void {
    this.subscriptionPolling?.unsubscribe()
  }

  storeQuery(query: Query): void {
    this.query = query
    this.queryProviderService.store(query)
  }

  startRequestingResult(resultUrl: string): void {
    this.resultUrl = resultUrl

    this.subscriptionPolling = interval(this.POLLING_INTERVALL_MILLISECONDS)
      .pipe(
        takeUntil(timer(this.POLLING_MAXL_MILLISECONDS)),
        map(() => this.backend.getResult(this.resultUrl)),
        switchAll()
      )
      .subscribe(
        (result) => {
          this.result = result
        },
        (error) => {
          console.log(error)
        },
        () => {
          this.resultUrl = ''
        }
      )
  }
}
