import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchResultProviderService } from './Result/AbstractSearchResultProvider.servcie';
import { Observable } from 'rxjs';

export abstract class AbstractSearch<C extends AbstractListEntry, T extends AbstractResultList<C>> {
  constructor(protected resultProviderService: AbstractSearchResultProviderService<C, T>) {}
  abstract search(searchTerm: string, page: number, dataSetUrls?: string[]): Observable<T>;

  abstract loadNextPage(searchTerm: string, dataSetUrls: string[]): Observable<T>;

  public abstract getSearchResults(dataSetUrls?: string[]): Observable<T>;

  protected abstract setSearchTerm(searchTerm: string): void;
}
