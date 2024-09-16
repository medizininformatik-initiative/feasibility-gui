import { FilterTypes } from '../FilterTypes';
import { QuantityUnit } from '../../FeasibilityQuery/QuantityUnit';

export abstract class AbstractAttributeDefinition {
  protected allowedUnits: Array<QuantityUnit> = [];
  protected max?: number;
  protected min?: number;
  protected optional = false;
  protected precision = 1;
  protected type: FilterTypes;
  protected referencedValueSet?: Array<string>;
  protected name: string;

  constructor(
    name: string,
    type: FilterTypes,
    optional: boolean = false,
    allowedUnits: Array<QuantityUnit> = [],
    max?: number,
    min?: number,
    precision: number = 1,
    referencedValueSet?: string[]
  ) {
    this.name = name;
    this.type = type;
    this.optional = optional;
    this.allowedUnits = allowedUnits;
    this.max = max;
    this.min = min;
    this.precision = precision;
    this.referencedValueSet = referencedValueSet;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
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

  getReferencedValueSet(): string[] {
    return this.referencedValueSet;
  }

  setReferencedValueSet(referencedValueSet: string[]): void {
    this.referencedValueSet = referencedValueSet;
  }
}
