import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchResultProviderService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  private searchResultSubject = new BehaviorSubject<T>(null);

  /**
   * Sets the current search result.
   *
   * @param result The search result to be set.
   */
  public setSearchResults(result: T): void {
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
