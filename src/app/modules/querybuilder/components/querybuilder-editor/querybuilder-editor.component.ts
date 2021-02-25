import { Component, OnInit } from '@angular/core'
import { Query } from '../../model/api/query/query'
import { QueryProviderService } from '../../service/query-provider.service'

@Component({
  selector: 'num-querybuilder',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit {
  query: Query

  constructor(public queryProviderService: QueryProviderService) {}

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
  }

  storeQuery(query: Query): void {
    this.query = query
    this.queryProviderService.store(query)
  }
}
