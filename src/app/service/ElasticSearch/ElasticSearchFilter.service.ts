import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { SearchTermFilterValues } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilterValues';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchFilterService {
  private filtersSubject = new BehaviorSubject<Map<ElasticSearchFilterTypes, string[]>>(new Map());

  constructor(private backendService: BackendService) {}

  /**
   * Fetches available filters from the backend and updates the filters subject.
   *
   * @returns An Observable emitting the current list of filters.
   */
  public fetchElasticSearchFilters(): Observable<Array<SearchTermFilter>> {
    return this.backendService.getElasticSearchFilter().pipe(
      map((response) =>
        response
          .filter((filter) => filter.values && filter.values.length > 0)
          .map((filter) => {
            const searchTermValues = filter.values.map(
              (value) => new SearchTermFilterValues(value.count, value.label)
            );
            const filterType =
              ElasticSearchFilterTypes[filter.name as keyof typeof ElasticSearchFilterTypes];
            return new SearchTermFilter(ElasticSearchFilterTypes.TERMINOLOGY, searchTermValues);
          })
      ),
      map((filters) => {
        this.setFilters(filters);
        console.log(filters);
        return filters;
      })
    );
  }

  /**
   * Sets the current list of filters in the BehaviorSubject.
   *
   * @param filters The list of filters to set.
   */
  public setFilters(filters: SearchTermFilter[]): void {
    const filterMap = new Map<ElasticSearchFilterTypes, string[]>();

    filters.forEach((filter) => {
      filterMap.set(filter.getName(), filter.selectedValues);
    });

    this.filtersSubject.next(filterMap);
  }

  /**
   * Gets the current list of filters as an Observable.
   *
   * @returns An Observable emitting the current list of filters.
   */
  public getFilters(): Observable<Map<ElasticSearchFilterTypes, string[]>> {
    return this.filtersSubject.asObservable();
  }

  /**
   * Update selected values for a specific filter.
   *
   * @param name The name of the filter to update.
   * @param selectedValues The new array of selected values.
   */
  public updateSelectedValues(name: ElasticSearchFilterTypes, selectedValues: string[]): void {
    const currentMap = this.filtersSubject.value;
    currentMap.set(name, selectedValues);
    this.filtersSubject.next(currentMap);
  }

  /**
   * Gets selected values for a specific filter name.
   *
   * @param name The name of the filter to retrieve selected values for.
   * @returns An array of selected values for the specified filter name, or an empty array if the filter is not found.
   */
  public getSelectedValuesForName(name: ElasticSearchFilterTypes): string[] {
    const filterMap = this.filtersSubject.value;
    return filterMap.get(name) || [];
  }

  /**
   * Gets the current list of filter names.
   *
   * @returns An array of filter names.
   */
  public getFilterNames(): ElasticSearchFilterTypes[] {
    return Array.from(this.filtersSubject.value.keys());
  }
}
