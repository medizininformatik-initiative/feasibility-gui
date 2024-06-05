import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { Observable } from 'rxjs';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';

@Component({
  selector: 'num-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  filters$: Observable<Array<SearchTermFilter>>;

  constructor(private elasticSearchService: ElasticSearchService) {}

  ngOnInit(): void {
    this.filters$ = this.elasticSearchService.getElasticSearchFilter();
  }
}
