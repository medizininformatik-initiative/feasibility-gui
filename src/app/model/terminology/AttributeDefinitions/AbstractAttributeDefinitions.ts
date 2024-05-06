import { QuantityUnit } from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { FilterTypes } from '../../FilterTypes';
import { TerminologyCode } from '../Terminology';

export abstract class AbstractAttributeDefinitions {
  private allowedUnits: QuantityUnit[] = [];
  private display?: string;
  private max: number = null;
  private min: number = null;
  private optional = false;
  private precision: number;
  private selectableConcepts: TerminologyCode[] = [];
  private type: FilterTypes;

  constructor(
    allowedUnits: QuantityUnit[] = [],
    display: string = '',
    max: number = null,
    min: number = null,
    optional: boolean = false,
    precision: number = null,
    selectableConcepts: TerminologyCode[] = [],
    type: FilterTypes
  ) {
    this.allowedUnits = allowedUnits;
    this.display = display;
    this.max = max;
    this.min = min;
    this.optional = optional;
    this.precision = precision;
    this.selectableConcepts = selectableConcepts;
    this.type = type;
  }

  /**
   * @returns QuantityUnit[]
   */
  getAllowedUnits(): QuantityUnit[] {
    return this.allowedUnits;
  }

  /**
   * @param allowedUnits
   */
  setAllowedUnits(allowedUnits: QuantityUnit[]): void {
    this.allowedUnits = allowedUnits;
  }

  /**
   * @returns string | undefined
   */
  getDisplay(): string | undefined {
    return this.display;
  }

  /**
   * @param display
   */
  setDisplay(display: string | undefined): void {
    this.display = display;
  }

  /**
   * @returns number | null
   */
  getMax(): number | null {
    return this.max;
  }

  /**
   * @param max
   */
  setMax(max: number | null): void {
    this.max = max;
  }

  /**
   * @returns number | null
   */
  getMin(): number | null {
    return this.min;
  }

  /**
   * @param min
   */
  setMin(min: number | null): void {
    this.min = min;
  }

  /**
   * @returns boolean
   */
  getIsOptional(): boolean {
    return this.optional;
  }

  /**
   * @param optional
   */
  setOptional(optional: boolean): void {
    this.optional = optional;
  }

  /**
   * @returns number | null
   */
  getPrecision(): number | null {
    return this.precision;
  }

  /**
   * @param precision
   */
  setPrecision(precision: number | null): void {
    this.precision = precision;
  }

  /**
   * @returns
   */
  getSelectableConcepts(): TerminologyCode[] {
    return this.selectableConcepts;
  }

  /**
   * @param selectableConcepts
   */
  setSelectableConcepts(selectableConcepts: TerminologyCode[]): void {
    this.selectableConcepts = selectableConcepts;
  }

  /**
   * The type of the Filter
   *
   * @see FilterTypes
   * @returns FilterTypes
   */
  getType(): FilterTypes {
    return this.type;
  }

  /**
   * @param type
   */
  setType(type: FilterTypes): void {
    this.type = type;
  }
}

export enum ValueType {
  QUANTITY = 'quantity',
  CONCEPT = 'concept',
  REFERENCE = 'reference',
}
