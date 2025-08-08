import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchMediatorService } from '../Mediator/AbstractSearchMediator';
import { Observable } from 'rxjs';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *                       CLEAN 3-LAYER PAGINATION ARCHITECTURE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Layer 1: AbstractSearchPagination - Pure contract definition
 * Layer 2: SimpleSearchPagination - Single result set pagination
 * Layer 3: KeyedSearchPagination - Multi-keyed result set pagination
 *
 * This architecture provides clean separation of concerns and supports both
 * simple pagination (single result set) and complex pagination (multiple keyed result sets).
 */

/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                    LAYER 1: ABSTRACT PAGINATION CONTRACT                    │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * Pure abstract contract that defines the fundamental pagination interface.
 * This serves as the foundation for all pagination implementations.
 */
export abstract class AbstractSearchPagination<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  protected currentPage = 0;

  constructor(protected mediatorService: AbstractSearchMediatorService<C, T>) {}

  /**
   * Resets pagination state to initial values.
   */
  public resetPagination(): void {
    this.currentPage = 0;
  }

  /**
   * Core pagination method that all implementations must define.
   * Handles loading the next page of results.
   */
  public abstract loadNextPage(searchTerm: string, ...params: any[]): Observable<T>;
}
