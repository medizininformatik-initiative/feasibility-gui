import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultMapper } from './AbstractResultMapper';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { Observable } from 'rxjs';
import { AbstractSearchResultProviderService } from './AbstractSearchResultProvider.servcie';

export abstract class AbstractSearch<C extends AbstractListEntry, T extends AbstractResultList<C>> {
  constructor(private resultProviderService: AbstractSearchResultProviderService<C, T>) {}
  abstract search(searchTerm: string, page: number, ...params: any[]): Observable<T>;

  abstract loadNextPage(searchTerm: string): Observable<T>;

  public getSearchResults(): Observable<T> {
    return this.resultProviderService.getSearchResults();
  }

  protected abstract setSearchTerm(searchTerm: string): void;
}
