import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { ElasticSearchFilterProvider } from '../Provider/ElasticSearchFilterProvider.service';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { ElasticSearchSearchResultProviderService } from '../Provider/ElasticSearchSearchResultProviderService.service';
import { Inject, Injectable } from '@angular/core';
import { InterfaceListEntry } from 'src/app/shared/models/ListEntries/InterfaceListEntry';
import { InterfaceResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/InterfaceResultList';
import { map, Observable } from 'rxjs';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchService<T extends InterfaceResultList<C>, C extends InterfaceListEntry> {
  constructor(
    private backendService: BackendService,
    private elasticSearchFilterProvider: ElasticSearchFilterProvider,
    private searchResultProviderService: ElasticSearchSearchResultProviderService<T, C>,
    @Inject('ENTRY_MAPPER') private mapToListEntry: (item: any) => T
  ) {}

  /**
   * Starts an ElasticSearch query for the given search term.
   *
   * @param searchTerm The term to search for.
   * @returns An Observable emitting the result list of search terms.
   */
  public startElasticSearch(
    searchTerm: string,
    valueSets: string[] = [],
    criteriaSets: string[] = []
  ): Observable<T> {
    return this.makeElasticSearchRequest(searchTerm, valueSets, criteriaSets).pipe(
      map((response) => this.processElasticSearchResults(response))
    );
  }

  public makeElasticSearchRequest(
    searchTerm: string,
    valueSets: string[] = [],
    criteriaSets: string[] = []
  ): Observable<any> {
    if (valueSets.length > 0) {
      return this.backendService.getElasticSearchResultsForCodeableConcept(searchTerm, valueSets);
    } else if (criteriaSets.length > 0) {
      return this.backendService.getElasticSearchResultsForCriteriaSets(searchTerm, criteriaSets);
    } else {
      return this.sendElasticSearchRequestForCriteria(searchTerm);
    }
  }

  private sendElasticSearchRequestForCriteria(searchTerm: string): Observable<any> {
    const availabilityFilter = this.getAvailabilityFilter();
    const contextFilter = this.getContextFilter();
    const kdsModuleFilter = this.getKdsModuleFilter();
    const terminologyFilters = this.getTerminologyFilter();

    return this.backendService.getElasticSearchResultsForCriteria(
      searchTerm,
      contextFilter,
      terminologyFilters,
      kdsModuleFilter,
      availabilityFilter
    );
  }

  private getTerminologyFilter(): string[] {
    return this.elasticSearchFilterProvider.getSelectedValuesOfType(
      ElasticSearchFilterTypes.TERMINOLOGY
    );
  }

  private getContextFilter(): string[] {
    return this.elasticSearchFilterProvider.getSelectedValuesOfType(
      ElasticSearchFilterTypes.CONTEXT
    );
  }

  private getAvailabilityFilter(): string[] {
    return this.elasticSearchFilterProvider.getSelectedValuesOfType(
      ElasticSearchFilterTypes.AVAILABILITY
    );
  }

  private getKdsModuleFilter(): string[] {
    return this.elasticSearchFilterProvider.getSelectedValuesOfType(
      ElasticSearchFilterTypes.KDSMODULE
    );
  }

  public processElasticSearchResults(response: any): T {
    const searchTermResultList: T = this.mapToListEntry(response);
    this.searchResultProviderService.setSearchtermResultList(searchTermResultList);
    return searchTermResultList;
  }

  public getElasticSearchResultById(id: string): Observable<T> {
    return this.backendService.getElasticSearchResultById(id).pipe(
      map((response) => {
        const listEntry = new SearchTermListEntry(
          response.availability,
          response.selectable,
          response.terminology,
          response.termcode,
          response.kdsModule,
          response.name,
          response.id
        );
        const resultList = new SearchTermResultList(1, [listEntry]) as unknown as T;
        this.searchResultProviderService.setSearchtermResultList(resultList);
        return resultList as unknown as T;
      })
    );
  }
}
