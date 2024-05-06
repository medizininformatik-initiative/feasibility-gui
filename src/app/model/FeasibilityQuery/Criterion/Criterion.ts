import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { CritGroupPosition } from '../../../modules/querybuilder/controller/CritGroupArranger';
import { TerminologyCode } from '../../terminology/Terminology';
import { TimeRestriction } from '../TimeRestriction';
import { ValueFilter } from './AttributeFilter/ValueFilter';
import { TerminologyEntry } from '../../terminology/TerminologyEntry';

/**
 *  A Criterion is an atomic building block of a query. However, a Criterion itself is defined by
 *  a terminology code (system + version + code), operators and values.
 */
export class Criterion {
  attributeFilters?: Array<AttributeFilter> = [];
  children?: Array<TerminologyEntry> = [];
  criterionHash?: string;
  context?: TerminologyCode;
  display?: string;
  entity?: boolean = false;
  isInvalid?: boolean = false;
  isLinked?: boolean = false;
  linkedCriteria: Criterion[] = [];
  optional?: boolean = false;
  position?: CritGroupPosition;
  uniqueID?: string;
  termCodes?: Array<TerminologyCode> = [];
  timeRestriction?: TimeRestriction;
  valueFilters?: Array<ValueFilter> = [];

  /**
   *
   * @param attributeFilters
   * @param children
   * @param criterionHash
   * @param context
   * @param display
   * @param entity
   * @param isInvalid
   * @param isLinked
   * @param linkedCriteria
   * @param optional
   * @param position
   * @param uniqueID
   * @param termCodes
   * @param timeRestriction
   * @param valueFilters
   */
  constructor(
    attributeFilters: Array<AttributeFilter> = [],
    children: Array<TerminologyEntry> = [],
    criterionHash: string = '',
    context: TerminologyCode,
    display: string = '',
    entity: boolean = false,
    isInvalid: boolean = false,
    isLinked: boolean = false,
    linkedCriteria: Criterion[] = [],
    optional: boolean = false,
    position: CritGroupPosition = new CritGroupPosition(),
    uniqueID: string = '',
    termCodes: Array<TerminologyCode> = [],
    timeRestriction: TimeRestriction = new TimeRestriction(),
    valueFilters: Array<ValueFilter> = []
  ) {
    this.setAttributeFilters(attributeFilters);
    this.setChildren(children);
    this.setCriterionHash(criterionHash);
    this.setContext(context);
    this.setDisplay(display);
    this.setEntity(entity);
    this.setIsInvalid(isInvalid);
    this.setIsLinked(isLinked);
    this.setLinkedCriteria(linkedCriteria);
    this.setOptional(optional);
    this.setPosition(position);
    this.setUniqueID(uniqueID);
    this.setTermCodes(termCodes);
    this.setTimeRestriction(timeRestriction);
    this.setValueFilters(valueFilters);
  }

  /**
   * Set new attributeFilters
   */
  public setAttributeFilters(attributeFilters: AttributeFilter[]) {
    this.attributeFilters = attributeFilters;
  }

  /**
   * Get all AttributFilter
   *
   * @returns AttributeFilter[]
   */
  public getAttributeFilter(): AttributeFilter[] {
    return this.attributeFilters;
  }

  /**
   * Set new context
   *
   * @param context
   */
  public setContext(context: TerminologyCode) {
    this.context = context;
  }

  /**
   * Get the context value
   *
   * @returns
   */
  public getContext() {
    return this.context;
  }

  /**
   * Set new value for display
   *
   * @param display
   */
  public setDisplay(display: string) {
    this.display = display;
  }

  /**
   * Get the display value
   *
   * @returns string
   */
  public getDisplay(): string {
    return this.display;
  }

  /**
   * Set new value for entity
   *
   * @param entity
   */
  public setEntity(entity: boolean) {
    this.entity = entity;
  }

