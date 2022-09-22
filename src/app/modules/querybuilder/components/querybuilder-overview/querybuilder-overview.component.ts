import { Component, OnInit } from '@angular/core'
import { QueryProviderService } from '../../service/query-provider.service'
import { HttpClient } from '@angular/common/http'
import { Query } from '../../model/api/query/query'
import { Router } from '@angular/router'
import { BackendService } from '../../service/backend.service'
import { Subscription } from 'rxjs'
import { FeatureService } from '../../../../service/feature.service'
import { TimeRestrictionType } from '../../model/api/query/timerestriction'
import { ApiTranslator } from '../../controller/ApiTranslator'

@Component({
  selector: 'num-querybuilder-overview',
  templateUrl: './querybuilder-overview.component.html',
  styleUrls: ['./querybuilder-overview.component.scss'],
})
export class QuerybuilderOverviewComponent implements OnInit {
  constructor(
    public queryProviderService: QueryProviderService,
    private httpClient: HttpClient,
    private router: Router,
    private backend: BackendService,
    private feature: FeatureService
  ) {}

  private savedQueriesSubscription: Subscription
  private savedTemplatesSubscription: Subscription
  private singleQuerySubscription: Subscription
  private singleTemplateSubscription: Subscription

  query: Query
  title = ''
  comment = ''

  savedQueries: Array<{
    id: number
    label: string
    created_at: Date
  }> = []

  savedTemplates: Array<{
    id?: number
    content?: Query
    label: string
    comment: string
    lastModified: Date
    createdBy?: string
    isValid?: boolean
  }> = []

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
    this.savedQueriesSubscription?.unsubscribe()
    this.savedTemplatesSubscription?.unsubscribe()
    this.singleQuerySubscription?.unsubscribe()
    this.singleTemplateSubscription?.unsubscribe()
    this.savedQueriesSubscription = this.backend.loadSavedQueries().subscribe((queries) => {
      this.savedQueries = queries
    })
    this.savedTemplatesSubscription = this.backend.loadSavedTemplates().subscribe((templates) => {
      this.savedTemplates = templates
    })
  }

  loadTemplate(id: number, singleQuery: Query): void {
    if (this.feature.mockLoadnSave()) {
      this.query = singleQuery
      this.queryProviderService.store(this.query)
      this.router.navigate(['/querybuilder/editor'], { state: { preventReset: true } })
    } else {
      this.singleTemplateSubscription = this.backend.loadTemplate(id).subscribe((query) => {
        this.query = new ApiTranslator().translateSQtoUIQuery(
          QueryProviderService.createDefaultQuery(),
          query
        )
        this.queryProviderService.store(this.query)
        this.router.navigate(['/querybuilder/editor'], { state: { preventReset: true } })
      })
    }
  }

  loadQuery(id: number): void {
    this.singleQuerySubscription = this.backend.loadQuery(id).subscribe((query) => {
      this.query = new ApiTranslator().translateSQtoUIQuery(
        QueryProviderService.createDefaultQuery(),
        query
      )
      this.queryProviderService.store(this.query)
      this.router.navigate(['/querybuilder/editor'], {
        state: { preventReset: true, loadedResult: query.results },
      })
    })
  }

  doValidate(): void {
    this.savedTemplatesSubscription = this.backend.loadSavedTemplates(true).subscribe((queries) => {
      this.savedTemplates = queries
    })
  }
}
