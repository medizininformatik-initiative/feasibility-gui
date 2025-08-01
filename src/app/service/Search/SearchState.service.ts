import { ActiveSearchTermService } from './ActiveSearchTerm.service';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, map, pairwise, skip } from 'rxjs/operators';
import { FilterProvider } from './Filter/SearchFilterProvider.service';
import { Injectable } from '@angular/core';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { AbstractSearchResultProviderService } from './Abstract/AbstractSearchResultProvider.servcie';

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {
  constructor(
    private activeSearchTermService: ActiveSearchTermService,
    private filterProvider: FilterProvider
  ) {}

  public searchChanges(): Observable<boolean> {
    const termChanges$ = this.termChanges();
    const filterChanges$ = this.filterChanges();

    return combineLatest([termChanges$, filterChanges$]).pipe(
      map(([termChanged, filterChanged]) => termChanged || filterChanged)
    );
  }

  /**
   * Emits true when the active search term changes.
   */
  private termChanges(): Observable<boolean> {
    return this.activeSearchTermService.getActiveSearchTerm().pipe(
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
