import { FilterTypes } from '../FilterTypes';
import { QuantityUnit } from '../../FeasibilityQuery/QuantityUnit';
import { Display } from '../../DataSelection/Profile/DisplayData';

export abstract class AbstractAttributeDefinition {
  protected allowedUnits: Array<QuantityUnit> = [];
  protected max?: number;
  protected min?: number;
  protected optional = false;
  protected precision = 1;
  protected type: FilterTypes;
  protected referencedValueSet?: string;
  protected display: Display;

  constructor(
    display: Display,
    type: FilterTypes,
    optional: boolean = false,
    allowedUnits: Array<QuantityUnit> = [],
    max?: number,
    min?: number,
    precision: number = 1,
    referencedValueSet?: string
  ) {
    this.display = display;
    this.type = type;
    this.optional = optional;
    this.allowedUnits = allowedUnits;
    this.max = max;
    this.min = min;
    this.precision = precision;
    this.referencedValueSet = referencedValueSet;
  }

  getDisplay(): Display {
    return this.display;
  }

  setDisplay(display: Display): void {
    this.display = display;
  }

  getType(): FilterTypes {
    return this.type;
  }

  setType(type: FilterTypes): void {
    this.type = type;
  }

  getOptional(): boolean {
    return this.optional;
  }

  setOptional(optional: boolean): void {
    this.optional = optional;
  }

  getAllowedUnits(): Array<QuantityUnit> {
    return this.allowedUnits;
  }

  setAllowedUnits(allowedUnits: Array<QuantityUnit>): void {
    this.allowedUnits = allowedUnits;
  }

  getMax(): number | undefined {
    return this.max;
  }

  setMax(max: number | undefined): void {
    this.max = max;
  }

  getMin(): number | undefined {
    return this.min;
  }

  setMin(min: number | undefined): void {
    this.min = min;
  }

  getPrecision(): number {
    return this.precision;
  }

  setPrecision(precision: number): void {
    this.precision = precision;
  }

  getReferencedValueSet(): string {
    return this.referencedValueSet;
  }

  setReferencedValueSet(referencedValueSet: string): void {
    this.referencedValueSet = referencedValueSet;
  }
}
