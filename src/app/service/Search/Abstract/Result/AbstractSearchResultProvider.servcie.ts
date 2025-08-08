import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Abstract base class defining the interface for all search result providers.
 * This serves as the contract that all result providers must implement.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class AbstractSearchResultProviderService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  constructor() {}

  /**
   * Sets search results.
   * Implementation varies based on storage strategy (simple vs keyed).
   */
  public abstract setSearchResults(...args: any[]): void;

  /**
   * Updates existing search results by appending new results.
   * Implementation varies based on storage strategy (simple vs keyed).
   */
  public abstract updateSearchResults(...args: any[]): void;

  /**
   * Gets search results as an observable.
   * Implementation varies based on storage strategy (simple vs keyed).
   */
  public abstract getSearchResults(...args: any[]): Observable<T | null>;

  /**
   * Clears search results.
   * Implementation varies based on storage strategy (simple vs keyed).
   */
  public abstract clearResults(...args: any[]): void;

  /**
   * Clears all search results.
   */
  public abstract clearAllResults(): void;
}
