import { Display } from '../../Display';
import { AbstractField } from '../AbstractField';
import { SelectedReferenceField } from './SelectedReferenceField';

export class ReferenceField extends AbstractField {
  private referencedProfileUrls: string[] = [];

  constructor(
    elementId: string,
    display: Display,
    description: Display,
    isRequired: boolean = false,
    recommended: boolean = false,
    selectedReferenceProfiles: SelectedReferenceField[] = [],
    referencedProfileUrls: string[] = []
  ) {
    super(elementId, display, description, isRequired, recommended);
    this.referencedProfileUrls = referencedProfileUrls;
  }

  public getReferencedProfileUrls(): string[] {
    return this.referencedProfileUrls;
  }
  public setReferencedProfileUrls(referencedProfileUrls: string[]): void {
    this.referencedProfileUrls = referencedProfileUrls;
  }
}
