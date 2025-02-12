import { AttributeDefinition } from './AttributeDefinition';

export interface UiProfile {
  name: string
  timeRestrictionAllowed: boolean
  attributeDefinitions: AttributeDefinition[]
}
