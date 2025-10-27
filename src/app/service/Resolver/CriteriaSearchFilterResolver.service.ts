import { CriteriaSearchFilter } from 'src/app/model/Search/Filter/CriteriaSearchFilter';
import { FilterProvider } from '../Search/Filter/SearchFilterProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchFilterService } from '../Search/Filter/SearchFilter.service';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchFilterResolverService {
  constructor(
    private searchFilterService: SearchFilterService,
    private filterProvider: FilterProvider
  ) {}

  public resolve(): Observable<Array<CriteriaSearchFilter>> {
    return this.searchFilterService.fetchFilters().pipe(
      map((filters) => {
        this.filterProvider.initializeFilterMap(filters);
        return filters;
      })
    );
  }
}
