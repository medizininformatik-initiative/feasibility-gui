import { TerminologyPaths } from 'src/app/service/Backend/Paths/TerminologyPaths';
import { SearchUrlBuilder } from '../../../UrlBuilder/SearchUrlBuilder';

export class CriteriaSearchByIdUrlStrategy {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getSearchUrl(): string {
    return TerminologyPaths.ENTRY_ENDPOINT + this.id;
  }
}
