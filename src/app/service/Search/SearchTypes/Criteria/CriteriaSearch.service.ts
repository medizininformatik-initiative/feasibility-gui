import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { AbstractSearch } from '../../Abstract/AbstractSearch';
import { CriteriaSearchStateService } from '../../CriteriaSearchState.service';
import { CriteriaSearchMediatorService } from './Mediator/CriteriaSearchMediator.service';
import { CriteriaSearchPaginationService } from './Pagination/CriteriaSearchPagination.service';
import { CriteriaSearchResultProviderService } from './Result/CriteriaSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchService extends AbstractSearch<
  SearchTermListEntry,
  SearchTermResultList
> {
  constructor(
    private mediator: CriteriaSearchMediatorService,
    private paginator: CriteriaSearchPaginationService,
    private criteriaSearchResultProviderService: CriteriaSearchResultProviderService,
    private criteriaSearchStateService: CriteriaSearchStateService
  ) {
    super(criteriaSearchResultProviderService);
  }

  public search(searchTerm: string, page = 0): Observable<SearchTermResultList> {
    this.paginator.resetPagination();
    this.setSearchTerm(searchTerm);
    return this.mediator.searchAndSetProvider(searchTerm, page);
  }

  public loadNextPage(searchTerm: string): Observable<SearchTermResultList> {
    this.setSearchTerm(searchTerm);
    return this.paginator.searchWithPagination(searchTerm);
  }

  protected setSearchTerm(searchTerm: string) {
    this.criteriaSearchStateService.setActiveSearchTerm(searchTerm);
  }
}
