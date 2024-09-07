import { SearchUrlStrategy } from '../../../Interface/InterfaceSearchUrlStrategy';
import { SearchUrlBuilder } from '../../../UrlBuilder/SearchUrlBuilder';
import { TerminologyPaths } from 'src/app/service/Backend/Paths/TerminologyPaths';

export class CriteriaSearchUrlStrategy implements SearchUrlStrategy {
  private searchText: string;

  constructor(searchText: string) {
    this.searchText = searchText;
  }

  getSearchUrl(): string {
    const urlBuilder = new SearchUrlBuilder(TerminologyPaths.SEARCH_ENTRY_ENDPOINT).withSearchTerm(
      this.searchText
    );
    return urlBuilder.buildUrl();
  }
}
