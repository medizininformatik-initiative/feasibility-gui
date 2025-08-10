import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TerminologyApiService } from '../../Backend/Api/TerminologyApi.service';
import { CriteriaSearchFilter } from 'src/app/model/Search/SearchFilter/CriteriaSearchFilter';
import { CriteriaSearchFilterValue } from 'src/app/model/Search/SearchFilter/CriteriaSearchFilterValue';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {
  constructor(private backendService: TerminologyApiService) {}

  /**
   * Fetches available filters from the backend and updates the filters subject.
   *
   * @returns An Observable emitting the current list of filters.
   */
  public fetchFilters(): Observable<Array<CriteriaSearchFilter>> {
    return this.backendService
      .getSearchFilter()
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
  }): CriteriaSearchFilter {
    const searchTermValues = this.buildSearchTermValues(filter.values);
    const filterType = this.setFilterType(filter.name);
    return new CriteriaSearchFilter(filterType, searchTermValues);
  }

  private buildSearchTermValues(
    values: [{ count: number; label: string }]
  ): CriteriaSearchFilterValue[] {
    return values.map((value) => new CriteriaSearchFilterValue(value.count, value.label));
  }

  private setFilterType(name: string): ElasticSearchFilterTypes {
    return ElasticSearchFilterTypes[name.toUpperCase() as keyof typeof FilterTypes];
  }
}
