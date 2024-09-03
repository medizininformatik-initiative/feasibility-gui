import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchUrlStrategy } from './InterfaceSearchUrlStrategy';
import { MappingStrategy } from './InterfaceMappingStrategy';
import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { TerminologyApiService } from '../../Backend/Api/TerminologyApi.service';

export class SearchContext<C extends AbstractListEntry, T extends AbstractResultList<C>> {
  private searchStrategy: SearchUrlStrategy;
  private mappingStrategy: MappingStrategy<C, T>;
  private terminologyApiService: TerminologyApiService;

  constructor(searchStrategy: SearchUrlStrategy, mappingStrategy: MappingStrategy<C, T>) {
    this.searchStrategy = searchStrategy;
    this.mappingStrategy = mappingStrategy;
  }

  public executeSearch(): Observable<T> {
    const url = this.searchStrategy.getSearchUrl();
    return this.performSearch(url).pipe(
      map((response) => this.mappingStrategy.mapResponseToResultList(response))
    );
  }

  private performSearch(url: string): Observable<any> {
    return this.terminologyApiService.getElasticSearchResults(url);
  }
}
