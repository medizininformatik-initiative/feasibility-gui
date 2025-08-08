import { AbstractKeyedSearchResultProvider } from './Result/AbstractKeyedSearchResultProvider.service';
import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearch } from './AbstractSearch';
import { Observable } from 'rxjs';

export abstract class AbstractKeyedSearch<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> extends AbstractSearch<C, T> {
  constructor(protected resultProviderService: AbstractKeyedSearchResultProvider<C, T>) {
    super(resultProviderService);
  }

  abstract search(searchTerm: string, page: number, dataSetUrls: string[]): Observable<T>;

  abstract loadNextPage(searchTerm: string, dataSetUrls: string[]): Observable<T>;

  public getSearchResults(dataSetUrls: string[]): Observable<T> {
    return this.resultProviderService.getSearchResults(dataSetUrls);
  }

  protected abstract setSearchTerm(searchTerm: string): void;
}
