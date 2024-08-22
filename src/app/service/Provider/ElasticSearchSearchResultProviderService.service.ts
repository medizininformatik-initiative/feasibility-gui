import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InterfaceListEntry } from 'src/app/shared/models/ListEntries/InterfaceListEntry';
import { InterfaceResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/InterfaceResultList';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchSearchResultProviderService<
  T extends InterfaceResultList<C>,
  C extends InterfaceListEntry
> {
  private searchTermResultList = new BehaviorSubject<T>({
    totalHits: 0,
    results: [] as C[],
  } as T);

  /**
   * Sets the current list of results found for a search term.
   *
   * @param resultList The result list to set.
   */
  public setSearchtermResultList(resultList: T): void {
    this.searchTermResultList.next(resultList);
  }

  /**
   * Returns an Observable that emits the current search term result list.
   *
   * @returns An Observable emitting the current result list.
   */
  public getSearchTermResultList(): Observable<T | null> {
    return this.searchTermResultList.asObservable();
  }
}
