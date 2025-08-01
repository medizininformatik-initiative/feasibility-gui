import { BehaviorSubject, map, Observable } from 'rxjs';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { Injectable } from '@angular/core';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';

@Injectable({
  providedIn: 'root',
})
export class FilterProvider {
  private searchTermFiltersSubject = new BehaviorSubject<SearchTermFilter[]>([]);

  /**
   * Gets the current list of SearchTermFilter objects as an Observable.
   *
   * @returns An Observable emitting the current list of SearchTermFilter objects.
   */
  public getSearchTermFilters(): Observable<SearchTermFilter[]> {
    return this.searchTermFiltersSubject.asObservable();
  }

  /**
   * Sets the list of SearchTermFilter objects and updates the BehaviorSubject.
   *
   * @param filters An array of SearchTermFilter objects to set.
   */
  public setSearchTermFilters(filters: SearchTermFilter[]): void {
    this.searchTermFiltersSubject.next(filters);
  }

  /**
   * Gets selected values for a specific filter type.
   *
   * @param type The type of the filter to retrieve selected values for.
   * @returns An array of selected values for the specified filter type, or an empty array if the filter is not found.
   */
  public getSelectedValuesOfType(type: ElasticSearchFilterTypes): string[] {
    const filters = this.searchTermFiltersSubject.getValue();
    const filter = filters.find((f) => f.getName() === type);
    return filter ? filter.getSelectedValues() : [];
  }

  /**
   * Emits `true` if any filters have selected values, otherwise `false`.
   */
  public filtersNotSet(): Observable<boolean> {
    return this.searchTermFiltersSubject
      .asObservable()
      .pipe(map((filters) => filters.every((filter) => filter.getSelectedValues().length === 0)));
  }

  /**
   * Resets all selected values for all filters.
   */
  public resetSelectedValues(): void {
    const updatedFilters = this.searchTermFiltersSubject.getValue().map((filter) => {
      filter.setSelectedValues([]);
      return filter;
    });
    this.searchTermFiltersSubject.next(updatedFilters);
  }

  /**
   * Initializes the filter map with the given array of SearchTermFilter objects.
   *
   * @param filters An array of SearchTermFilter objects to initialize the map with.
   */
  public initializeFilterMap(filters: SearchTermFilter[]): void {
    this.setSearchTermFilters(filters);
  }

  /**
   * Updates an existing SearchTermFilter in the list.
   * If the filter does not exist, it will not be added.
   *
   * @param updatedFilter The updated SearchTermFilter object.
   */
  public updateSearchTermFilter(updatedFilter: SearchTermFilter): void {
    const filters = this.searchTermFiltersSubject.getValue();
    const index = filters.findIndex((filter) => filter.getName() === updatedFilter.getName());

    if (index !== -1) {
      filters[index] = updatedFilter;
      this.searchTermFiltersSubject.next([...filters]);
    }
  }

  /**
   * Updates the selected values of a specific filter.
   *
   * @param filterType The type of the filter to update.
   * @param selectedValues The new selected values to set.
   */
  public updateFilterSelectedValues(
    filterType: ElasticSearchFilterTypes,
    selectedValues: string[]
  ): void {
    const filters = this.searchTermFiltersSubject.getValue();
    const filter = filters.find((f) => f.getName() === filterType);

    if (filter) {
      filter.setSelectedValues(selectedValues);
      this.searchTermFiltersSubject.next([...filters]);
    }
  }
}
