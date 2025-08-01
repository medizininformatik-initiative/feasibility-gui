import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchFilterService } from '../Search/Filter/SearchFilter.service';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { FilterProvider } from '../Search/Filter/SearchFilterProvider.service';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchFilterResolverService {
  constructor(
    private searchFilterService: SearchFilterService,
    private filterProvider: FilterProvider
  ) {}

  public resolve(): Observable<Array<SearchTermFilter>> {
    return this.searchFilterService.fetchFilters().pipe(
      map((filters) => {
        this.filterProvider.initializeFilterMap(filters);
        return filters;
      })
    );
  }
}
