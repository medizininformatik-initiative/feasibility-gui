import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CodeableConceptResultMapperStrategy } from './Mapper/CodeableConceptResultMapperStrategy';
import { CodeableConceptSearchUrlStrategy } from './Url/CodeableConceptSearchUrlStrategy';

export class CodeableConceptSearchEngine extends AbstractSearchEngine {
  private searchText: string;
  private valueSetUrls: string;

  constructor(searchText: string, valueSetUrls: string) {
    super();
    this.searchText = searchText;
    this.valueSetUrls = valueSetUrls;
  }

  public getUrl(): string {
    return new CodeableConceptSearchUrlStrategy(this.searchText, this.valueSetUrls).getSearchUrl();
  }

  public getMapping(): CodeableConceptResultMapperStrategy {
    return new CodeableConceptResultMapperStrategy();
  }
}
