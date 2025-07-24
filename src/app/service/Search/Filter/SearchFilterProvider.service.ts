import { BehaviorSubject, map, Observable } from 'rxjs';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { Injectable } from '@angular/core';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';

@Injectable({
  providedIn: 'root',
})
export class FilterProvider {
  private filtersSubject = new BehaviorSubject<Map<ElasticSearchFilterTypes, string[]>>(new Map());
  private filterMap: Map<ElasticSearchFilterTypes, string[]> = new Map();

  /**
   * Sets the current list of filters in the BehaviorSubject.
   *
   * @param filter The filter to set.
   */
  public setFilter(filter: SearchTermFilter): void {
    this.filterMap.set(filter.getName(), filter.getSelectedValues());
    this.filtersSubject.next(new Map(this.filterMap));
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
   * Gets selected values for a specific filter type.
   *
   * @param type The type of the filter to retrieve selected values for.
   * @returns An array of selected values for the specified filter type, or an empty array if the filter is not found.
   */
  public getSelectedValuesOfType(name: ElasticSearchFilterTypes): string[] {
    const filterMap = this.filtersSubject.value;
    return filterMap.get(name) || [];
  }

  /**
   * Emits `true` if any filters have selected values, otherwise `false`.
   */
  public filtersNotSet(): Observable<boolean> {
    return this.filtersSubject
      .asObservable()
      .pipe(
        map((filterMap) => Array.from(filterMap.values()).every((values) => values.length === 0))
      );
  }

  public resetSelectedValuesOfType(): void {
    this.filterMap.forEach((value, key) => {
      this.filterMap.set(key, []);
    });
    this.filtersSubject.next(this.filterMap);
  }
}
