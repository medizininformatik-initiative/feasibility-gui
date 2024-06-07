import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { Entries } from 'src/app/model/ElasticSearch/Entrie';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListEntry';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermResultList';
import { SearchTermTranslation } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermTranslation';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchService {
  constructor(private backendService: BackendService) {}

  /**
   * Starts an ElasticSearch query for the given search term.
   *
   * @param searchTerm The term to search for.
   * @returns An Observable emitting the result list of search terms.
   */
  public startElasticSearch(searchTerm: string): Observable<SearchTermResultList> {
    return this.backendService.getElasticSearchResults(searchTerm).pipe(
      map((response) => {
        const totalHits = response.totalHits;
        const searchTermListItems = response.results.map(
          (item) =>
            new SearchTermListEntry(
              item.availability,
              item.selectable,
              item.terminology,
              item.termcode,
              item.kdsModule,
              item.name,
              item.id
            )
        );
        return new SearchTermResultList(totalHits, searchTermListItems);
      })
    );
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
    return this.backendService.getElasticSearchFilter().pipe(
      map((response) => response.map((filter) => new SearchTermFilter(filter.name, filter.values)))
    );
  }
}
