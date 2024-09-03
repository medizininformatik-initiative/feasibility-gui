import { CriteriaResultMapper } from './CriteriaResultMapper';
import { ElasticSearchFilterProvider } from '../../Provider/ElasticSearchFilterProvider.service';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchResultProcessorService } from '../SearchResultProcessor.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { SearchUrlBuilder } from '../UrlBuilder/SearchUrlBuilder';
import { TerminologyPaths } from '../../Backend/Paths/TerminologyPaths';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchService {
  constructor(
    private searchResultProcessorService: SearchResultProcessorService<
      SearchTermListEntry,
      SearchTermResultList
    >,
    private elasticSearchFilterProvider: ElasticSearchFilterProvider
  ) {}

  public search(searchText: string): Observable<SearchTermResultList> {
    const resultMapper = new CriteriaResultMapper();
    const urlBuilder = this.buildUrlWithFilter(searchText);
    return this.searchResultProcessorService.fetchAndMapSearchResults(urlBuilder, resultMapper);
  }

  private buildUrlWithFilter(searchText: string) {
    return new SearchUrlBuilder(TerminologyPaths.SEARCH_ENTRY_ENDPOINT)
      .withSearchTerm(searchText)
      .withAvailability(this.getFilter(ElasticSearchFilterTypes.AVAILABILITY))
      .withContext(this.getFilter(ElasticSearchFilterTypes.CONTEXT))
      .withKds(this.getFilter(ElasticSearchFilterTypes.KDS_MODULE))
      .withTerminology(this.getFilter(ElasticSearchFilterTypes.TERMINOLOGY));
  }

  private getFilter(type: ElasticSearchFilterTypes): string {
    return this.elasticSearchFilterProvider.getSelectedValuesOfType(type).join(',');
  }
}
