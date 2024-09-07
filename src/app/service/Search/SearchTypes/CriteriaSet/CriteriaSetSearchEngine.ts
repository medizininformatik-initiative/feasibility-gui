import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CriteriaSetResultMapperStrategy } from './Mapper/CriteriaSetResultMapperStrategy';
import { CriteriaSetSearchUrlStrategy } from './Url/CriteriaSetSearchUrlStrategy';

export class CriteriaSetSearchEngine extends AbstractSearchEngine {
  private searchText: string;
  private criteriaSetUrls: string[];

  constructor(searchText: string, criteriaSetUrls: string[]) {
    super();
    this.searchText = searchText;
    this.criteriaSetUrls = criteriaSetUrls;
  }

  public getUrl(): string {
    return new CriteriaSetSearchUrlStrategy(this.searchText, this.criteriaSetUrls).getSearchUrl();
  }

  public getMapping(): CriteriaSetResultMapperStrategy {
    return new CriteriaSetResultMapperStrategy();
  }
}
