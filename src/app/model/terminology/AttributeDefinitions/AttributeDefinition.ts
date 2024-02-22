import { TerminologyCode } from '../Terminology';
import { AbstractAttributeDefinitions } from './AbstractAttributeDefinitions';

export class AttributeDefinition extends AbstractAttributeDefinitions {
  attributeCode: TerminologyCode;
  referenceCriteriaSet: string;
}
export class ValueDefinition extends AbstractAttributeDefinitions {}
