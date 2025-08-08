import { AbstractKeyedSearchResultProvider } from '../../../Abstract/Result/AbstractKeyedSearchResultProvider.service';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
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
   *
   * @param conceptFilterId The concept filter ID to identify the result set.
   * @param result The search result to be set.
   */
  public setConceptFilterResults(conceptFilterId: string, result: CodeableConceptResultList): void {
    this.setSearchResults(conceptFilterId, result);
  }

  /**
   * Gets the search results for a specific concept filter as an observable.
   *
   * @param conceptFilterId The concept filter ID to get results for.
   * @returns An Observable of the search results for the given concept filter.
   */
  public getConceptFilterResults(
    conceptFilterId: string[]
  ): Observable<CodeableConceptResultList | null> {
    return this.getSearchResults(conceptFilterId);
  }

  /**
   * Updates the search results for a specific concept filter by appending new results.
   *
   * @param conceptFilterId The concept filter ID to identify the result set.
   * @param result The new search results to be appended.
   */
  public updateConceptFilterResults(
    conceptFilterId: string,
    result: CodeableConceptResultList
  ): void {
    this.updateSearchResults(conceptFilterId, result);
  }

  /**
   * Clears the search results for a specific concept filter.
   *
   * @param conceptFilterId The concept filter ID to clear results for.
   */
  public clearConceptFilterResults(conceptFilterId: string): void {
    this.clearResults(conceptFilterId);
  }

  /**
   * Clears all concept filter results.
   */
  public clearAllConceptResults(): void {
    this.clearAllResults();
  }

  /**
   * Gets all concept filter IDs that have stored results.
   *
   * @returns An array of all concept filter IDs.
   */
  public getAllConceptFilterIds(): string[] {
    return this.getAllKeys();
  }

  /**
   * Checks if a specific concept filter has stored results.
   *
   * @param conceptFilterId The concept filter ID to check.
   * @returns True if the concept filter has stored results, false otherwise.
   */
  public hasConceptFilterResults(conceptFilterId: string): boolean {
    return this.hasKey(conceptFilterId);
  }
}
