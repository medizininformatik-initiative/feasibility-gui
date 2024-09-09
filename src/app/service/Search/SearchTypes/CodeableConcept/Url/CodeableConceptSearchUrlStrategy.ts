import { CodeableConceptPaths } from 'src/app/service/Backend/Paths/CodeableConceptPaths';
import { ElasticSearchFilterPaths } from 'src/app/service/Backend/Paths/ElasticSearchFilterPaths';
import { SearchUrlBuilder } from '../../../UrlBuilder/SearchUrlBuilder';
import { SearchUrlStrategy } from '../../../Interface/InterfaceSearchUrlStrategy';
export class CodeableConceptSearchUrlStrategy implements SearchUrlStrategy {
  private readonly path: string = CodeableConceptPaths.SEARCH_CONCEPT_ENDPOINT;
  private searchText: string;
  private valueSetUrls: string;

  constructor(searchText: string, valueSetUrls: string) {
    this.searchText = searchText;
    this.valueSetUrls = valueSetUrls;
  }

  public getSearchUrl(): string {
    const url = new SearchUrlBuilder(this.path)
      .withFiltertUrl(ElasticSearchFilterPaths.VALUESETS, this.valueSetUrls)
      .withSearchTerm(this.searchText)
      .buildUrl();
    return url;
  }
}
