import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { AbstractSearch } from '../../Abstract/AbstractSearch';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptSearchEngineService } from './Engine/CodeableConceptSearchEngine.service';
import { Observable } from 'rxjs';
import { CodeableConceptSearchResultProviderService } from './Result/CodeableConceptSearchResultProvider.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchService {
  constructor(
    private resultProvider: CodeableConceptSearchResultProviderService,
    private codeableConceptSearchEngineService: CodeableConceptSearchEngineService
  ) {}

  public search(
    searchText: string,
    page: number = 0,
    valueSetUrl: string[],
    conceptFilterId: string
  ): Observable<CodeableConceptResultList> {
    return this.codeableConceptSearchEngineService.search(
      searchText,
      page,
      valueSetUrl,
      conceptFilterId
    );
  }

  public loadNextPage(searchText: string): Observable<CodeableConceptResultList> {
    // Implement pagination logic if needed
    throw new Error('Method not implemented.');
  }

  protected setSearchTerm(searchTerm: string): void {
    // Implement logic to set the search term if needed
  }
}
