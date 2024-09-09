import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CriteriaResultMapperStrategy } from './Mapping/CriteriaResultMapperStrategy';
import { CriteriaSearchUrlStrategy } from './Url/CriteriaSearchUrlStrategy';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchResultSetterService } from '../../Result/SearchResultSetter.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchEngineService {
  constructor(
    private searchResultSetter: SearchResultSetterService,
    private searchResultProcessorService: AbstractSearchEngine<
      SearchTermListEntry,
      SearchTermResultList
    >
  ) {}

  public search(searchText: string): Observable<SearchTermResultList> {
    const resultMapper = this.getMapping();
    const urlBuilder = this.createUrl(searchText);
    return this.searchResultProcessorService
      .fetchAndMapSearchResults(urlBuilder, resultMapper)
      .pipe(
        map((result) => {
          this.searchResultSetter.setCriteriaSearchResults(result);
          return result;
        })
      );
  }

  private createUrl(searchText: string) {
    const urlStrategy = new CriteriaSearchUrlStrategy(
      searchText,
      this.searchResultProcessorService.getAvailabilityFilter(),
      this.searchResultProcessorService.getContextFilter(),
      this.searchResultProcessorService.getKdsModuleFilter(),
      this.searchResultProcessorService.getTerminologyFilter()
    );
    return urlStrategy.getSearchUrl();
  }

  public getMapping(): CriteriaResultMapperStrategy {
    return new CriteriaResultMapperStrategy();
  }
}
