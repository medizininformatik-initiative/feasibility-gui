import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchFilterService } from '../Search/Filter/SearchFilter.service';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchFilterResolverService {
  constructor(private searchFilterService: SearchFilterService) {}

  resolve(): Observable<Array<SearchTermFilter>> {
    return this.searchFilterService.fetchFilters();
  }
}
