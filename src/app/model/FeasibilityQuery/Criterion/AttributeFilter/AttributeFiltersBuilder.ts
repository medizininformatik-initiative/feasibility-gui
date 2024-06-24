import { AbstractQuantityFilter } from './Quantity/AbstractQuantityFilter';
import { AttributeFilter } from './AttributeFilter';
import { ConceptFilter } from './Concept/ConceptFilter';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { QuantityNotSet } from './Quantity/QuantityNotSet';
import { QuantityUnit } from '../../../QuantityUnit';
import { ReferenceCriterion } from '../ReferenceCriterion';
import { ReferenceFilter } from './Concept/ReferenceFilter';
import { TerminologyCode } from '../../../Terminology/TerminologyCode';
import { ValueFilter } from './ValueFilter';

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
  private filterType: FilterTypes;

  constructor(display: string, optional: boolean, filterType: FilterTypes) {
    this.display = display;
    this.optional = optional;
    this.filterType = filterType;
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
      this.filterType,
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
    return new ValueFilter(
      this.display,
      this.filterType,
      this.concept,
      this.quantity,
      this.optional
    );
  }

  /**
   * Builds an instance of QuantityNotSet based on the current builder configuration.
   *
   * @returns An instance of QuantityFilter.
   */
  buildQuantityFilter(
    allowedUnits?: QuantityUnit[],
    precision?: number,
    selectedUnit?: QuantityUnit
  ): QuantityNotSet {
    return new QuantityNotSet(selectedUnit, allowedUnits, precision);
  }

  buildConceptFilter(
    allowedConceptUri,
    selectedConcepts: TerminologyCode[] = [],
    allowedConcepts?: TerminologyCode[]
  ) {
    return new ConceptFilter(allowedConceptUri, selectedConcepts, allowedConcepts);
  }

  /**
   * Builds an instance of ReferenceFilter based on the current builder configuration.
   *
   * @returns An instance of ReferenceFilter.
   */
  buildReferenceFilter(
    allowedReferenceUri: Array<string>,
    selectedReference: ReferenceCriterion[] = [],
    selectedConcepts: TerminologyCode[] = [],
    allowedConcepts: TerminologyCode[] = []
  ): ReferenceFilter {
    return new ReferenceFilter(
      allowedReferenceUri,
      selectedReference,
      selectedConcepts,
      allowedConcepts
    );
  }
}
