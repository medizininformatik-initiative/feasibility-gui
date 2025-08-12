import { AbstractSearch } from '../../Abstract/AbstractSearch';
import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';
import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';
import { CriteriaSearchResultProviderService } from '../Criteria/Result/CriteriaSearchResultProvider.service';
import { CriteriaSearchSigleEntryEngineService } from './Engine/CriteriaSearchSingleEntryEngine.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CriteriaByIdSearchService extends AbstractSearch<
  CriteriaListEntry,
  CriteriaResultList
> {
  constructor(
    private criteriaSearchSingleEntryEngineService: CriteriaSearchSigleEntryEngineService,
    private resultProvider: CriteriaSearchResultProviderService
  ) {
    super(resultProvider);
  }
  public search(id: string): Observable<CriteriaResultList> {
    return this.criteriaSearchSingleEntryEngineService.search(id);
  }

  public loadNextPage(): Observable<CriteriaResultList> {
    throw new Error('Method not implemented.');
  }

  public getSearchResults(): Observable<CriteriaResultList> {
    return this.resultProvider.getSearchResults();
  }

  protected setSearchTerm(): void {
    throw new Error('Method not implemented.');
  }
}
