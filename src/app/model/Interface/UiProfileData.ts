import { AttributeDefinitionData } from './AttributeDefinitionData';
import { ValueDefinitionData } from './ValueDefinition';

/**
 * Interface representing the UI profile data structure.
 * @interface UiProfileData
 */
export interface UiProfileData {
  /**
   * The name of the UI profile.
   * @type {string}
   */
  readonly name: string

  /**
   * Indicates whether time restrictions are allowed in the UI profile.
   * @type {boolean}
   */
  readonly timeRestrictionAllowed: boolean

  /**
   * The attribute definitions for the UI profile.
   * @type {AttributeDefinitionData[]}
   */
  readonly attributeDefinitions: AttributeDefinitionData[]

  /**
   * The value definition for the UI profile.
   * @type {ValueDefinitionData}
   */
  readonly valueDefinition: ValueDefinitionData
}
