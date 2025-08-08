import { AbstractKeyedSearchEngineService } from '../../../Abstract/Engine/AbstractKeyedSearchEngine.service';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptResultMapperStrategy } from '../Mapper/CodeableConceptResultMapperStrategy';
import { CodeableConceptSearchUrlStrategy } from '../Url/CodeableConceptSearchUrlStrategy';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchEngine } from '../../../SearchEngine';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchEngineService extends AbstractKeyedSearchEngineService<
  CodeableConceptResultListEntry,
  CodeableConceptResultList
> {
  constructor(
    protected searchEngine: SearchEngine<CodeableConceptResultListEntry, CodeableConceptResultList>
  ) {
    super(searchEngine);
  }

  public search(
    searchText: string,
    page: number = 0,
    valueSetUrl: string[]
  ): Observable<CodeableConceptResultList> {
    const resultMapper = this.getMapping();
    const url = this.createUrl(searchText, page, valueSetUrl);
    return this.searchEngine.fetchAndMapSearchResults(url, resultMapper);
  }

  protected createUrl(searchText: string, page: number, valueSetUrls: string[]): string {
    return new CodeableConceptSearchUrlStrategy(searchText, valueSetUrls).getSearchUrl(page);
  }

  protected getMapping(): CodeableConceptResultMapperStrategy {
    return new CodeableConceptResultMapperStrategy();
  }
}
