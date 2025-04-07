import { CloneDisplayData } from '../DisplayData/CloneDisplayData';
import { SelectedField } from '../../DataSelection/Profile/Fields/SelectedField';

export class SelectedFieldCloner {
  public static deepCopySelectedFields(selectedFields: SelectedField[]): SelectedField[] {
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
  public static deepCopySelectedField(selectedField: SelectedField): SelectedField | undefined {
    if (!selectedField) {
      return undefined;
    }
    const clonedDisplay = CloneDisplayData.deepCopyDisplayData(selectedField.getDisplay());
    const clonedLinkedProfiles = [...(selectedField.getLinkedProfiles() || [])];
    return new SelectedField(
      clonedDisplay,
      selectedField.getElementId(),
      selectedField.getMustHave(),
      clonedLinkedProfiles
    );
  }
}
