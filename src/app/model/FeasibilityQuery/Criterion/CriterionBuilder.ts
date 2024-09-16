import { AbstractAttributeFilters } from './AttributeFilter/AbstractAttributeFilters';
import { AbstractCriterion } from './AbstractCriterion';
import { AttributeDefinitions } from '../../Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { AttributeFiltersBuilder } from './AttributeFilter/AttributeFiltersBuilder';
import { Criterion } from './Criterion';
import { CritGroupPosition } from '../CritGroupPosition';
import { FilterTypes } from '../../Utilities/FilterTypes';
import { ReferenceCriterion } from './ReferenceCriterion';
import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { ValueFilter } from './AttributeFilter/ValueFilter';
import { BetweenFilter } from './TimeRestriction/BetweenFilter';
import { AbstractTimeRestriction } from './TimeRestriction/AbstractTimeRestriction';
import { AbstractAttributeDefinition } from '../../Utilities/AttributeDefinition.ts/AbstractAttributeDefinition';

/**
 * Builder class for constructing instances of AbstractCriterion and its subclasses.
 */
export class CriterionBuilder {
  private hasReference = false;
  private attributeFilters?: Array<AttributeFilter> = [];
  private context?: TerminologyCode;
  private criterionHash?: string;
  private display?: string;
  private isInvalid?: boolean;
  private parentId: string;
  private position?: CritGroupPosition;
  private termCodes?: Array<TerminologyCode>;
  private timeRestriction?: AbstractTimeRestriction;
  private uniqueID?: string;
  private valueFilters?: Array<ValueFilter> = [];

  constructor(
    private readonly mandatoryFields: {
      isReference: boolean
      context: TerminologyCode
      criterionHash: string
      display: string
      isInvalid: boolean
      uniqueID: string
      termCodes: Array<TerminologyCode>
    }
  ) {
    this.context = mandatoryFields.context;
    this.criterionHash = mandatoryFields.criterionHash;
    this.display = mandatoryFields.display;
    this.isInvalid = mandatoryFields.isInvalid;
    this.uniqueID = mandatoryFields.uniqueID;
    this.termCodes = mandatoryFields.termCodes;
  }

  withAttributeFilters(attributeFilters: Array<AttributeFilter>): CriterionBuilder {
    this.attributeFilters = attributeFilters;
    return this;
  }

  withAttributeFilter(attributeFilter: AttributeFilter): CriterionBuilder {
    if (this.attributeFilters.length > 0) {
      const index = this.attributeFilters.findIndex(
        (existingAttributeFilter) =>
          attributeFilter.getAttributeCode()?.getCode() ===
          existingAttributeFilter.getAttributeCode()?.getCode()
      );
      if (index !== -1) {
        this.attributeFilters[index] = attributeFilter;
      } else {
        this.attributeFilters.push(attributeFilter);
      }
    } else {
      this.attributeFilters.push(attributeFilter);
    }
    return this;
  }

  withContext(context: TerminologyCode): CriterionBuilder {
    this.context = context;
    return this;
  }

  withCriterionHash(criterionHash: string): CriterionBuilder {
    this.criterionHash = criterionHash;
    return this;
  }

  withDisplay(display: string): CriterionBuilder {
    this.display = display;
    return this;
  }

  withIsInvalid(isInvalid: boolean): CriterionBuilder {
    this.isInvalid = isInvalid;
    return this;
  }

  withPosition(position: CritGroupPosition): CriterionBuilder {
    this.position = position;
    return this;
  }

  withTermCodes(termCodes: Array<TerminologyCode>): CriterionBuilder {
    this.termCodes = termCodes;
    return this;
  }

  withTimeRestriction(timeRestriction: AbstractTimeRestriction): CriterionBuilder {
    this.timeRestriction = timeRestriction;
    return this;
  }

  withUniqueID(uniqueID: string): CriterionBuilder {
    this.uniqueID = uniqueID;
    return this;
  }

  withValueFilters(valueFilters: ValueFilter[]): CriterionBuilder {
    if (this.valueFilters.length === 0) {
      this.valueFilters.push(...valueFilters);
    } else {
      this.valueFilters = valueFilters;
    }

    return this;
  }

  withHasReference(hasReference: boolean): CriterionBuilder {
    this.hasReference = hasReference;
    return this;
  }

  withParentId(id: string): CriterionBuilder {
    this.parentId = id;
    return this;
  }

  /**
   * Builds a Criterion instance using the current builder configuration.
   *
   * @returns Criterion instance.
   */
  buildCriterion(): Criterion {
    return new Criterion(
      false,
      this.attributeFilters,
      this.context,
      this.criterionHash,
      this.display,
      this.isInvalid,
      this.position,
      this.termCodes,
      this.timeRestriction,
      this.uniqueID,
      this.valueFilters
    );
  }

  /**
   * Builds a ReferenceCriterion instance using the current builder configuration.
   *
   * @returns ReferenceCriterion instance.
   */
  buildReferenceCriterion(): ReferenceCriterion {
    return new ReferenceCriterion(
      this.parentId,
      true,
      this.attributeFilters,
      this.context,
      this.criterionHash,
      this.display,
      this.isInvalid,
      this.position,
      this.termCodes,
      this.timeRestriction,
      this.uniqueID,
      this.valueFilters
    );
  }

  /**
   * Builds an instance of AttributeFilter using the AttributeFiltersBuilder.
   *
   * @param display - The display name for the filter.
   * @param attributeCode - The attribute code.
   * @param filterType - The filter type.
   * @param filterParams - The parameters required to create the specific filter.
   * @returns The created AttributeFilter instance.
   */
  buildAttributeFilter(
    display: string,
    filterType: FilterTypes,
    filterParams: AbstractAttributeDefinition,
    attributeCode?: TerminologyCode
  ): AbstractAttributeFilters {
    const attributeFilterBuilder = new AttributeFiltersBuilder(
      display,
      filterParams.getOptional(),
      filterType
    );

    switch (filterType) {
      case FilterTypes.CONCEPT:
        attributeFilterBuilder.withConcept(
          attributeFilterBuilder.buildConceptFilter(filterParams.getReferencedValueSet())
        );
        break;
      case FilterTypes.QUANTITY:
      case FilterTypes.QUANTITY_COMPARATOR:
      case FilterTypes.QUANTITY_RANGE:
        attributeFilterBuilder.withQuantity(
          attributeFilterBuilder.buildQuantityFilter(
            filterParams.getAllowedUnits(),
            filterParams.getPrecision()
          )
        );
        break;
      case FilterTypes.REFERENCE:
        const attributeDefinition = filterParams as AttributeDefinitions;
        attributeFilterBuilder.withReference(
          attributeFilterBuilder.buildReferenceFilter(attributeDefinition.getReferenceCriteriaSet())
        );
        break;
      default:
        throw new Error(`Unsupported filter type: ${filterType}`);
    }
    this.buildTimeRestriction();
    return attributeFilterBuilder.withAttributeCode(attributeCode).buildAttributeFilter();
  }

  buildTimeRestriction() {
    const today = new Date();
    const dateOnly = today.toISOString().split('T')[0];
    return new BetweenFilter(null, null);
  }
}
