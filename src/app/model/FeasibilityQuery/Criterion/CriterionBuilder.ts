import { AbstractCriterion } from './AbstractCriterion';
import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { TerminologyCode } from '../../terminology/Terminology';
import { CritGroupPosition } from '../CritGroupPosition';
import { AbstractTimeRestriction } from './TimeRestriction/AbstractTimeRestriction';
import { ValueFilter } from './AttributeFilter/ValueFilter';
import { ReferenceCriterion } from './ReferenceCriterion';
import { Criterion } from './Criterion';

/**
 * Builder class for constructing instances of AbstractCriterion and its subclasses.
 */
export class CriterionBuilder {
  private attributeFilters?: Array<AttributeFilter>;
  private context?: TerminologyCode;
  private criterionHash?: string;
  private display?: string;
  private isInvalid?: boolean;
  private position?: CritGroupPosition;
  private termCodes?: Array<TerminologyCode>;
  private timeRestriction?: AbstractTimeRestriction;
  private uniqueID?: string;
  private valueFilters?: Array<ValueFilter>;

  constructor(
    private readonly mandatoryFields: {
      context: TerminologyCode
      criterionHash: string
      display: string
      isInvalid: boolean
      uniqueID: string
      termCodes: Array<TerminologyCode>
    }
  ) {}

  withAttributeFilters(attributeFilters: Array<AttributeFilter>): CriterionBuilder {
    this.attributeFilters = attributeFilters;
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

  withValueFilters(valueFilters: Array<ValueFilter>): CriterionBuilder {
    this.valueFilters = valueFilters;
    return this;
  }

  /**
   * Builds a Criterion instance using the current builder configuration.
   *
   * @returns Criterion instance.
   */
  buildCriterion(): AbstractCriterion {
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
}
