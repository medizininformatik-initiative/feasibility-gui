import { CriteriaSearchByIdUrlStrategy } from './Url/CriteriaSearchByIdUrlStrategy';
import { CriteriaResultMapperStrategy } from '../Criteria/Mapping/CriteriaResultMapperStrategy';
import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CriteriaResulByIdtMapperStrategy } from './Mapping/CriteriaResulByIdtMapperStrategy';

export class CriteriaSearchByIdEngine extends AbstractSearchEngine {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  public getUrl(): string {
    return new CriteriaSearchByIdUrlStrategy(this.id).getSearchUrl();
  }

  public getMapping(): CriteriaResulByIdtMapperStrategy {
    return new CriteriaResulByIdtMapperStrategy();
  }
}
