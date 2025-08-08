import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchMediatorService } from './AbstractSearchMediator';
import { AbstractSimpleSearchEngine } from '../Engine/AbstractSimpleSearchEngine.service';
import { AbstractSimpleSearchResultProvider } from '../Result/AbstractSimpleSearchResultProvider.service';
import { map, Observable } from 'rxjs';

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                   LAYER 2: SIMPLE MEDIATOR IMPLEMENTATION                   │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * Implementation for mediators that work with single result sets.
 * Provides concrete implementations for simple search scenarios.
 */
export abstract class AbstractSimpleSearchMediator<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> extends AbstractSearchMediatorService<C, T> {
  constructor(
    protected resultProvider: AbstractSimpleSearchResultProvider<C, T>,
    protected searchEngine: AbstractSimpleSearchEngine<C, T>
  ) {
    super(resultProvider, searchEngine);
  }

  /**
   * Performs search and sets results in the simple provider.
   * Replaces any existing results with new search results.
   * @param searchText The search term to search for.
   * @param page The page number for pagination.
   */
  public searchAndSetProvider(searchText: string, page: number = 0): Observable<T> {
    return this.searchEngine.search(searchText, page).pipe(
      map((result) => {
        this.resultProvider.setSearchResults(result);
        return result;
      })
    );
  }

  /**
   * Performs search and updates results in the simple provider.
   * Typically used for pagination - appends results to existing data.
   */
  public searchAndUpdateProvider(searchText: string, page: number): Observable<T> {
    return this.searchEngine.search(searchText, page).pipe(
      map((result) => {
        this.resultProvider.updateSearchResults(result);
        return result;
      })
    );
  }
}
