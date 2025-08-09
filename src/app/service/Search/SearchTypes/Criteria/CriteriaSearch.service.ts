import { AbstractSearch } from '../../Abstract/AbstractSearch';
import { AbstractSimpleSearch } from '../../Abstract/AbstractSimpleSearch';
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
    private paginator: CriteriaSearchPaginationService,
    resultProvider: CriteriaSearchResultProviderService,
    private criteriaSearchStateService: CriteriaSearchStateService
  ) {
    super(resultProvider);
  }

  public search(searchTerm: string): Observable<SearchTermResultList> {
    this.setSearchTerm(searchTerm);
    return this.paginator.searchFirstPage(searchTerm);
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
