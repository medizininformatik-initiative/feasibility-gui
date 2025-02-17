import { AbstractAttributeDefinitionsResultMapper } from './AbstractAttributeDefinitionsResultMapper';
import { ValueDefinition } from 'src/app/model/Utilities/AttributeDefinition.ts/ValueDefnition';

export class ValueDefinitionsResultMapper extends AbstractAttributeDefinitionsResultMapper {
  /**
   * Maps the value definition from the UI profile to ValueDefinition instances.
   *
   * @param uiProfile The UI profile data containing value definition.
   * @returns An array of ValueDefinition instances.
   */
  public mapValueDefinition(uiProfile: any): ValueDefinition[] {
    if (uiProfile.valueDefinition) {
      return [
        new ValueDefinition(
          uiProfile.valueDefinition.display,
          uiProfile.valueDefinition.type,
          uiProfile.valueDefinition.optional,
          this.mapAllowedUnits(uiProfile.valueDefinition.allowedUnits),
          uiProfile.valueDefinition.max,
          uiProfile.valueDefinition.min,
          uiProfile.valueDefinition.precision,
          uiProfile.valueDefinition.referencedValueSet || []
        ),
      ];
    }
    return [];
  }
}
