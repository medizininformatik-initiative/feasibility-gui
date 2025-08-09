import { AbstractKeyedSearchResultProvider } from '../../../Abstract/Result/AbstractKeyedSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';

/**
 * Result provider service for criteria set searches with keyed result management.
 * Extends AbstractKeyedSearchResultProvider to provide storage and retrieval of
 * criteria set search results organized by dataset URLs.
 */
@Injectable({
  providedIn: 'root',
})
export class CriteriaSetSearchResultProviderService extends AbstractKeyedSearchResultProvider<
  ReferenceCriteriaListEntry,
  ReferenceCriteriaResultList
> {}
