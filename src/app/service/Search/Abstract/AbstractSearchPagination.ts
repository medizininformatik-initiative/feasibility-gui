import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchMediatorService } from './AbstractSearchMediator';
import { Observable } from 'rxjs';

export abstract class AbstractSearchPagination<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  protected currentPage = 0;

  constructor(private mediatorService: AbstractSearchMediatorService<C, T>) {}

  public resetPagination(): void {
    this.currentPage = 0;
  }

  public searchWithPagination(searchTerm: string): Observable<T> {
    this.currentPage++;
    return this.mediatorService.searchAndUpdateProvider(searchTerm, this.currentPage);
  }
}
