import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractSearch } from './AbstractSearch';
import { Observable } from 'rxjs';
import { AbstractSimpleSearchResultProvider } from './Result/AbstractSimpleSearchResultProvider.service';

export abstract class AbstractSimpleSearch<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> extends AbstractSearch<C, T> {
  constructor(protected resultProviderService: AbstractSimpleSearchResultProvider<C, T>) {
    super(resultProviderService);
  }

  abstract search(searchTerm: string, page: number): Observable<T>;
  abstract loadNextPage(searchTerm: string): Observable<T>;

  public getSearchResults(): Observable<T> {
    return this.resultProviderService.getSearchResults();
  }

  protected abstract setSearchTerm(searchTerm: string): void;
}
