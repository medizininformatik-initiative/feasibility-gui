import { Component, OnDestroy, OnInit } from '@angular/core'
import { Query } from '../../model/api/query/query'
import { QueryProviderService } from '../../service/query-provider.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-querybuilder',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit, OnDestroy {
  query: Query

  private subscription: Subscription

  constructor(public queryProviderService: QueryProviderService) {}

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  storeQuery(query: Query): void {
    this.query = query
    this.queryProviderService.store(query)
  }
}
