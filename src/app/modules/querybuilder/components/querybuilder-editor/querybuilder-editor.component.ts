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

  constructor(private queryProviderService: QueryProviderService) {}

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
  }
}
