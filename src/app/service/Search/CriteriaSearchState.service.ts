import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { FilterProvider } from './Filter/SearchFilterProvider.service';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchStateService {
  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private searchFilterSubject: Subject<SearchTermFilter> = new Subject<SearchTermFilter>();
  constructor(private filterProvider: FilterProvider) {}

  public getActiveSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  public setActiveSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  public getActiveSearchFilter(): Observable<SearchTermFilter> {
    return this.searchFilterSubject.asObservable();
  }

  public setActiveSearchFilter(searchFilter: SearchTermFilter): void {
    this.searchFilterSubject.next(searchFilter);
  }

  /**
   * If the the current search term or the search filters change, this method will reset the pagination and clear the results.
   * It listens to changes in the search term and search filters, and emits true when either changes.
   */
  public searchChanged(): Observable<boolean> {
    const termChanges$ = this.searchTermChanges();
    const filterChanges$ = this.filterChanges();
    return combineLatest([termChanges$, filterChanges$]).pipe(
      map(([termChanged, filterChanged]) => termChanged || filterChanged)
    );
  }

  /**
   * Emits true when the active search term changes.
   */
  private searchTermChanges(): Observable<boolean> {
    return this.getActiveSearchTerm().pipe(
      distinctUntilChanged((prev, curr) => prev === curr),
      map(() => true)
    );
  }

  /**
   * Emits true when the search filters change.
   */
  private filterChanges(): Observable<boolean> {
    return this.filterProvider.getSearchTermFilters().pipe(
      filter((filters: SearchTermFilter[]) => filters.length > 0),
      map((filters) =>
        JSON.stringify(
          filters.map((f) => ({
            name: f.name,
            selected: [...f.selectedValues],
          }))
        )
      ),
      distinctUntilChanged((prev, curr) => prev === curr),
      map(() => true)
    );
  }
}
