import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchEngine } from '../../../SearchEngine';
import { SearchUrlBuilder } from '../../../UrlBuilder/SearchUrlBuilder';
import { CriteriaResultMapperStrategy } from '../Mapping/CriteriaResultMapperStrategy';
import { CriteriaSearchUrlStrategy } from '../Url/CriteriaSearchUrlStrategy';
import { AbstractSearchEngine } from '../../../Abstract/AbstractSearchEngine.service';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchEngineService extends AbstractSearchEngine<
  SearchTermListEntry,
  SearchTermResultList
> {
  constructor(protected searchEngine: SearchEngine<SearchTermListEntry, SearchTermResultList>) {
    super(searchEngine);
  }

  /**
   * Creates the search URL for the given search text.
   * @param searchText The text to search for.
   * @returns The constructed search URL.
   */
  protected createUrl(
    searchText: string,
    page: number,
    pageSize: number = SearchUrlBuilder.MAX_ENTRIES_PER_PAGE
  ): string {
    const urlStrategy = new CriteriaSearchUrlStrategy(
      searchText,
      this.searchEngine.getAvailabilityFilter(),
      this.searchEngine.getContextFilter(),
      this.searchEngine.getKdsModuleFilter(),
      this.searchEngine.getTerminologyFilter()
    );
    return urlStrategy.getSearchUrl(pageSize, page);
  }

  protected getMapping(): CriteriaResultMapperStrategy {
    return new CriteriaResultMapperStrategy();
  }
}
