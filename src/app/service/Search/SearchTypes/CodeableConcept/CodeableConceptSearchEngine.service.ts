import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptResultMapperStrategy } from './Mapper/CodeableConceptResultMapperStrategy';
import { CodeableConceptSearchUrlStrategy } from './Url/CodeableConceptSearchUrlStrategy';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchResultSetterService } from '../../Result/SearchResultSetter.service';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchEngineService {
  constructor(
    private searchResultSetter: SearchResultSetterService,
    private searchResultProcessorService: AbstractSearchEngine<
      CodeableConceptResultListEntry,
      CodeableConceptResultList
    >
  ) {}

  public search(
    searchText: string,
    valueSetUrl: string,
    conceptFilterId: string
  ): Observable<CodeableConceptResultList> {
    const resultMapper = this.getMapping();
    const url = this.createUrl(searchText, valueSetUrl);
    return this.searchResultProcessorService.fetchAndMapSearchResults(url, resultMapper).pipe(
      map((result) => {
        this.searchResultSetter.setCodeableConceptSearchResults(result, conceptFilterId);
        return result;
      })
    );
  }

  private createUrl(searchText: string, valueSetUrls: string) {
    return new CodeableConceptSearchUrlStrategy(searchText, valueSetUrls).getSearchUrl();
  }

  private getMapping(): CodeableConceptResultMapperStrategy {
    return new CodeableConceptResultMapperStrategy();
  }
}
