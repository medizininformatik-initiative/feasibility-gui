import { AbstractAttributeFilters } from './AbstractAttributeFilters';
import { ConceptFilter } from './Concept/ConceptFilter';
import { AbstractQuantityFilter } from './Quantity/AbstractQuantityFilter';
import { ReferenceFilter } from './Reference/ReferenceFilter';

/**
 * Class representing a ValueFilter.
 */
export class ValueFilter extends AbstractAttributeFilters {
  /**
   * Creates an instance of ValueFilter.
   *
   * @param display - The display name for the filter.
   * @param concept - Optional concept filter.
   * @param quantity - Optional quantity filter.
   * @param optional - Whether the filter is optional or not. Default is false.
   */
  constructor(
    display: string,
    concept?: ConceptFilter,
    quantity?: AbstractQuantityFilter,
    optional: boolean = false
  ) {
    super(display, concept, quantity, undefined, optional);
  }
}
