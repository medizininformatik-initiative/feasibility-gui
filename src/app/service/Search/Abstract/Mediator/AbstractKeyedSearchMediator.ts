import { AbstractKeyedSearchEngineService } from '../Engine/AbstractKeyedSearchEngine.service';
import { AbstractKeyedSearchResultProvider } from '../Result/AbstractKeyedSearchResultProvider.service';
import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchMediatorService } from './AbstractSearchMediator';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                    LAYER 3: KEYED MEDIATOR IMPLEMENTATION                   │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * Implementation for mediators that work with keyed result sets.
 * Supports multiple concurrent searches identified by keys (e.g., concept filter IDs).
 */
@Injectable({
  providedIn: 'root',
})
export abstract class AbstractKeyedSearchMediator<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> extends AbstractSearchMediatorService<C, T> {
  constructor(
    protected resultProvider: AbstractKeyedSearchResultProvider<C, T>,
    protected searchEngine: AbstractKeyedSearchEngineService<C, T>
  ) {
    super(resultProvider, searchEngine);
  }

  /**
   * Performs search and sets results for a specific key.
   * The first parameter after page should be the key identifier.
   * @param searchText The text to search for
   * @param page The page number for pagination
   * @param dataSetUrl Array of data set URLs to search within
   * @returns Observable containing the search results
   */
  public searchAndSetProvider(
    searchText: string,
    page: number = 0,
    dataSetUrl: string[]
  ): Observable<T> {
    console.log('search', searchText, page, dataSetUrl);
    if (dataSetUrl.length === 0) {
      throw new Error('KeyedSearchMediatorService requires a key parameter for search operations');
    }
    return this.searchEngine.search(searchText, page, dataSetUrl).pipe(
      map((result) => {
        this.resultProvider.setSearchResults(JSON.stringify(dataSetUrl), result);
        return result;
      })
    );
  }

  /**
   * Performs search and updates results for a specific key.
   * Used for pagination - appends results to existing data for the given key.
   * @param searchText The text to search for
   * @param page The page number for pagination
   * @param dataSetUrl Array of data set URLs to search within
   * @returns Observable containing the search results
   */
  public searchAndUpdateProvider(
    searchText: string,
    page: number,
    dataSetUrl: string[]
  ): Observable<T> {
    if (dataSetUrl.length === 0) {
      throw new Error('KeyedSearchMediatorService requires a key parameter for update operations');
    }
    return this.searchEngine.search(searchText, page, dataSetUrl).pipe(
      map((result) => {
        this.resultProvider.updateSearchResults(JSON.stringify(dataSetUrl), result);
        return result;
      })
    );
  }
}
