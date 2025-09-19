import { AbstractAttributeDefinition } from './AbstractAttributeDefinition';
import { Display } from '../../DataSelection/Profile/Display';
import { FilterTypes } from '../FilterTypes';
import { QuantityUnit } from '../../FeasibilityQuery/QuantityUnit';

export class ValueDefinition extends AbstractAttributeDefinition {
  constructor(
    display: Display,
    type: FilterTypes,
    optional: boolean = false,
    allowedUnits: Array<QuantityUnit> = [],
    max?: number,
    min?: number,
    precision: number = 1,
    referencedValueSet?: string[]
  ) {
    super(display, type, optional, allowedUnits, max, min, precision, referencedValueSet);
  }
}
