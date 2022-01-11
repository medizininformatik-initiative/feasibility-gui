import { Component, OnInit } from '@angular/core'
import { QueryProviderService } from '../../service/query-provider.service'
import { HttpClient } from '@angular/common/http'
import { Query } from '../../model/api/query/query'
import { Router } from '@angular/router'

@Component({
  selector: 'num-querybuilder-overview',
  templateUrl: './querybuilder-overview.component.html',
  styleUrls: ['./querybuilder-overview.component.scss'],
})
export class QuerybuilderOverviewComponent implements OnInit {
  constructor(
    public queryProviderService: QueryProviderService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  query: Query
  title = ''
  comment = ''

  savedQueries: Array<{
    query: Query
    title: string
    comment: string
    date: number
  }> = []

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
    this.savedQueries = this.queryProviderService.loadQueries()
    if (this.savedQueries === undefined) {
      this.savedQueries = []
    }
  }

  loadQuery(singleQuery: Query): void {
    this.query = singleQuery
    this.queryProviderService.store(this.query)
    this.router.navigate(['/querybuilder/editor'], { state: { preventReset: true } })
  }
}
