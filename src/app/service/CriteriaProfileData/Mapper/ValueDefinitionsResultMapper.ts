import { AbstractAttributeDefinitionsResultMapper } from './AbstractAttributeDefinitionsResultMapper';
import { UiProfileData } from 'src/app/model/Interface/UiProfileData';
import { ValueDefinition } from 'src/app/model/Utilities/AttributeDefinition.ts/ValueDefnition';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { DisplayData } from 'src/app/model/Interface/DisplayData';
import { ValueDefinitionData } from '../../../model/Interface/ValueDefinition';

export class ValueDefinitionsResultMapper extends AbstractAttributeDefinitionsResultMapper {
  /**
   * Maps the value definition from the UI profile to ValueDefinition instances.
   *
   * @param uiProfile The UI profile data containing value definition.
   * @returns An array of ValueDefinition instances.
   */
  public mapValueDefinition(uiProfile: UiProfileData): ValueDefinition[] {
    if (uiProfile.valueDefinition) {
      return [this.mapValueDefinitionInstance(uiProfile.valueDefinition)];
    }
    return [];
  }

  public mapValueDefinitionInstance(valueDefinitionData: ValueDefinitionData): ValueDefinition {
    return new ValueDefinition(
      this.createDisplayData(valueDefinitionData.display),
      valueDefinitionData.type,
      valueDefinitionData.optional,
      this.mapAllowedUnits(valueDefinitionData.allowedUnits),
      valueDefinitionData.max,
      valueDefinitionData.min,
      valueDefinitionData.precision,
      valueDefinitionData.referencedValueSet
    );
  }

  public createDisplayData(displayData: DisplayData): Display {
    const translations = displayData.translations?.map((translation) =>
      this.createTranslation(translation)
    );
    return new Display(translations, displayData.original);
  }

  private createTranslation(translation: any): Translation {
    return new Translation(translation.language, translation.value);
  }
}
