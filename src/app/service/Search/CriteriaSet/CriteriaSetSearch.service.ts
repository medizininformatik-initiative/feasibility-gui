import { CriteriaSetResultMapper } from './CriteriaSetResultMapper';
import { ElasticSearchFilterPaths } from '../../Backend/Paths/ElasticSearchFilterPaths';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchResultProcessorService } from '../SearchResultProcessor.service';
import { SearchUrlBuilder } from '../UrlBuilder/SearchUrlBuilder';
import { TerminologyPaths } from '../../Backend/Paths/TerminologyPaths';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSetSearchService {
  constructor(
    private searchResultProcessorService: SearchResultProcessorService<
      ReferenceCriteriaListEntry,
      ReferenceCriteriaResultList
    >
  ) {}

  public search(
    searchText: string,
    criteriaSetUrls: string[]
  ): Observable<ReferenceCriteriaResultList> {
    const resultMapper = new CriteriaSetResultMapper();
    const urlBuilder = new SearchUrlBuilder(TerminologyPaths.SEARCH_ENTRY_ENDPOINT)
      .withSearchTerm(searchText)
      .withCriteriaSetUrl(ElasticSearchFilterPaths.CRITERIASETS, criteriaSetUrls.join(','));
    return this.searchResultProcessorService.fetchAndMapSearchResults(urlBuilder, resultMapper);
  }
}
