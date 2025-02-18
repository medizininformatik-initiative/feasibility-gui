import { AttributeDefinitionData } from './AttributeDefinitionData';
import { DisplayData } from './DisplayData';
import { ValueDefinitionData } from './ValueDefinition';

export interface UiProfileData {
  display: DisplayData
  timeRestrictionAllowed: boolean
  attributeDefinitions: AttributeDefinitionData[]
  valueDefinition: ValueDefinitionData
}
