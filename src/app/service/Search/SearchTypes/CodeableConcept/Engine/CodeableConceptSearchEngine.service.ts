import { AbstractKeyedSearchEngineService } from '../../../Abstract/Engine/AbstractKeyedSearchEngine.service';
import { CodeableConceptResultList } from 'src/app/model/Search/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/model/Search/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptResultMapperStrategy } from '../Mapper/CodeableConceptResultMapperStrategy';
import { CodeableConceptSearchUrlStrategy } from '../Url/CodeableConceptSearchUrlStrategy';
import { Injectable } from '@angular/core';
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

  protected createUrl(searchText: string, page: number, valueSetUrls: string[]): string {
    return new CodeableConceptSearchUrlStrategy(searchText, valueSetUrls).getSearchUrl(page);
  }

  protected getMapping(): CodeableConceptResultMapperStrategy {
    return new CodeableConceptResultMapperStrategy();
  }
}
