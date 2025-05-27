import { AbstractField } from '../AbstractField';
import { Display } from '../../Display';
import { ProfileFieldTypes } from 'src/app/model/Utilities/ProfileFieldTypes';
import { ReferencedProfile } from './ReferencedProfile';

export class ReferenceField extends AbstractField {
  private referencedProfiles: ReferencedProfile[] = [];

  constructor(
    elementId: string,
    display: Display,
    description: Display,
    isRequired: boolean = false,
    recommended: boolean = false,
    referencedProfiles: ReferencedProfile[] = []
  ) {
    super(elementId, display, description, isRequired, recommended, ProfileFieldTypes.reference);
    this.referencedProfiles = referencedProfiles;
  }

  public getReferencedProfiles(): ReferencedProfile[] {
    return this.referencedProfiles;
  }

  public setReferencedProfiles(referencedProfiles: ReferencedProfile[]): void {
    this.referencedProfiles = referencedProfiles;
  }

  public isRequiredOrRecomended(referenceField: ReferenceField): boolean {
    return referenceField.getIsRequired() || referenceField.getRecommended();
  }
}
