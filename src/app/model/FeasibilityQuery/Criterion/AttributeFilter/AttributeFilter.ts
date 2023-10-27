import { AttributeDefinition } from 'src/app/model/terminology/AttributeDefinitions/AttributeDefinition';
import { TerminologyCode } from '../../../terminology/Terminology';
import { Criterion } from '../Criterion';
import { AbstractAttributeFilters } from './AbstractAttributeFilters';

export class AttributeFilter extends AbstractAttributeFilters {
  attributeCode: TerminologyCode;
  criteria: Criterion[] = [];
  attributeDefinition: AttributeDefinition = null;
}
