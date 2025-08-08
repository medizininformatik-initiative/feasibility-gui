import { AbstractSearch } from '../../Abstract/AbstractSearch';
import { AbstractSimpleSearch } from '../../Abstract/AbstractSimpleSearch';
import { CriteriaSearchMediatorService } from './Mediator/CriteriaSearchMediator.service';
import { CriteriaSearchPaginationService } from './Pagination/CriteriaSearchPagination.service';
import { CriteriaSearchResultProviderService } from './Result/CriteriaSearchResultProvider.service';
import { CriteriaSearchStateService } from '../../CriteriaSearchState.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchService extends AbstractSimpleSearch<
  SearchTermListEntry,
  SearchTermResultList
> {
  constructor(
    private mediator: CriteriaSearchMediatorService,
    private paginator: CriteriaSearchPaginationService,
    resultProvider: CriteriaSearchResultProviderService,
    private criteriaSearchStateService: CriteriaSearchStateService
  ) {
    super(resultProvider);
  }

  public search(searchTerm: string, page = 0): Observable<SearchTermResultList> {
    this.paginator.resetPagination();
    this.setSearchTerm(searchTerm);
    return this.mediator.searchAndSetProvider(searchTerm, page);
  }

  public loadNextPage(searchTerm: string): Observable<SearchTermResultList> {
    this.setSearchTerm(searchTerm);
    return this.paginator.loadNextPage(searchTerm);
  }

  public getSearchResults(): Observable<SearchTermResultList> {
    return this.resultProviderService.getSearchResults();
  }

  protected setSearchTerm(searchTerm: string) {
    this.criteriaSearchStateService.setActiveSearchTerm(searchTerm);
  }
}
