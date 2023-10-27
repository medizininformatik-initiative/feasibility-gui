import { AbstractAttributeFilters } from './AbstractAttributeFilters';
import { ValueDefinition } from '../../../terminology/AttributeDefinitions/AttributeDefinition';

export class ValueFilter extends AbstractAttributeFilters {
  valueDefinition: ValueDefinition = null;
}
