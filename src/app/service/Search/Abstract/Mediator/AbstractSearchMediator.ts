import { AbstractListEntry } from 'src/app/model/Search/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/Search/ResultList/AbstractResultList';
import { AbstractSearchEngine } from '../Engine/AbstractSearchEngine';
import { AbstractSearchResultProviderService } from '../Result/AbstractSearchResultProvider.servcie';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * @abstract
 * Pure abstract contract that defines the fundamental mediator interface.
 *
 * @template C - Type extending AbstractListEntry representing individual search result entries
 * @template T - Type extending AbstractResultList representing the complete search result list
 */
@Injectable({
  providedIn: 'root',
})
export abstract class AbstractSearchMediatorService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  /**
   * Creates an instance of AbstractSearchMediatorService.
   *
   * @param resultProvider - The result provider service for managing search results
   * @param searchEngine - The search engine for executing search operations
   * @protected
   */
  constructor(
    protected resultProvider: AbstractSearchResultProviderService<C, T>,
    protected searchEngine: AbstractSearchEngine<C, T>
  ) {}

  /**
   * @abstract
   * @protected
   * Core search method that coordinates search execution and result storage.
   * Executes a search operation and sets the results in the provider.
   *
   * @param searchText - The text to search for
   * @param page - The page number for pagination (0-based)
   * @param dataSetUrl - Array of dataset URLs to filter the search
   * @returns An Observable that emits the search results
   */
  protected abstract searchAndSetProvider(
    searchText: string,
    page: number,
    dataSetUrl: string[]
  ): Observable<T>;

  /**
   * @abstract
   * @protected
   * Core update method for pagination and result appending.
   * Executes a search operation and updates/appends results in the provider.
   *
   * @param searchText - The text to search for
   * @param page - The page number for pagination (0-based)
   * @param dataSetUrl - Array of dataset URLs to filter the search
   * @returns An Observable that emits the updated search results
   */
  protected abstract searchAndUpdateProvider(
    searchText: string,
    page: number,
    dataSetUrl: string[]
  ): Observable<T>;
}
