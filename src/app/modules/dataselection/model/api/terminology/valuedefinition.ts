import { TerminologyCode } from './terminology';

export abstract class ValueDefinition {
  type: ValueType;

  display?: string;

  precision = 1;
  max?: number;
  min?: number;

  selectableConcepts?: TerminologyCode[];
}

export abstract class AttributeDefinition {
  type: ValueType;
  attributeCode: TerminologyCode;
  display?: string;
  optional?: boolean;

  precision = 1;
  max?: number;
  min?: number;

  selectableConcepts?: TerminologyCode[];
}

export enum ValueType {
  CONCEPT = 'concept',
}
