import { QuantityUnit } from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { FilterTypes } from '../../FilterTypes';
import { TerminologyCode } from '../Terminology';
import { AbstractAttributeDefinitions } from './AbstractAttributeDefinitions';

export class ValueDefinition extends AbstractAttributeDefinitions {
  constructor(
    allowedUnits: QuantityUnit[] = [],
    display: string = '',
    max: number = null,
    min: number = null,
    optional: boolean = false,
    precision: number = null,
    selectableConcepts: TerminologyCode[] = [],
    type: FilterTypes = null
  ) {
    super(allowedUnits, display, max, min, optional, precision, selectableConcepts, type);
  }
}
