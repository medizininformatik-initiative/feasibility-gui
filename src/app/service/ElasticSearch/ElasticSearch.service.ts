import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { InterfaceListEntry } from 'src/app/shared/models/ListEntries/InterfaceListEntry';
import { InterfaceResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/InterfaceResultList';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { SearchTermTranslation } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermTranslation';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchService<T extends InterfaceResultList<C>, C extends InterfaceListEntry> {
  private searchTermResultList = new BehaviorSubject<T>({
    totalHits: 0,
    results: [] as C[],
  } as T);
  constructor(
    private backendService: BackendService,
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
      return this.backendService.getElasticSearchResultsForCriteria(searchTerm);
    }
  }

  public processElasticSearchResults(response: any): T {
    const searchTermResultList: T = this.mapToListEntry(response);
    this.setSearchtermResultList(searchTermResultList);
    return searchTermResultList;
  }

  /**
   * Holds the current List of results found for a search term
   *
   * @param resultList
   */
  public setSearchtermResultList(resultList: T) {
    this.searchTermResultList.next(resultList);
  }

  public getSearchTermResultList(): Observable<T | null> {
    return this.searchTermResultList.asObservable();
  }

  /**
   * Retrieves details for a specific list item.
   *
   * @param id The ID of the list item.
   * @returns An Observable emitting the details of the list item.
   */
  public getDetailsForListItem(id: string): Observable<SearchTermDetails> {
    return this.backendService.getSearchTermEntryRelations(id).pipe(
      map((response: any) => {
        const translations = this.mapToSearchTermTranslations(response.translations);
        const parents = this.mapToSearchTermRelatives(response.parents);
        const children = this.mapToSearchTermRelatives(response.children);
        const relatedTerms = this.mapToSearchTermRelatives(response.relatedTerms);

        return new SearchTermDetails(
          children,
          parents,
          relatedTerms,
          translations,
          response.name,
          response.id
        );
      })
    );
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
        this.setSearchtermResultList(resultList);
        return resultList as unknown as T;
      })
    );
  }

  /**
   * Maps raw translation response to SearchTermTranslation objects.
   *
   * @param translations Raw translation response.
   * @returns An array of SearchTermTranslation objects.
   */
  private mapToSearchTermTranslations(translations: any[]): SearchTermTranslation[] {
    return translations.map((t: any) => new SearchTermTranslation(t.lang, t.value));
  }

  /**
   * Maps raw relative response to SearchTermRelatives objects.
   *
   * @param relatives Raw relative response.
   * @returns An array of SearchTermRelatives objects.
   */
  private mapToSearchTermRelatives(relatives: any[]): SearchTermRelatives[] {
    return relatives.map((r: any) => new SearchTermRelatives(r.name, r.contextualizedTermcodeHash));
  }

  public getElasticSearchFilter(): Observable<Array<SearchTermFilter>> {
    return this.backendService
      .getElasticSearchFilter()
      .pipe(
        map((response) =>
          response
            .filter((filter) => filter.values && filter.values.length > 0)
            .map((filter) => new SearchTermFilter(filter.name, filter.values))
        )
      );
  }
}
