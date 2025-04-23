import { ReferenceFieldsCloner } from './ReferenceFieldsCloner';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';

export class SelectedReferenceFieldsCloner {
  public static deepCopySelectedReferenceFields(
    selectedReferenceFields: SelectedReferenceField[]
  ): SelectedReferenceField[] {
    if (!selectedReferenceFields || selectedReferenceFields.length === 0) {
      return [];
    }
    return selectedReferenceFields.map((field) =>
      SelectedReferenceFieldsCloner.deepCopySelectedReferenceField(field)
    );
  }

  public static deepCopySelectedReferenceField(
    selectedReferenceField: SelectedReferenceField
  ): SelectedReferenceField {
    return new SelectedReferenceField(
      ReferenceFieldsCloner.deepCopyReferenceField(selectedReferenceField.getSelectedField()),
      selectedReferenceField.getLinkedProfileIds(),
      selectedReferenceField.getMustHave()
    );
  }
}
