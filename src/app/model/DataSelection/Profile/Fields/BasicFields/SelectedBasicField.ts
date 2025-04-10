import { AbstractSelectedField } from '../AbstractSelectedField';
import { Display } from '../../Display';

export class SelectedBasicField extends AbstractSelectedField {
  constructor(display: Display, description: Display, elementId: string, mustHave: boolean) {
    super(display, description, elementId, mustHave);
  }
}
