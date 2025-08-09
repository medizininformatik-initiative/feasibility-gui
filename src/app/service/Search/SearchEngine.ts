import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractResultMapper } from './Abstract/Mapping/AbstractResultMapper';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { FilterProvider } from './Filter/SearchFilterProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TerminologyApiService } from '../Backend/Api/TerminologyApi.service';

/**
 * Core search engine service for executing search operations and managing filters.
 * Provides the fundamental functionality for fetching search results from the API
 * and applying various filters to search operations.
 *
 * @template C - Type extending AbstractListEntry representing individual search result entries
 * @template T - Type extending AbstractResultList representing the complete search result list
 */
@Injectable({
  providedIn: 'root',
})
export class SearchEngine<C extends AbstractListEntry, T extends AbstractResultList<C>> {
  /**
   * Creates an instance of SearchEngine.
   *
   * @param terminologyApiService - Service for making API calls to the terminology service
   * @param filterProvider - Provider for managing search filters
   */
  constructor(
    private terminologyApiService: TerminologyApiService,
    private filterProvider: FilterProvider
  ) {}

  /**
   * Fetches search results from the API and maps them using the provided mapper.
   *
   * @param url - The search URL to fetch results from
   * @param mapper - The result mapper for transforming API response to typed objects
   * @returns An Observable that emits the mapped search results
   */
  public fetchAndMapSearchResults(url: string, mapper: AbstractResultMapper<C, T>): Observable<T> {
    return this.terminologyApiService
      .getElasticSearchResults(url)
      .pipe(map((response) => mapper.mapResponseToResultList(response)));
  }

  /**
   * Gets the current terminology filter values as a comma-separated string.
   *
   * @returns Comma-separated string of selected terminology filter values
   */
  public getTerminologyFilter(): string {
    return this.filterProvider
      .getSelectedValuesOfType(ElasticSearchFilterTypes.TERMINOLOGY)
      .join(',');
  }

  /**
   * Gets the current context filter values as a comma-separated string.
   *
   * @returns Comma-separated string of selected context filter values
   */
  public getContextFilter(): string {
    return this.filterProvider.getSelectedValuesOfType(ElasticSearchFilterTypes.CONTEXT).join(',');
  }

  /**
   * Gets the current availability filter values as a comma-separated string.
   *
   * @returns Comma-separated string of selected availability filter values
   */
  public getAvailabilityFilter(): string {
    return this.filterProvider
      .getSelectedValuesOfType(ElasticSearchFilterTypes.AVAILABILITY)
      .join(',');
  }

  /**
   * Gets the current KDS module filter values as a comma-separated string.
   *
   * @returns Comma-separated string of selected KDS module filter values
   */
  public getKdsModuleFilter(): string {
    return this.filterProvider
      .getSelectedValuesOfType(ElasticSearchFilterTypes.KDS_MODULE)
      .join(',');
  }
}
