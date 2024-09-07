import { CodeableConceptPaths } from 'src/app/service/Backend/Paths/CodeableConceptPaths';
import { SearchUrlStrategy } from '../../../Interface/InterfaceSearchUrlStrategy';
import { SearchUrlBuilder } from '../../../UrlBuilder/SearchUrlBuilder';
import { ElasticSearchFilterPaths } from 'src/app/service/Backend/Paths/ElasticSearchFilterPaths';

export class CodeableConceptSearchUrlStrategy implements SearchUrlStrategy {
  private searchText: string;
  private valueSetUrls: string;

  constructor(searchText: string, valueSetUrls: string) {
    this.searchText = searchText;
    this.valueSetUrls = valueSetUrls;
  }

  getSearchUrl(): string {
    const urlBuilder = new SearchUrlBuilder(CodeableConceptPaths.SEARCH_CONCEPT_ENDPOINT)
      .withFiltertUrl(ElasticSearchFilterPaths.VALUESETS, this.valueSetUrls)
      .withSearchTerm(this.searchText);
    return urlBuilder.buildUrl();
  }
}
