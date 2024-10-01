import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CriteriaSetResultMapperStrategy } from './Mapper/CriteriaSetResultMapperStrategy';
import { ElasticSearchFilterPaths } from 'src/app/service/Backend/Paths/ElasticSearchFilterPaths';
import { map, Observable } from 'rxjs';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchUrlBuilder } from '../../UrlBuilder/SearchUrlBuilder';
import { TerminologyPaths } from 'src/app/service/Backend/Paths/TerminologyPaths';
import { Injectable } from '@angular/core';
import { SearchResultSetterService } from '../../Result/SearchResultSetter.service';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSetSearchEngineService {
  private readonly path: string = TerminologyPaths.SEARCH_ENTRY_ENDPOINT;

  constructor(
    private searchResultSetter: SearchResultSetterService,
    private searchResultProcessorService: AbstractSearchEngine<
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
    return new SearchUrlBuilder(this.path)
      .withSearchTerm(searchText)
      .withFiltertUrl(ElasticSearchFilterPaths.CRITERIASETS, criteriaSetUrls)
      .buildUrl();
  }

  private getMapping(): CriteriaSetResultMapperStrategy {
    return new CriteriaSetResultMapperStrategy();
  }
}
