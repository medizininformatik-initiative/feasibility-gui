import { AttributeDefinition } from './AttributeDefinition';
import { DisplayData } from './DisplayData';
import { ValueDefinitionData } from './ValueDefinition';

export interface UiProfileData {
  display: DisplayData
  timeRestrictionAllowed: boolean
  attributeDefinitions: AttributeDefinition[]
  valueDefinition: ValueDefinitionData
}
