import { FilterTypes } from 'src/app/model/FilterTypes';
import { TerminologyCode } from '../../../terminology/Terminology';

export abstract class AbstractAttributeFilters {
  private allowedUnits: QuantityUnit[] = [];
  private display?: string;
  private max: number | null = null;
  private min: number | null = null;
  private optional = false;
  private precision: number | null = null;
  private selectableConcepts: TerminologyCode[] = [];
  private type: FilterTypes;
  private value: number | null = null;
  private comparator: Comparator = Comparator.NONE;
  private minValue: number | null = null;
  private maxValue: number | null = null;
  private selectedConcepts: TerminologyCode[] = [];
  private unit?: QuantityUnit = null;

  constructor(
    allowedUnits: QuantityUnit[] = [],
    display: string = '',
    max: number | null = null,
    min: number | null = null,
    optional: boolean = false,
    precision: number | null = null,
    selectableConcepts: TerminologyCode[] = [],
    type: FilterTypes = FilterTypes.QUANTITY_NOT_SET,
    value: number | null = null,
    comparator: Comparator = Comparator.NONE,
    minValue: number | null = null,
    maxValue: number | null = null,
    selectedConcepts: TerminologyCode[] = []
  ) {
    this.allowedUnits = allowedUnits;
    this.display = display;
    this.max = max;
    this.min = min;
    this.optional = optional;
    this.precision = precision;
    this.selectableConcepts = selectableConcepts;
    this.type = type;
    this.value = value;
    this.comparator = comparator;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.selectedConcepts = selectedConcepts;
  }

  // Custom Getter and Setter for allowedUnits
  getAllowedUnits(): QuantityUnit[] {
    return this.allowedUnits;
  }

  setAllowedUnits(allowedUnits: QuantityUnit[]): void {
    this.allowedUnits = allowedUnits;
  }

  // Custom Getter and Setter for display
  getDisplay(): string | undefined {
    return this.display;
  }

  setDisplay(display: string | undefined): void {
    this.display = display;
  }

  // Custom Getter and Setter for max
  getMax(): number | null {
    return this.max;
  }

  setMax(max: number | null): void {
    this.max = max;
  }

  // Custom Getter and Setter for min
  getMin(): number | null {
    return this.min;
  }

  setMin(min: number | null): void {
    this.min = min;
  }

  // Custom Getter and Setter for optional
  isOptional(): boolean {
    return this.optional;
  }

  setOptional(optional: boolean): void {
    this.optional = optional;
  }

  // Custom Getter and Setter for precision
  getPrecision(): number | null {
    return this.precision;
  }

  setPrecision(precision: number | null): void {
    this.precision = precision;
  }

  // Custom Getter and Setter for selectableConcepts
  getSelectableConcepts(): TerminologyCode[] {
    return this.selectableConcepts;
  }

  setSelectableConcepts(selectableConcepts: TerminologyCode[]): void {
    this.selectableConcepts = selectableConcepts;
  }

  /**
   * @see FilterTypes
   * @returns type
   */
  getType(): FilterTypes {
    return this.type;
  }

  setType(type: FilterTypes): void {
    this.type = type;
  }

  // Custom Getter and Setter for value
  getValue(): number | null {
    return this.value;
  }

  setValue(value: number | null): void {
    this.value = value;
  }

  /**
   * @returns comparator
   */
  getComparator(): Comparator {
    return this.comparator;
  }

  setComparator(comparator: Comparator): void {
    this.comparator = comparator;
  }

  // Custom Getter and Setter for minValue
  getMinValue(): number | null {
    return this.minValue;
  }

  setMinValue(minValue: number | null): void {
    this.minValue = minValue;
  }

  // Custom Getter and Setter for maxValue
  getMaxValue(): number | null {
    return this.maxValue;
  }

  setMaxValue(maxValue: number | null): void {
    this.maxValue = maxValue;
  }

  // Custom Getter and Setter for selectedConcepts
  getSelectedConcepts(): TerminologyCode[] {
    return this.selectedConcepts;
  }

  setSelectedConcepts(selectedConcepts: TerminologyCode[]): void {
    this.selectedConcepts = selectedConcepts;
  }

  /**
   * @returns unit
   */
  public getUnit(): QuantityUnit {
    return this.unit;
  }

  /**
   * @param unit
   */
  public setUnit(unit: QuantityUnit) {
    this.unit = unit;
  }
}

export class QuantityUnit {
  // UCUM
  private code = '';
  private display = '';

  constructor(code: string = '', display: string = '') {
    this.code = code;
    this.display = display;
  }

  /**
   * @param code
   */
  public setCode(code: string) {
    this.code = code;
  }

  /**
   * @returns code
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * @param display
   */
  public setDisplay(display: string) {
    this.display = display;
  }

  /**
   * @returns
   */
  public getDisplay(): string {
    return this.display;
  }
}

export enum Comparator {
  NONE = 'none',
  EQUAL = 'eq',
  BETWEEN = 'bw',
  NOT_EQUAL = 'ne',
  LESS_OR_EQUAL = 'le',
  LESS_THAN = 'lt',
  GREATER_OR_EQUAL = 'ge',
  GREATER_THAN = 'gt',
}

/**
 * @todo new OperatorOptions value timerestriction --> needs to be tested
 */
export enum OperatorOptions {
  CONCEPT = 'concept', // e.g. "weiblich, männlich"
  QUANTITY_COMPARATOR = 'quantity-comparator', // e.g. "< 27.10.2020"
  QUANTITY_NOT_SET = '',
  QUANTITY_RANGE = 'quantity-range', // e.g. ">= 27 and <= 30"
  REFERENCE = 'reference',
  TIMERESTRICTION = 'time-restriction',
}
