import { AbstractSimpleSearchEngine } from '../../../Abstract/Engine/AbstractSimpleSearchEngine.service';
import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';
import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';
import { CriteriaResultMapperStrategy } from '../Mapping/CriteriaResultMapperStrategy';
import { CriteriaSearchUrlStrategy } from '../Url/CriteriaSearchUrlStrategy';
import { Injectable } from '@angular/core';
import { SearchEngine } from '../../../SearchEngine';
import { SearchUrlBuilder } from '../../../UrlBuilder/SearchUrlBuilder';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchEngineService extends AbstractSimpleSearchEngine<
  CriteriaListEntry,
  CriteriaResultList
> {
  constructor(protected searchEngine: SearchEngine<CriteriaListEntry, CriteriaResultList>) {
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
