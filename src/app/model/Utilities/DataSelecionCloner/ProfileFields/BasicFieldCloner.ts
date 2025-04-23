import { BasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/BasicField';
import { CloneDisplayData } from '../../DisplayData/CloneDisplayData';

export class BasicFieldsCloner {
  public static deepCopyBasicFields(fields: BasicField[]): BasicField[] {
    if (!fields || fields.length === 0) {
      return [];
    }

    return fields.map((field) => BasicFieldsCloner.deepCopyBasicField(field));
  }

  public static deepCopyBasicField(basicField: BasicField) {
    return new BasicField(
      basicField.getElementId(),
      CloneDisplayData.deepCopyDisplayData(basicField.getDisplay()),
      CloneDisplayData.deepCopyDisplayData(basicField.getDescription()),
      BasicFieldsCloner.deepCopyBasicFields(basicField.getChildren() || []),
      basicField.getRecommended(),
      basicField.getIsSelected(),
      basicField.getIsRequired(),
      basicField.getType()
    );
  }
}
