import { map, Observable } from 'rxjs';
import {
  AbstractSearchResultProviderService,
  AbstractKeyedSearchResultProviderService,
} from './AbstractSearchResultProvider.servcie';
import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchEngine } from './AbstractSearchEngine.service';

/**
 * Abstract mediator for simple search result providers (single result set)
 */
export abstract class AbstractSearchMediatorService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  constructor(
    protected resultProvider: AbstractSearchResultProviderService<C, T>,
    protected searchEngine: AbstractSearchEngine<C, T>
  ) {}

  public searchAndSetProvider(searchText: string, page: number = 0): Observable<T> {
    return this.searchEngine.search(searchText, page).pipe(
      map((result) => {
        this.resultProvider.setSearchResults(result);
        return result;
      })
    );
  }

  public searchAndUpdateProvider(
    searchText: string,
    page: number,
    params: any[] = []
  ): Observable<T> {
    return this.searchEngine.search(searchText, page, ...params).pipe(
      map((result) => {
        this.resultProvider.updateSearchResults(result);
        return result;
      })
    );
  }
}

/**
 * Abstract mediator for keyed search result providers (multiple result sets by key)
 */
export abstract class AbstractKeyedSearchMediatorService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  constructor(
    protected resultProvider: AbstractKeyedSearchResultProviderService<C, T>,
    protected searchEngine: AbstractSearchEngine<C, T>
  ) {}

  /**
   * Performs a search and sets the results for the given key, clearing any previous results for that key
   */
  public searchAndSetProvider(
    searchText: string,
    key: string,
    page: number = 0,
    ...additionalParams: any[]
  ): Observable<T> {
    return this.searchEngine.search(searchText, page, ...additionalParams).pipe(
      map((result) => {
        this.resultProvider.setSearchResults(key, result);
        return result;
      })
    );
  }

  /**
   * Performs a search and updates/appends the results for the given key (for pagination)
   */
  public searchAndUpdateProvider(
    searchText: string,
    key: string,
    page: number,
    ...additionalParams: any[]
  ): Observable<T> {
    return this.searchEngine.search(searchText, page, ...additionalParams).pipe(
      map((result) => {
        this.resultProvider.updateSearchResults(key, result);
        return result;
      })
    );
  }

  /**
   * Clears results for a specific key
   */
  public clearResults(key: string): void {
    this.resultProvider.clearResults(key);
  }

  /**
   * Clears all results
   */
  public clearAllResults(): void {
    this.resultProvider.clearAllResults();
  }
}
