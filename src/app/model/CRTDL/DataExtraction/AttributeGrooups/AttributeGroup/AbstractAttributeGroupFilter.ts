import { CRTDLFilterTypes } from 'src/app/model/Utilities/CRTDLFilterTypes';

export abstract class AbstractAttributeGroupFilter {
  type: CRTDLFilterTypes;
  name: string;

  constructor(type: CRTDLFilterTypes, name: string) {
    this.type = type;
    this.name = name;
  }
}
