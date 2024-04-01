import { QuantityUnit } from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { FilterTypes } from '../../FilterTypes';
import { TerminologyCode } from '../Terminology';

export abstract class AbstractAttributeDefinitions {
  allowedUnits?: QuantityUnit[] = [];
  display?: string;
  max: number = null;
  min: number = null;
  optional = false;
  precision: number;
  selectableConcepts: TerminologyCode[] = [];
  type: FilterTypes;
}

export enum ValueType {
  QUANTITY = 'quantity',
  CONCEPT = 'concept',
  REFERENCE = 'reference',
}
