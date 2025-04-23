import { SelectedBasicField } from '../../DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { BasicFieldsCloner } from './ProfileFields/BasicFieldCloner';
import { ProfileFieldsCloner } from './ProfileFieldsCloner';

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
   * */
  public static deepCopySelectedField(
    selectedField: SelectedBasicField
  ): SelectedBasicField | undefined {
    if (!selectedField) {
      return undefined;
    }

    return new SelectedBasicField(
      BasicFieldsCloner.deepCopyBasicField(selectedField.getSelectedField()),
      selectedField.getMustHave()
    );
  }
}
