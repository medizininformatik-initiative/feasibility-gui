import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermTranslation } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermTranslation';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { TerminologyApiService } from 'src/app/service/Backend/Api/TerminologyApi.service';

@Injectable({
  providedIn: 'root',
})
export class TableRowDetailsService {
  constructor(private terminologyApiService: TerminologyApiService) {}

  /**
   * Retrieves details for a specific list item.
   *
   * @param id The ID of the list item.
   * @returns An Observable emitting the details of the list item.
   */
  public getDetailsForListItem(id: string): Observable<SearchTermDetails> {
    return this.terminologyApiService.getSearchTermEntryRelations(id).pipe(
      map((response: any) => {
        const translations = this.mapToSearchTermTranslations(response.translations);
        const parents = this.mapToSearchTermRelatives(response.parents);
        const children = this.mapToSearchTermRelatives(response.children);
        const relatedTerms = this.mapToSearchTermRelatives(response.relatedTerms);

        return new SearchTermDetails(children, parents, relatedTerms, translations);
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
}
