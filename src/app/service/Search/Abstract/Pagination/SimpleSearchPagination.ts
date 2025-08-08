import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchPagination } from './AbstractSearchPagination';
import { Observable } from 'rxjs';
import { AbstractSimpleSearchMediator } from '../Mediator/AbstractSimpleSearchMediator';

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                   LAYER 2: SIMPLE PAGINATION IMPLEMENTATION                 │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * Implementation for pagination that works with single result sets.
 * Provides concrete implementations for simple pagination scenarios.
 */
export abstract class SimpleSearchPagination<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> extends AbstractSearchPagination<C, T> {
  protected totalResults: number | null = null;
  protected pageSize = 20;

  constructor(protected mediatorService: AbstractSimpleSearchMediator<C, T>) {
    super(mediatorService);
  }

  /**
   * Loads the next page of results and appends to existing results.
   */
  public loadNextPage(searchTerm: string): Observable<T> {
    this.currentPage++;
    return this.mediatorService.searchAndUpdateProvider(searchTerm, this.currentPage);
  }
}
