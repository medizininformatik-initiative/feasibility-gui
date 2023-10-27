import { AttributeDefinition, ValueDefinition } from './AttributeDefinitions/AttributeDefinition';

export class UIProfile {
  attributeDefinitions: AttributeDefinition[] = [];
  name: string;
  timeRestrictionAllowed = true;
  valueDefinition: ValueDefinition | null;
}
