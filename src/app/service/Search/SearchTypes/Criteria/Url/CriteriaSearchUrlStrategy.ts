import { SearchUrlStrategy } from '../../../Interface/InterfaceSearchUrlStrategy';
import { SearchUrlBuilder } from '../../../UrlBuilder/SearchUrlBuilder';
import { TerminologyPaths } from 'src/app/service/Backend/Paths/TerminologyPaths';

export class CriteriaSearchUrlStrategy implements SearchUrlStrategy {
  private searchText: string;
  private availabilityFilter: string;
  private contextFilter: string;
  private kdsFilter: string;
  private terminologyFilter: string;

  constructor(
    searchText: string,
    availabilityFilter: string,
    contextFilter: string,
    kdsFilter: string,
    terminologyFilter: string
  ) {
    this.searchText = searchText;
    this.availabilityFilter = availabilityFilter;
    this.contextFilter = contextFilter;
    this.kdsFilter = kdsFilter;
    this.terminologyFilter = terminologyFilter;
  }

  public getSearchUrl(): string {
    const url = new SearchUrlBuilder(TerminologyPaths.SEARCH_ENTRY_ENDPOINT)
      .withSearchTerm(this.searchText)
      .withAvailability(this.availabilityFilter)
      .withContext(this.contextFilter)
      .withKds(this.kdsFilter)
      .withTerminology(this.terminologyFilter)
      .withPageSize()
      .buildUrl();
    return url;
  }
}
