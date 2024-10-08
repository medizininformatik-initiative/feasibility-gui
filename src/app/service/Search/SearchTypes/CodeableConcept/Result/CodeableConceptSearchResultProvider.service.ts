import { BehaviorSubject, map, Observable } from 'rxjs';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchResultProviderService {
  private searchResultSubject: BehaviorSubject<Map<string, CodeableConceptResultList | null>> =
    new BehaviorSubject<Map<string, CodeableConceptResultList | null>>(new Map());

  /**
   * Sets the search result for a specific key (valueSetUrl).
   * If the key does not exist, it creates a new entry in the map.
   *
   * @param key The key (valueSetUrl) to identify the result set.
   * @param result The search result to be set.
   */
  public setSearchResults(key: string, result: CodeableConceptResultList): void {
    const currentResults = this.searchResultSubject.value;
    currentResults.set(key, result);
    this.searchResultSubject.next(currentResults);
  }

  /**
   * Gets the search results map as an observable.
   *
   * @returns An Observable of the map containing search results.
   */
  public getSearchResults(valueSetUrl: string): Observable<CodeableConceptResultList> {
    console.log(valueSetUrl);
    return this.searchResultSubject
      .asObservable()
      .pipe(map((resultMap) => resultMap.get(valueSetUrl) || null));
  }

  /**
   * Clears the search result for a specific key (valueSetUrl).
   *
   * @param key The key (valueSetUrl) to identify the result set to clear.
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
    const emptyMap = new Map<string, CodeableConceptResultList | null>();
    this.searchResultSubject.next(emptyMap);
  }
}
