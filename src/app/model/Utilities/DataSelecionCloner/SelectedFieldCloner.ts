import { SelectedBasicField } from '../../DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { CloneDisplayData } from '../DisplayData/CloneDisplayData';

export class SelectedFieldCloner {
  public static deepCopySelectedFields(selectedFields: SelectedBasicField[]): SelectedBasicField[] {
    if (!selectedFields || selectedFields.length === 0) {
      return [];
    }
    return selectedFields.map((selectedField) =>
      SelectedFieldCloner.deepCopySelectedField(selectedField)
    );
  }

  /**
   * Clones a SelectedField object deeply.
   * @param selectedField The SelectedField to clone.
   * @returns A deep copy of the SelectedField.
   */
  public static deepCopySelectedField(
    selectedField: SelectedBasicField
  ): SelectedBasicField | undefined {
    if (!selectedField) {
      return undefined;
    }
    const clonedDisplay = CloneDisplayData.deepCopyDisplayData(selectedField.getDisplay());
    const clonedDescription = CloneDisplayData.deepCopyDisplayData(selectedField.getDescription());

    return new SelectedBasicField(
      clonedDisplay,
      clonedDescription,
      selectedField.getElementId(),
      selectedField.getMustHave(),
      selectedField.getType()
    );
  }
}
