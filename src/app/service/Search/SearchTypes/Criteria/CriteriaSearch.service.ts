import { AbstractSimpleSearch } from '../../Abstract/AbstractSimpleSearch';
import { CriteriaListEntry } from 'src/app/shared/models/ListEntries/CriteriaListListEntry';
import { CriteriaResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/CriteriaResultList';
import { CriteriaSearchPaginationService } from './Pagination/CriteriaSearchPagination.service';
import { CriteriaSearchResultProviderService } from './Result/CriteriaSearchResultProvider.service';
import { CriteriaSearchStateService } from '../../CriteriaSearchState.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchService extends AbstractSimpleSearch<
  CriteriaListEntry,
  CriteriaResultList
> {
  constructor(
    private paginator: CriteriaSearchPaginationService,
    resultProvider: CriteriaSearchResultProviderService,
    private criteriaSearchStateService: CriteriaSearchStateService
  ) {
    super(resultProvider);
  }

  public search(searchTerm: string): Observable<CriteriaResultList> {
    this.setSearchTerm(searchTerm);
    return this.paginator.searchFirstPage(searchTerm);
  }

  public loadNextPage(searchTerm: string): Observable<CriteriaResultList> {
    this.setSearchTerm(searchTerm);
    return this.paginator.loadNextPage(searchTerm);
  }

  public getSearchResults(): Observable<CriteriaResultList> {
    return this.resultProviderService.getSearchResults();
  }

  protected setSearchTerm(searchTerm: string) {
    this.criteriaSearchStateService.setActiveSearchTerm(searchTerm);
  }
}
