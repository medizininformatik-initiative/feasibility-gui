import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchEngine } from '../Engine/AbstractSearchEngine';
import { AbstractSearchResultProviderService } from '../Result/AbstractSearchResultProvider.servcie';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                    LAYER 1: ABSTRACT MEDIATOR CONTRACT                      │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * Pure abstract contract that defines the fundamental mediator interface.
 * This serves as the foundation for all mediator implementations.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class AbstractSearchMediatorService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  constructor(
    protected resultProvider: AbstractSearchResultProviderService<C, T>,
    protected searchEngine: AbstractSearchEngine<C, T>
  ) {}

  /**
   * Core search method that all mediators must implement.
   * Coordinates between search engine and result provider.
   */
  protected abstract searchAndSetProvider(
    searchText: string,
    page: number,
    ...params: any[]
  ): Observable<T>;

  /**
   * Core update method for pagination and result appending.
   * Handles result updates in the provider.
   */
  protected abstract searchAndUpdateProvider(
    searchText: string,
    page: number,
    ...params: any[]
  ): Observable<T>;
}
