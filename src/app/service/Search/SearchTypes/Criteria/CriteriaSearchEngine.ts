import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CriteriaResultMapperStrategy } from './Mapping/CriteriaResultMapperStrategy';
import { CriteriaSearchUrlStrategy } from './Url/CriteriaSearchUrlStrategy';

export class CriteriaSearchEngine extends AbstractSearchEngine {
  private searchText: string;

  constructor(searchText: string) {
    super();
    this.searchText = searchText;
  }

  public getUrl(): string {
    return new CriteriaSearchUrlStrategy(this.searchText).getSearchUrl();
  }

  getMapping(): CriteriaResultMapperStrategy {
    return new CriteriaResultMapperStrategy();
  }
}
