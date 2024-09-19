import { QuantityUnit } from '../../FeasibilityQuery/QuantityUnit';
import { FilterTypes } from '../FilterTypes';
import { AbstractAttributeDefinition } from './AbstractAttributeDefinition';

export class ValueDefinition extends AbstractAttributeDefinition {
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
    super(name, type, optional, allowedUnits, max, min, precision, referencedValueSet);
  }
}
