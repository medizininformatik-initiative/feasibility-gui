import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { MappingStrategy } from '../../Interface/InterfaceMappingStrategy';
import { Observable } from 'rxjs';
import { SearchEngine } from '../../SearchEngine';
import { AbstractSearchEngine } from './AbstractSearchEngine';

export abstract class AbstractSimpleSearchEngine<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> extends AbstractSearchEngine<C, T> {
  constructor(protected readonly searchEngine: SearchEngine<C, T>) {
    super(searchEngine);
  }
  /**
   * Abstract method to create a search URL based on the search text and other parameters.
   * @param searchText The text to search for.
   * @param params Additional parameters for the search.
   * @returns The constructed search URL.
   */
  protected abstract createUrl(searchText: string, page: number): string;

  /**
   * Abstract method to get the mapping strategy for the search results.
   * @returns An instance of MappingStrategy that defines how to map the search results.
   */
  protected abstract getMapping(): MappingStrategy<C, T>;

  /**
   * Method to perform a search operation.
   * @param searchTerm The search term.
   * @param page The page number for pagination.
   * @returns An Observable that emits the search results.
   */
  public search(searchTerm: string, page: number): Observable<T> {
    const mapping = this.getMapping();
    const url = this.createUrl(searchTerm, page);
    return this.searchEngine.fetchAndMapSearchResults(url, mapping);
  }
}