  /**
   * Get the entity value
   *
   * @returns boolean
   */
  public getEntity(): boolean {
    return this.entity;
  }

  /**
   * Set new value for isInvalid
   *
   * @param isInvalid
   */
  public setIsInvalid(isInvalid: boolean) {
    this.isInvalid = isInvalid;
  }

  /**
   * Get the isInvalid value
   *
   * @returns boolean
   */
  public getIsInvalid(): boolean {
    return this.isInvalid;
  }

  /**
   * Set new value for isLinked
   *
   * @param isLinked
   */
  public setIsLinked(isLinked: boolean) {
    this.isLinked = isLinked;
  }

  /**
   * Get the isLinked value
   *
   * @returns boolean
   */
  public getIsLinked(): boolean {
    return this.isLinked;
  }

  /**
   * Set new value for optional
   *
   * @param optional
   */
  public setOptional(optional: boolean) {
    this.optional = optional;
  }

  /**
   * Get the optional value
   *
   * @returns boolean
   */
  public getOptional(): boolean {
    return this.optional;
  }

  /**
   * Set new value for uniqueID
   *
   * @param uniqueID
   */
  public setUniqueID(uniqueID: string) {
    this.uniqueID = uniqueID;
  }

  /**
   * Get the uniqueID value
   *
   * @returns string
   */
  public getUniqueID(): string {
    return this.uniqueID;
  }

  /**
   * Set new value for children
   *
   * @param children
   */
  public setChildren(children: Array<TerminologyEntry>) {
    this.children = children;
  }

  /**
   * Get the children value
   *
   * @returns Array<TerminologyEntry>
   */
  public getChildren(): Array<TerminologyEntry> {
    return this.children;
  }

  /**
   * Set new value for criterionHash
   *
   * @param criterionHash
   */
  public setCriterionHash(criterionHash: string) {
    this.criterionHash = criterionHash;
  }

  /**
   * Get the criterionHash value
   *
   * @returns string
   */
  public getCriterionHash(): string {
    return this.criterionHash;
  }

  /**
   * Set new value for linkedCriteria
   *
   * @param linkedCriteria
   */
  public setLinkedCriteria(linkedCriteria: Criterion[]) {
    this.linkedCriteria = linkedCriteria;
  }

  /**
   * Get the linkedCriteria value
   *
   * @returns Criterion[]
   */
  public getLinkedCriteria(): Criterion[] {
    return this.linkedCriteria;
  }

  /**
   * Set new value for termCodes
   *
   * @param termCodes
   */
  public setTermCodes(termCodes: Array<TerminologyCode>) {
    this.termCodes = termCodes;
  }

  /**
   * Get the termCodes value
   *
   * @returns Array<TerminologyCode>
   */
  public getTermCodes(): Array<TerminologyCode> {
    return this.termCodes;
  }

  /**
   * Set new value for timeRestriction
   *
   * @param timeRestriction
   */
  public setTimeRestriction(timeRestriction: TimeRestriction) {
    this.timeRestriction = timeRestriction;
  }

  /**
   * Get the timeRestriction value
   *
   * @returns TimeRestriction
   */
  public getTimeRestriction(): TimeRestriction {
    return this.timeRestriction;
  }

  /**
   * Set new value for valueFilters
   *
   * @param valueFilters
   */
  public setValueFilters(valueFilters: Array<ValueFilter>) {
    this.valueFilters = valueFilters;
  }

  /**
   * Get the valueFilters value
   *
   * @returns Array<ValueFilter>
   */
  public getValueFilters(): Array<ValueFilter> {
    return this.valueFilters;
  }

  /**
   * Set new value for position
   *
   * @param position
   */
  public setPosition(position: CritGroupPosition) {
    this.position = position;
  }

  /**
   * Get the position value
   *
   * @returns CritGroupPosition
   */
  public getPosition(): CritGroupPosition {
    return this.position;
  }
}
