import { AbstractCriterion } from './AbstractCriterion';
import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { CritGroupPosition } from '../CritGroupPosition';
import { AbstractTimeRestriction } from './TimeRestriction/AbstractTimeRestriction';
import { ValueFilter } from './AttributeFilter/ValueFilter';
import { ReferenceCriterion } from './ReferenceCriterion';
import { Criterion } from './Criterion';
import { AttributeFiltersBuilder } from './AttributeFilter/AttributeFiltersBuilder';
import { FilterTypes } from '../../FilterTypes';
import { AbstractAttributeFilters } from './AttributeFilter/AbstractAttributeFilters';
import { AttributeDefinitions } from '../../AttributeDefinitions';
import { TimeRestriction } from '../TimeRestriction';
import { BetweenFilter } from './TimeRestriction/BetweenFilter';

/**
 * Builder class for constructing instances of AbstractCriterion and its subclasses.
 */
export class CriterionBuilder {
  private attributeFilters?: Array<AttributeFilter> = [];
  private context?: TerminologyCode;
  private criterionHash?: string;
  private display?: string;
  private isInvalid?: boolean;
  private position?: CritGroupPosition;
  private termCodes?: Array<TerminologyCode>;
  private timeRestriction?: AbstractTimeRestriction;
  private uniqueID?: string;
  private valueFilters?: Array<ValueFilter> = [];

  constructor(
    private readonly mandatoryFields: {
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
    this.attributeFilters.push(attributeFilter);
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

  withValueFilters(valueFilters: ValueFilter): CriterionBuilder {
    this.valueFilters.push(valueFilters);
    return this;
  }

  /**
   * Builds a Criterion instance using the current builder configuration.
   *
   * @returns Criterion instance.
   */
  buildCriterion(): Criterion {
    return new Criterion(
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
  buildReferenceCriterion(): AbstractCriterion {
    return new ReferenceCriterion(
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
    attributeCode: TerminologyCode,
    filterType: FilterTypes,
    filterParams: AttributeDefinitions
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
        attributeFilterBuilder.withReference(
          attributeFilterBuilder.buildReferenceFilter([filterParams.getReferenceCriteriaSet()])
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
