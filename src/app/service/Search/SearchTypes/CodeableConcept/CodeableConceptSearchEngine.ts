import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultMapperStrategy } from './Mapper/CodeableConceptResultMapperStrategy';
import { CodeableConceptSearchUrlStrategy } from './Url/CodeableConceptSearchUrlStrategy';
import { Observable } from 'rxjs';
import { SearchContext } from '../../Strategy/SearchContext';

export class CodeableConceptSearchEngine {
  private searchText: string;
  private valueSetUrls: string[];

  constructor(searchText: string, valueSetUrls: string[]) {
    this.searchText = searchText;
    this.valueSetUrls = valueSetUrls;
  }

  /**
   * Encapsulate search strategy logic and result mapping within this method.
   * This uses the Strategy Pattern to dynamically handle search and mapping.
   */
  public executeSearch(): Observable<CodeableConceptResultList> {
    const searchStrategy = new CodeableConceptSearchUrlStrategy(this.searchText, this.valueSetUrls);
    const mappingStrategy = new CodeableConceptResultMapperStrategy();
    const searchContext = new SearchContext(searchStrategy, mappingStrategy);
    return searchContext.executeSearch();
  }
}
