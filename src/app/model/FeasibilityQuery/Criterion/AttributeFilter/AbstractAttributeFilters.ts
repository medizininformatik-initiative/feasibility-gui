import { AbstractQuantityFilter } from './Quantity/AbstractQuantityFilter';
import { ConceptFilter } from './Concept/ConceptFilter';
import { ReferenceFilter } from './Concept/ReferenceFilter';

export abstract class AbstractAttributeFilters {
  private display: string;
  private concept?: ConceptFilter;
  private quantity?: AbstractQuantityFilter;
  private reference?: ReferenceFilter;
  private optional = false;

  /**
   * Creates an instance of AbstractAttributeFilters.
   *
   * @param display - The display name for the filter.
   * @param concept - Optional concept filter.
   * @param quantity - Optional quantity filter.
   * @param reference - Optional reference filter.
   * @param optional - Whether the filter is optional or not. Default is false.
   */
  constructor(
    display: string,
    concept?: ConceptFilter,
    quantity?: AbstractQuantityFilter,
    reference?: ReferenceFilter,
    optional: boolean = false
  ) {
    this.display = display;
    this.concept = concept;
    this.quantity = quantity;
    this.reference = reference;
    this.optional = optional;
  }

  /**
   * Gets the display name of the filter.
   *
   * @returns The display name.
   */
  getDisplay(): string {
    return this.display;
  }

  /**
   * Sets the display name of the filter.
   *
   * @param display - The new display name.
   */
  setDisplay(display: string): void {
    this.display = display;
  }

  /**
   * Gets the concept filter if set, otherwise returns false.
   *
   * @returns The concept filter or false if not set.
   */
  getConcept(): ConceptFilter | false {
    return this.concept !== undefined ? this.concept : false;
  }

  /**
   * Sets the concept filter.
   *
   * @param concept - The concept filter to set.
   */
  setConcept(concept: ConceptFilter): void {
    this.concept = concept;
  }

  /**
   * Gets the quantity filter if set, otherwise returns false.
   *
   * @returns The quantity filter or false if not set.
   */
  getQuantity(): AbstractQuantityFilter | false {
    return this.quantity !== undefined ? this.quantity : false;
  }

  /**
   * Sets the quantity filter.
   *
   * @param quantity - The quantity filter to set.
   */
  setQuantity(quantity: AbstractQuantityFilter): void {
    this.quantity = quantity;
  }

  /**
   * Gets the reference filter if set, otherwise returns false.
   *
   * @returns The reference filter or false if not set.
   */
  getReference(): ReferenceFilter | false {
    return this.reference !== undefined ? this.reference : false;
  }

  /**
   * Sets the reference filter.
   *
   * @param reference - The reference filter to set.
   */
  setReference(reference: ReferenceFilter): void {
    this.reference = reference;
  }

  /**
   * Gets whether the filter is optional.
   *
   * @returns True if the filter is optional, false otherwise.
   */
  getOptional(): boolean {
    return this.optional;
  }

  /**
   * Sets whether the filter is optional.
   *
   * @param optional - True to make the filter optional, false otherwise.
   */
  setOptional(optional: boolean): void {
    this.optional = optional;
  }
}
