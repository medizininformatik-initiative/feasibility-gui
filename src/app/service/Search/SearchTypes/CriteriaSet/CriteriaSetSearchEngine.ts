import { CriteriaSetResultMapperStrategy } from './Mapper/CriteriaSetResultMapperStrategy';
import { CriteriaSetSearchUrlStrategy } from './Url/CriteriaSetSearchUrlStrategy';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchResultSetterService } from '../../Result/SearchResultSetter.service';
import { SearchUrlBuilder } from '../../UrlBuilder/SearchUrlBuilder';
import { TerminologyPaths } from 'src/app/service/Backend/Paths/TerminologyPaths';
import { SearchEngine } from '../../SearchEngine';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSetSearchEngineService {
  private readonly path: string = TerminologyPaths.SEARCH_ENTRY_ENDPOINT;

  constructor(
    private searchResultSetter: SearchResultSetterService,
    private searchResultProcessorService: SearchEngine<
      ReferenceCriteriaListEntry,
      ReferenceCriteriaResultList
    >
  ) {}

  public search(
    searchText: string,
    criteriaSetUrls: string
  ): Observable<ReferenceCriteriaResultList> {
    const resultMapper = this.getMapping();
    const url = this.createUrl(searchText, criteriaSetUrls);
    return this.searchResultProcessorService.fetchAndMapSearchResults(url, resultMapper).pipe(
      map((result) => {
        this.searchResultSetter.setCriteriaSetSearchResults(result);
        return result;
      })
    );
  }

  private createUrl(searchText: string, criteriaSetUrls: string): string {
    return new CriteriaSetSearchUrlStrategy(searchText, criteriaSetUrls).getSearchUrl();
  }

  private getMapping(): CriteriaSetResultMapperStrategy {
    return new CriteriaSetResultMapperStrategy();
  }
}
