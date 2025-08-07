import { BehaviorSubject, Observable } from 'rxjs';

import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractSearchResultProviderService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  private searchResultSubject = new BehaviorSubject<T>(null);

  constructor() {}

  /**
   * Sets the current search result.
   *
   * @param result The search result to be set.
   */
  public setSearchResults(result: T, ...params: any[]): void {
    this.searchResultSubject.next(result);
  }

  /**
   * Updates the current search results by appending new results.
   *
   * @param result The new search results to be appended.
   */
  public updateSearchResults(result: T): void {
    const currentResults = this.searchResultSubject.value?.getResults() ?? [];
    const updatedResults = [...currentResults, ...result.getResults()];
    result.setResults(updatedResults);
    this.searchResultSubject.next(result);
  }

  /**
   * Gets the current search result as an observable.
   *
   * @returns An Observable of the current search result.
   */
  public getSearchResults(): Observable<T | null> {
    return this.searchResultSubject.asObservable();
  }

  /**
   * Clears the list of all search results.
   */
  public clearResults(): void {
    this.searchResultSubject.next(null);
  }
}

/**
 * Abstract base class for search result providers that manage multiple result sets
 * identified by keys (e.g., concept filters, value sets).
 */
@Injectable({
  providedIn: 'root',
})
export abstract class AbstractKeyedSearchResultProviderService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  protected searchResultSubject = new BehaviorSubject<Map<string, T | null>>(new Map());

  constructor() {}

  /**
   * Sets the search result for a specific key.
   * If the key does not exist, it creates a new entry in the map.
   *
   * @param key The key to identify the result set.
   * @param result The search result to be set.
   */
  public setSearchResults(key: string, result: T): void {
    const currentResults = this.searchResultSubject.value;
    currentResults.set(key, result);
    this.searchResultSubject.next(currentResults);
  }

  /**
   * Updates the search results for a specific key by appending new results.
   *
   * @param key The key to identify the result set.
   * @param result The new search results to be appended.
   */
  public updateSearchResults(key: string, result: T): void {
    const currentResults = this.searchResultSubject.value;
    const existingResult = currentResults.get(key);

    if (existingResult) {
      const currentEntries = existingResult.getResults() ?? [];
      const updatedEntries = [...currentEntries, ...result.getResults()];
      result.setResults(updatedEntries);
    }

    currentResults.set(key, result);
    this.searchResultSubject.next(currentResults);
  }

  /**
   * Gets the search results for a specific key as an observable.
   *
   * @param key The key to identify the result set.
   * @returns An Observable of the search result for the given key.
   */
  public abstract getSearchResults(key: string): Observable<T | null>;

  /**
   * Clears the search result for a specific key.
   *
   * @param key The key to identify the result set to clear.
   */
  public clearResults(key: string): void {
    const currentResults = this.searchResultSubject.value;

    if (currentResults.has(key)) {
      currentResults.set(key, null);
      this.searchResultSubject.next(currentResults);
    }
  }

  /**
   * Clears all stored search results in the map.
   */
  public clearAllResults(): void {
    const emptyMap = new Map<string, T | null>();
    this.searchResultSubject.next(emptyMap);
  }

  /**
   * Gets the entire results map as an observable.
   * Useful for debugging or advanced use cases.
   */
  protected getResultsMap(): Observable<Map<string, T | null>> {
    return this.searchResultSubject.asObservable();
  }
}

/**
 * 1. Bie init darf nicht gelöscht werden --> Skip(1)
 * 2. Wenn seite wechseln muss beides gelöscht werden filetr undtext aber skip geht nicht, zweite emission
 */
