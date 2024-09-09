import { AbstractSearchEngine } from '../../Abstract/AbstractSearchEngine';
import { CriteriaResulByIdMapperStrategy } from './Mapping/CriteriaResulByIdMapperStrategy';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SearchResultSetterService } from '../../Result/SearchResultSetter.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { TerminologyPaths } from 'src/app/service/Backend/Paths/TerminologyPaths';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchSigleEntryEngineService {
  private readonly path: string = TerminologyPaths.ENTRY_ENDPOINT;

  constructor(
    private searchResultSetter: SearchResultSetterService,
    private searchResultProcessorService: AbstractSearchEngine<
      SearchTermListEntry,
      SearchTermResultList
    >
  ) {}

  public search(id: string) {
    const mapping = this.getMapping();
    const url = this.path + id;
    return this.searchResultProcessorService.fetchAndMapSearchResults(url, mapping).pipe(
      map((result) => {
        this.searchResultSetter.setCriteriaSearchResults(result);
        return result;
      })
    );
  }

  public getMapping(): CriteriaResulByIdMapperStrategy {
    return new CriteriaResulByIdMapperStrategy();
  }
}
