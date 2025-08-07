import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { MappingStrategy } from '../Interface/InterfaceMappingStrategy';
import { Observable } from 'rxjs';
import { SearchEngine } from '../SearchEngine';

export abstract class AbstractSearchEngine<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  constructor(protected readonly searchEngine: SearchEngine<C, T>) {}
  /**
   * Abstract method to create a search URL based on the search text and other parameters.
   * @param searchText The text to search for.
   * @param params Additional parameters for the search.
   * @returns The constructed search URL.
   */
  protected abstract createUrl(searchText: string, ...params: any[]): string;

  /**
   * Abstract method to get the mapping strategy for the search results.
   * @returns An instance of MappingStrategy that defines how to map the search results.
   */
  protected abstract getMapping(): MappingStrategy<C, T>;

  /**
   * Method to perform a search operation.
   * @param term The search term.
   * @param page The page number for pagination.
   * @returns An Observable that emits the search results.
   */
  public search(term: string, page: number, ...params: any[]): Observable<T> {
    const mapping = this.getMapping();
    const url = this.createUrl(term, page, ...params);
    return this.searchEngine.fetchAndMapSearchResults(url, mapping);
  }
}
