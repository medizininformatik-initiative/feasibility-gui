import { AbstractTimeRestriction } from './TimeRestriction/AbstractTimeRestriction';
import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { CritGroupPosition } from '../CritGroupPosition';
import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { ValueFilter } from './AttributeFilter/ValueFilter';

/**
 * Abstract class representing a criterion with various filters and properties.
 */
export abstract class AbstractCriterion {
  private attributeFilters?: Array<AttributeFilter> = [];
  private context?: TerminologyCode;
  private criterionHash?: string;
  private display?: string;
  private isInvalid?: boolean = false;
  private position?: CritGroupPosition;
  private termCodes?: Array<TerminologyCode> = [];
  private timeRestriction?: AbstractTimeRestriction;
  private uniqueID?: string;
  private valueFilters?: Array<ValueFilter> = [];
  private hasReference = false;

  /**
   * Constructor for AbstractCriterion.
   *
   * @param attributeFilters - Array of AttributeFilter objects.
   * @param criterionHash - Hash string for the criterion.
   * @param context - TerminologyCode object representing the context.
   * @param display - Display string for the criterion.
   * @param isInvalid - Boolean flag indicating if the criterion is invalid.
   * @param position - CritGroupPosition object representing the position.
   * @param uniqueID - Unique identifier for the criterion.
   * @param termCodes - Array of TerminologyCode objects.
   * @param timeRestriction - AbstractTimeRestriction object.
   * @param valueFilters - Array of ValueFilter objects.
   */
  constructor(
    hasReference: boolean,
    attributeFilters?: Array<AttributeFilter>,
    context?: TerminologyCode,
    criterionHash?: string,
    display?: string,
    isInvalid?: boolean,
    position?: CritGroupPosition,
    termCodes?: Array<TerminologyCode>,
    timeRestriction?: AbstractTimeRestriction,
    uniqueID?: string,
    valueFilters?: Array<ValueFilter>
  ) {
    this.attributeFilters = attributeFilters;
    this.context = context;
    this.criterionHash = criterionHash;
    this.display = display;
    this.isInvalid = isInvalid;
    this.hasReference = hasReference;
    this.position = position;
    this.termCodes = termCodes;
    this.timeRestriction = timeRestriction;
    this.uniqueID = uniqueID;
    this.valueFilters = valueFilters;
  }

  /**
   *
   * @param hasRefrence
   */
  setHasReference(hasReference: boolean) {
    this.hasReference = hasReference;
  }

  /**
   *
   * @returns
   */
  getHasReference(): boolean {
    return this.hasReference;
  }

  /**
   * Gets the attribute filters.
   *
   * @returns Array of AttributeFilter objects or false if attributeFilters is undefined.
   */
  isAttributeFiltersSet(): boolean {
    if (this.attributeFilters === undefined) {
      return false;
    }
    return true;
  }

  getAttributeFilters(): Array<AttributeFilter> {
    if (this.attributeFilters === undefined) {
      return [];
    }
    return this.attributeFilters;
  }

  /**
   * Sets the attribute filters.
   *
   * @param attributeFilters - Array of AttributeFilter objects.
   */
  setAttributeFilters(attributeFilters: Array<AttributeFilter>): void {
    this.attributeFilters = attributeFilters;
  }

  /**
   * Gets the context.
   *
   * @returns TerminologyCode object representing the context.
   */
  getContext(): TerminologyCode | undefined {
    return this.context;
  }

  /**
   * Sets the context.
   *
   * @param context - TerminologyCode object representing the context.
   */
  setContext(context: TerminologyCode): void {
    this.context = context;
  }

  /**
   * Gets the criterion hash.
   *
   * @returns Hash string for the criterion.
   */
  getCriterionHash(): string | undefined {
    return this.criterionHash;
  }

  /**
   * Sets the criterion hash.
   *
   * @param criterionHash - Hash string for the criterion.
   */
  setCriterionHash(criterionHash: string): void {
    this.criterionHash = criterionHash;
  }

  /**
   * Gets the display string.
   *
   * @returns Display string for the criterion.
   */
  getDisplay(): string | undefined {
    return this.display;
  }

  /**
   * Sets the display string.
   *
   * @param display - Display string for the criterion.
   */
  setDisplay(display: string): void {
    this.display = display;
  }

  /**
   * Gets the invalid flag.
   *
   * @returns Boolean flag indicating if the criterion is invalid.
   */
  getIsInvalid(): boolean | undefined {
    return this.isInvalid;
  }

  /**
   * Sets the invalid flag.
   *
   * @param isInvalid - Boolean flag indicating if the criterion is invalid.
   */
  setIsInvalid(isInvalid: boolean): void {
    this.isInvalid = isInvalid;
  }

  /**
   * Gets the position.
   *
   * @returns CritGroupPosition object representing the position.
   */
  getPosition(): CritGroupPosition | undefined {
    return this.position;
  }

  /**
   * Sets the position.
   *
   * @param position - CritGroupPosition object representing the position.
   */
  setPosition(position: CritGroupPosition): void {
    this.position = position;
  }

  /**
   * Gets the term codes.
   *
   * @returns Array of TerminologyCode objects.
   */
  getTermCodes(): Array<TerminologyCode> | undefined {
    return this.termCodes;
  }

  /**
   * Sets the term codes.
   *
   * @param termCodes - Array of TerminologyCode objects.
   */
  setTermCodes(termCodes: Array<TerminologyCode>): void {
    this.termCodes = termCodes;
  }

  /**
   * Gets the time restriction.
   *
   * @returns AbstractTimeRestriction object.
   */
  getTimeRestriction(): AbstractTimeRestriction | undefined {
    return this.timeRestriction;
  }

  /**
   * Sets the time restriction.
   *
   * @param timeRestriction - AbstractTimeRestriction object.
   */
  setTimeRestriction(timeRestriction: AbstractTimeRestriction): void {
    this.timeRestriction = timeRestriction;
  }

  /**
   * Gets the unique ID.
   *
   * @returns Unique identifier for the criterion.
   */
  getUniqueID(): string | undefined {
    return this.uniqueID;
  }

  /**
   * Sets the unique ID.
   *
   * @param uniqueID - Unique identifier for the criterion.
   */
  setUniqueID(uniqueID: string): void {
    this.uniqueID = uniqueID;
  }

  /**
   * Gets the value filters.
   *
   * @returns Array of ValueFilter objects or false if valueFilters is undefined.
   */
  getValueFilters(): Array<ValueFilter> {
    return this.valueFilters;
  }

  /**
   * Sets the value filters.
   *
   * @param valueFilters - Array of ValueFilter objects.
   */
  setValueFilters(valueFilters: Array<ValueFilter>): void {
    this.valueFilters = valueFilters;
  }
}
