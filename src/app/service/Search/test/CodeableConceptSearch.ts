import { CodeableConceptPaths } from '../../Backend/Paths/CodeableConceptPaths';
import { ElasticSearchFilterPaths } from '../../Backend/Paths/ElasticSearchFilterPaths';
import { CodeableConceptResultMapper } from '../CodeableConcept/CodeableConceptResultMapper';
import { SearchUrlBuilder } from '../UrlBuilder/SearchUrlBuilder';
import { AbstractSearch } from './AbstractSearch';

export class CodeableConceptSearch extends AbstractSearch {
  private searchText: string;
  private valueSetUrls: string[];

  constructor(searchText: string, valueSetUrls: string[]) {
    super();
    this.searchText = searchText;
    this.valueSetUrls = valueSetUrls;
  }

  getSearchUrl(): string {
    const urlBuilder = new SearchUrlBuilder(CodeableConceptPaths.SEARCH_CONCEPT_ENDPOINT)
      .withCriteriaSetUrl(ElasticSearchFilterPaths.VALUESETS, this.valueSetUrls.join(','))
      .withSearchTerm(this.searchText);
    return urlBuilder.buildUrl();
  }

  getResultMapper() {
    return new CodeableConceptResultMapper();
  }
}
