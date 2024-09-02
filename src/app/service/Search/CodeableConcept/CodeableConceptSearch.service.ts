import { CodeableConceptPaths } from '../../Backend/Paths/CodeableConceptPaths';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptResultMapper } from './CodeableConceptResultMapper';
import { ElasticSearchFilterPaths } from '../../Backend/Paths/ElasticSearchFilterPaths';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResultProcessorService } from '../SearchResultProcessor.service';
import { SearchUrlBuilder } from '../UrlBuilder/SearchUrlBuilder';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchService {
  constructor(
    private searchResultProcessorService: SearchResultProcessorService<
      CodeableConceptResultListEntry,
      CodeableConceptResultList
    >
  ) {}

  public search(searchText: string, valueSetUrls: string[]): Observable<CodeableConceptResultList> {
    const resultMapper = new CodeableConceptResultMapper();
    const urlBuilder = new SearchUrlBuilder(CodeableConceptPaths.SEARCH_CONCEPT_ENDPOINT)
      .withCriteriaSetUrl(ElasticSearchFilterPaths.VALUESETS, valueSetUrls.join(','))
      .withSearchTerm(searchText);
    return this.searchResultProcessorService.fetchAndMapSearchResults(urlBuilder, resultMapper);
  }
}
