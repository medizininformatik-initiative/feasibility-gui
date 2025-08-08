import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractSearchPagination } from './AbstractSearchPagination';
import { Observable } from 'rxjs';
import { AbstractKeyedSearchMediator } from '../Mediator/AbstractKeyedSearchMediator';
import { Injectable } from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                    LAYER 3: KEYED PAGINATION IMPLEMENTATION                 │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * Implementation for pagination that works with keyed result sets.
 * Supports multiple concurrent paginations identified by keys (e.g., concept filter IDs).
 */
@Injectable({
  providedIn: 'root',
})
export abstract class KeyedSearchPagination<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> extends AbstractSearchPagination<C, T> {
  /**
   * Map to track current pages for each key.
   * Key is a stringified array of data set URLs.
   */
  protected keyedPages: Map<string, number> = new Map();

  /**
   * Map to track total results for each key.
   * Key is a stringified array of data set URLs.
   */
  protected keyedTotalResults: Map<string, number> = new Map();
  protected pageSize = 20;

  constructor(protected mediatorService: AbstractKeyedSearchMediator<C, T>) {
    super(mediatorService);
  }

  /**
   * Loads the next page for a specific key.
   * The first parameter after searchTerm should be the key identifier.
   * @param searchTerm The text to search for
   * @param dataSetUrl Array of data set URLs to search within
   * @returns Observable containing the search results
   */
  public loadNextPage(searchTerm: string, dataSetUrl: string[]): Observable<T> {
    if (dataSetUrl.length === 0) {
      throw new Error('KeyedSearchPagination requires a key parameter');
    }
    const key = this.generateKeyFromDataSetUrls(dataSetUrl);
    const currentPage = this.keyedPages.get(key) || 0;
    const nextPage = currentPage + 1;
    this.keyedPages.set(key, nextPage);
    return this.mediatorService.searchAndUpdateProvider(searchTerm, nextPage, dataSetUrl);
  }

  private generateKeyFromDataSetUrls(dataSetUrls: string[]): string {
    return JSON.stringify(dataSetUrls);
  }

  /**
   * Resets pagination state for all keys.
   */
  public resetPagination(): void {
    super.resetPagination();
    this.keyedPages.clear();
    this.keyedTotalResults.clear();
  }

  /**
   * Resets pagination state for a specific key.
   */
  public resetPaginationForKey(dataSetUrls: string[]): void {
    const key = this.generateKeyFromDataSetUrls(dataSetUrls);
    this.keyedPages.set(key, 0);
    this.keyedTotalResults.delete(key);
  }
}
