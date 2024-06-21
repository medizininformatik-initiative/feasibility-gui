import { ConceptFilter } from './Concept/ConceptFilter';
import { AbstractQuantityFilter } from './Quantity/AbstractQuantityFilter';
import { TerminologyCode } from '../../../terminology/Terminology';
import { ReferenceFilter } from './Concept/ReferenceFilter';
import { QuantityNotSet } from './Quantity/QuantityNotSet';
import { ValueFilter } from './ValueFilter';
import { AttributeFilter } from './AttributeFilter';

/**
 * Builder class for constructing instances of AbstractAttributeFilters and its subclasses.
 */
export class AttributeFiltersBuilder {
  private display: string;
  private optional = false;
  private concept?: ConceptFilter;
  private reference?: ReferenceFilter;
  private quantity?: AbstractQuantityFilter;
  private attributeCode?: TerminologyCode;

  constructor(display: string, optional: boolean) {
    this.display = display;
    this.optional = optional;
  }

  /**
   * Sets the concept filter.
   *
   * @param concept - Concept filter to set.
   * @returns The builder instance.
   */
  withConcept(concept: ConceptFilter): AttributeFiltersBuilder {
    this.concept = concept;
    return this;
  }

  /**
   * Sets the reference filter.
   *
   * @param reference - Reference filter to set.
   * @returns The builder instance.
   */
  withReference(reference: ReferenceFilter): AttributeFiltersBuilder {
    this.reference = reference;
    return this;
  }

  /**
   * Sets the quantity filter.
   *
   * @param quantity - Quantity filter to set.
   * @returns The builder instance.
   */
  withQuantity(quantity: AbstractQuantityFilter): AttributeFiltersBuilder {
    this.quantity = quantity;
    return this;
  }

  /**
   * Sets the attribute code for AttributeFilter.
   *
   * @param attributeCode - Attribute code to set.
   * @returns The builder instance.
   */
  withAttributeCode(attributeCode: TerminologyCode): AttributeFiltersBuilder {
    this.attributeCode = attributeCode;
    return this;
  }

  /**
   * Builds an instance of AttributeFilter based on the current builder configuration.
   *
   * @returns An instance of AttributeFilter.
   */
  buildAttributeFilter(): AttributeFilter {
    return new AttributeFilter(
      this.display,
      this.attributeCode,
      this.concept,
      this.quantity,
      this.reference,
      this.optional
    );
  }

  /**
   * Builds an instance of ValueFilter based on the current builder configuration.
   *
   * @returns An instance of ValueFilter.
   */
  buildValueFilter(): ValueFilter {
    return new ValueFilter(this.display, this.concept, this.quantity, this.optional);
  }
}
