import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { Observable } from 'rxjs';
import { MappingStrategy } from '../Interface/InterfaceMappingStrategy';

export abstract class AbstractSearchEngine<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  public abstract search(searchText: string, ...params: any[]): Observable<T>;

  protected abstract createUrl(searchText: string, ...params: any[]): string;

  protected abstract getMapping(): MappingStrategy<C, T>;
}
