import { AbstractAttributeDefinitionsResultMapper } from './AbstractAttributeDefinitionsResultMapper';
import { AttributeDefinitionData } from 'src/app/model/Interface/AttributeDefinitionData';
import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class AttributeDefinitionsResultMapper extends AbstractAttributeDefinitionsResultMapper {
  /**
   * Maps an array of attribute definitions to AttributeDefinition instances.
   *
   * @param attributeDefinitions The array of attribute definitions.
   * @param uiProfileName The name from the UI profile to be used in each AttributeDefinition.
   * @returns An array of AttributeDefinition instances.
   */
  public mapAttributeDefinitions(
    attributeDefinitions: AttributeDefinitionData[]
  ): AttributeDefinitions[] {
    if (!attributeDefinitions || attributeDefinitions.length === 0) {
      return [];
    }

    return attributeDefinitions.map((attributeDefinition) =>
      this.mapSingleAttributeDefinition(attributeDefinition)
    );
  }

  /**
   * Maps a single attribute definition to an AttributeDefinition instance.
   *
   * @param attributeDefinition The single attribute definition.
   * @param uiProfileName The name from the UI profile to be used in the AttributeDefinition.
   * @returns An AttributeDefinition instance.
   */
  private mapSingleAttributeDefinition(
    attributeDefinition: AttributeDefinitionData
  ): AttributeDefinitions {
    return new AttributeDefinitions(
      Display.fromJson(attributeDefinition.display),
      attributeDefinition.type,
      attributeDefinition.optional,
      this.mapAllowedUnits(attributeDefinition.allowedUnits),
      TerminologyCode.fromJson(attributeDefinition.attributeCode),
      attributeDefinition.max,
      attributeDefinition.min,
      attributeDefinition.precision,
      attributeDefinition.referencedCriteriaSet,
      attributeDefinition.referencedValueSet
    );
  }
}
