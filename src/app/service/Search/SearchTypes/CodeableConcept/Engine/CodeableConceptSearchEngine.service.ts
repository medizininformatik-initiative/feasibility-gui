import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptResultMapperStrategy } from '../Mapper/CodeableConceptResultMapperStrategy';
import { CodeableConceptSearchUrlStrategy } from '../Url/CodeableConceptSearchUrlStrategy';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchResultSetterService } from '../../../Result/SearchResultSetter.service';
import { SearchEngine } from '../../../SearchEngine';
import { AbstractSearchEngine } from '../../../Abstract/AbstractSearchEngine.service';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchEngineService extends AbstractSearchEngine<
  CodeableConceptResultListEntry,
  CodeableConceptResultList
> {
  constructor(
    private searchResultSetter: SearchResultSetterService,
    protected searchEngine: SearchEngine<CodeableConceptResultListEntry, CodeableConceptResultList>
  ) {
    super(searchEngine);
  }

  public search(
    searchText: string,
    page: number = 0,
    valueSetUrl: string[],
    conceptFilterId: string
  ): Observable<CodeableConceptResultList> {
    const resultMapper = this.getMapping();
    const url = this.createUrl(searchText, valueSetUrl);
    return this.searchEngine.fetchAndMapSearchResults(url, resultMapper).pipe(
      map((result) => {
        this.searchResultSetter.setCodeableConceptSearchResults(result, conceptFilterId);
        return result;
      })
    );
  }

  protected createUrl(searchText: string, valueSetUrls: string[]) {
    return new CodeableConceptSearchUrlStrategy(searchText, valueSetUrls).getSearchUrl();
  }

  protected getMapping(): CodeableConceptResultMapperStrategy {
    return new CodeableConceptResultMapperStrategy();
  }
}
