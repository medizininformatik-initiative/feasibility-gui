import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptSearchMediatorService } from './Mediator/CodeableConceptSearchMediator.service';
import { CodeableConceptSearchPaginationService } from './Pagination/CodeableConceptSearchPagination.service';
import { CodeableConceptSearchResultProviderService } from './Result/CodeableConceptSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractKeyedSearch } from '../../Abstract/AbstractKeyedSearch';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchService extends AbstractKeyedSearch<
  CodeableConceptResultListEntry,
  CodeableConceptResultList
> {
  constructor(
    resultProvider: CodeableConceptSearchResultProviderService,
    private mediator: CodeableConceptSearchMediatorService,
    private codeableConceptPaginationService: CodeableConceptSearchPaginationService
  ) {
    super(resultProvider);
  }

  public search(
    searchText: string,
    page: number = 0,
    valueSetUrl: string[]
  ): Observable<CodeableConceptResultList> {
    this.codeableConceptPaginationService.resetPagination();
    return this.mediator.searchAndSetProvider(searchText, page, valueSetUrl);
  }

  public loadNextPage(
    searchText: string,
    valueSetUrls: string[]
  ): Observable<CodeableConceptResultList> {
    return this.codeableConceptPaginationService.loadNextPage(searchText, valueSetUrls);
  }

  protected setSearchTerm(searchTerm: string): void {
    // Implement logic to set the search term if needed
  }
}
