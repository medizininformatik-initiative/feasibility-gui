import { AbstractKeyedSearchResultProvider } from '../../../Abstract/Result/AbstractKeyedSearchResultProvider.service';
import { CodeableConceptResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * Search result provider for CodeableConcept searches.
 * Uses keyed storage to manage separate result sets for different concept filters.
 * Each concept filter ID acts as a key for its own result set.
 */
@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchResultProviderService extends AbstractKeyedSearchResultProvider<
  CodeableConceptResultListEntry,
  CodeableConceptResultList
> {
  constructor() {
    super();
  }

  /**
   * Sets the search results for a specific concept filter.
   * @param valueSetUrls The value set URLs to identify the result set.
   * @param result The search result to be set.
   */
  public setConceptFilterResults(valueSetUrls: string[], result: CodeableConceptResultList): void {
    this.setSearchResults(valueSetUrls, result);
  }

  /**
   * Gets the search results for a specific concept filter as an observable.
   * @param valueSetUrls The value set URLs to identify the result set.
   * @returns An Observable of the search results for the given concept filter.
   */
  public getConceptFilterResults(
    valueSetUrls: string[]
  ): Observable<CodeableConceptResultList | null> {
    return this.getSearchResults(valueSetUrls);
  }

  /**
   * Updates the search results for a specific concept filter by appending new results.
   *
   * @param valueSetUrls The value set URLs to identify the result set.
   * @param result The new search results to be appended.
   */
  public updateConceptFilterResults(
    valueSetUrls: string[],
    result: CodeableConceptResultList
  ): void {
    this.updateSearchResults(valueSetUrls, result);
  }

  /**
   * Clears the search results for a specific concept filter.
   * @param valueSetUrls The value set URLs to identify the result set.
   */
  public clearConceptFilterResults(valueSetUrls: string[]): void {
    this.clearResults(valueSetUrls);
  }

  /**
   * Clears all concept filter results.
   */
  public clearAllConceptResults(): void {
    this.clearAllResults();
  }
}
