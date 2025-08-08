import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptSearchMediatorService } from '../Mediator/CodeableConceptSearchMediator.service';
import { Injectable } from '@angular/core';
import { KeyedSearchPagination } from '../../../Abstract/Pagination/AbstractKeyedSearchPagination';

/**
 * Pagination service for CodeableConcept searches with support for multiple concept filters.
 * Handles pagination state management for keyed search results (concept filter IDs).
 *
 * This service extends KeyedSearchPagination to support multiple concurrent paginations
 * for different concept filters.
 */
@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchPaginationService extends KeyedSearchPagination<
  CodeableConceptResultListEntry,
  CodeableConceptResultList
> {
  constructor(mediatorService: CodeableConceptSearchMediatorService) {
    super(mediatorService);
  }

  /**
   * Resets pagination state for a specific concept filter.
   * @param conceptFilterId The concept filter ID to reset
   */
  public resetPaginationForConceptFilter(dataSetUrl: string[]): void {
    this.resetPaginationForKey(dataSetUrl);
  }
}
