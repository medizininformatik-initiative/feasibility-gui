import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermFilterValues } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilterValues';
import { TerminologyApiService } from '../../Backend/Api/TerminologyApi.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private backendService: TerminologyApiService) {}

  /**
   * Fetches available filters from the backend and updates the filters subject.
   *
   * @returns An Observable emitting the current list of filters.
   */
  public fetchFilters(): Observable<Array<SearchTermFilter>> {
    return this.backendService
      .getElasticSearchFilter()
      .pipe(
        map((response) =>
          response
            .filter((filter) => filter.values && filter.values.length > 0)
            .map((filter) => this.createSearchTermFilter(filter))
        )
      );
  }

  private createSearchTermFilter(filter: {
    name: string
    type: string
    values: [{ count: number; label: string }]
  }): SearchTermFilter {
    const searchTermValues = this.buildSearchTermValues(filter.values);
    const filterType = this.setFilterType(filter.name);
    return new SearchTermFilter(filterType, searchTermValues);
  }

  private buildSearchTermValues(
    values: [{ count: number; label: string }]
  ): SearchTermFilterValues[] {
    return values.map((value) => new SearchTermFilterValues(value.count, value.label));
  }

  private setFilterType(name: string): ElasticSearchFilterTypes {
    return ElasticSearchFilterTypes[name.toUpperCase() as keyof typeof FilterTypes];
  }
}
