import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermFilterValues } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilterValues';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchFilterService {
  constructor(private backendService: BackendService) {}

  /**
   * Fetches available filters from the backend.
   *
   * @returns An Observable emitting the current list of filters.
   */
  public fetchElasticSearchFilters(): Observable<Array<SearchTermFilter>> {
    return this.backendService
      .getElasticSearchFilter()
      .pipe(map(this.filterValidFilters), map(this.mapToSearchTermFilters));
  }

  /**
   * Filters out invalid filters that have no values or empty values.
   *
   * @param response The array of filters from the backend.
   * @returns An array of valid filters with non-empty values.
   */
  private filterValidFilters(response: any[]): any[] {
    return response.filter((filter) => filter.values && filter.values.length > 0);
  }

  /**
   * Maps an array of filter objects to an array of SearchTermFilter instances.
   *
   * @param filters The array of valid filters.
   * @returns An array of SearchTermFilter instances.
   */
  private mapToSearchTermFilters(filters: any[]): SearchTermFilter[] {
    return filters.map((filter) => this.createSearchTermFilter(filter));
  }

  /**
   * Creates a SearchTermFilter object from the given filter data.
   *
   * @param filter The raw filter data containing name, type, and values.
   * @returns A SearchTermFilter object initialized with the filter type and its values.
   */
  private createSearchTermFilter(filter: {
    name: string
    type: string
    values: [{ count: number; label: string }]
  }): SearchTermFilter {
    const searchTermValues = this.buildSearchTermValues(filter.values);
    const filterType = this.setElasticSearchFilterType(filter.name);
    return new SearchTermFilter(filterType, searchTermValues);
  }

  /**
   * Builds an array of SearchTermFilterValues objects from the raw values data.
   *
   * @param values An array of raw values each containing a count and label.
   * @returns An array of SearchTermFilterValues objects.
   */
  private buildSearchTermValues(
    values: [{ count: number; label: string }]
  ): SearchTermFilterValues[] {
    return values.map((value) => new SearchTermFilterValues(value.count, value.label));
  }

  /**
   * Determines the ElasticSearchFilterType based on the filter name.
   *
   * @param name The name of the filter, which will be converted to upper case.
   * @returns The corresponding ElasticSearchFilterType for the given filter name.
   */
  private setElasticSearchFilterType(name: string): ElasticSearchFilterTypes {
    return ElasticSearchFilterTypes[name.toUpperCase() as keyof typeof ElasticSearchFilterTypes];
  }
}
