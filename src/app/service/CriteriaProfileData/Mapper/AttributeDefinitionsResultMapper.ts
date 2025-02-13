import { AbstractAttributeDefinitionsResultMapper } from './AbstractAttributeDefinitionsResultMapper';
import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { AttributeDefinition } from 'src/app/model/FeasibilityQuery/AttributeDefinitions';

export class AttributeDefinitionsResultMapper extends AbstractAttributeDefinitionsResultMapper {
  /**
   * Maps an array of attribute definitions to AttributeDefinition instances.
   *
   * @param attributeDefinitions The array of attribute definitions.
   * @param uiProfileName The name from the UI profile to be used in each AttributeDefinition.
   * @returns An array of AttributeDefinition instances.
   */
  public mapAttributeDefinitions(attributeDefinitions: any[]): AttributeDefinitions[] {
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
  private mapSingleAttributeDefinition(attributeDefinition: any): AttributeDefinitions {
    return new AttributeDefinitions(
      attributeDefinition.display,
      attributeDefinition.type,
      attributeDefinition.optional,
      this.mapAllowedUnits(attributeDefinition.allowedUnits),
      this.createTerminologyCode(attributeDefinition.attributeCode),
      attributeDefinition.max,
      attributeDefinition.min,
      attributeDefinition.precision,
      attributeDefinition.referencedCriteriaSet || [],
      attributeDefinition.referencedValueSet || []
    );
  }

  /**
   * Creates a TerminologyCode instance from the given terminology code data.
   *
   * @param terminologyCodeData The terminology code data.
   * @returns A TerminologyCode instance.
   */
  private createTerminologyCode(terminologyCodeData: any): TerminologyCode {
    return new TerminologyCode(
      terminologyCodeData.code,
      terminologyCodeData.display,
      terminologyCodeData.system,
      terminologyCodeData.version
    );
  }
}
