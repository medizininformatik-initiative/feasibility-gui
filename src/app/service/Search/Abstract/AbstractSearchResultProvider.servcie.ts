import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { BehaviorSubject, filter, Observable, pairwise, map, switchMap, skip, tap } from 'rxjs';
import { Injectable, SkipSelf } from '@angular/core';
import { SearchStateService } from '../SearchState.service';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractSearchResultProviderService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  private searchResultSubject = new BehaviorSubject<T>(null);

  private searchTextChangeSubject = new BehaviorSubject<boolean>(false);

  constructor(private searchStateService: SearchStateService) {
    this.initializeSearchChangeSubscription();
  }

  /**
   * Sets the current search result.
   *
   * @param result The search result to be set.
   */
  public setSearchResults(result: T): void {
    const currentResults = this.searchResultSubject.value?.getResults() ?? [];
    const newResult = [...currentResults, ...result.getResults()];
    result.setResults(newResult);
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

  private initializeSearchChangeSubscription(): void {
    this.searchStateService
      .searchChanges()
      .pipe(
        tap((hasChanged) => console.log('Search state changed, clearing results...', hasChanged)),
        skip(1), // Skip the initial emission
        filter((hasChanged) => hasChanged)
      )
      .subscribe(() => {
        console.log('Search state changed, clearing results...');
        this.clearResults();
      });
  }
}
/**
 * 1. Bie init darf nicht gelöscht werden --> Skip(1)
 * 2. Wenn seite wechseln muss beides gelöscht werden filetr undtext aber skip geht nicht, zweite emission
 */
