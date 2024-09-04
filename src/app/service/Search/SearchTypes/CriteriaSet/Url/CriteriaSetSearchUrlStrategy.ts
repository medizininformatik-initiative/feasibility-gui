import { ElasticSearchFilterPaths } from '../../../../Backend/Paths/ElasticSearchFilterPaths';
import { SearchUrlBuilder } from '../../../UrlBuilder/SearchUrlBuilder';
import { SearchUrlStrategy } from '../../../Strategy/InterfaceSearchUrlStrategy';
import { TerminologyPaths } from '../../../../Backend/Paths/TerminologyPaths';

export class CriteriaSetSearchUrlStrategy implements SearchUrlStrategy {
  constructor(private searchText: string, private criteriaSetUrls: string[]) {}

  public getSearchUrl(): string {
    return new SearchUrlBuilder(TerminologyPaths.SEARCH_ENTRY_ENDPOINT)
      .withSearchTerm(this.searchText)
      .withFiltertUrl(ElasticSearchFilterPaths.CRITERIASETS, this.criteriaSetUrls.join(','))
      .buildUrl();
  }
}
