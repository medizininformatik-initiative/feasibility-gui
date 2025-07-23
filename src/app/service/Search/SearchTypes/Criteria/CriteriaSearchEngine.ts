import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CriteriaResultMapperStrategy } from './Mapping/CriteriaResultMapperStrategy';
import { CriteriaSearchUrlStrategy } from './Url/CriteriaSearchUrlStrategy';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SearchResultSetterService } from '../../Result/SearchResultSetter.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { SearchUrlBuilder } from '../../UrlBuilder/SearchUrlBuilder';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchEngineService {
  private maxPage = 1;
  constructor(
    private searchResultSetter: SearchResultSetterService,
    private searchResultProcessorService: AbstractSearchEngine<
      SearchTermListEntry,
      SearchTermResultList
    >
  ) {}

  public search(
    searchText: string,
    page: number
  ): Observable<SearchTermResultList> | Observable<null> {
    const resultMapper = this.getMapping();
    const urlBuilder = this.createUrl(searchText, SearchUrlBuilder.MAX_ENTRIES_PER_PAGE, page);
    if (page < this.maxPage) {
      return this.searchResultProcessorService
        .fetchAndMapSearchResults(urlBuilder, resultMapper)
        .pipe(
          map((result) => {
            this.maxPage = Math.floor(result.getTotalHits() / SearchUrlBuilder.MAX_ENTRIES_PER_PAGE);
            this.maxPage =
              this.maxPage < SearchUrlBuilder.MAX_PAGES ? this.maxPage : SearchUrlBuilder.MAX_PAGES;
            this.searchResultSetter.setCriteriaSearchResults(result);
            return result;
          })
        );
    } else {
      const emptyResult = new SearchTermResultList(0, []);
      return of(emptyResult);
    }
  }

  private createUrl(searchText: string, pageSize: number, page: number): string {
    const urlStrategy = new CriteriaSearchUrlStrategy(
      searchText,
      this.searchResultProcessorService.getAvailabilityFilter(),
      this.searchResultProcessorService.getContextFilter(),
      this.searchResultProcessorService.getKdsModuleFilter(),
      this.searchResultProcessorService.getTerminologyFilter()
    );
    return urlStrategy.getSearchUrl(pageSize, page);
  }

  public getMapping(): CriteriaResultMapperStrategy {
    return new CriteriaResultMapperStrategy();
  }
}
