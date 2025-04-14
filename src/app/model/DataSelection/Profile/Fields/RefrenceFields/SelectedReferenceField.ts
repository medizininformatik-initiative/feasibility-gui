import { AbstractSelectedField } from '../AbstractSelectedField';
import { Display } from '../../Display';
import { ProfileFieldTypes } from 'src/app/model/Utilities/ProfileFieldTypes';

export class SelectedReferenceField extends AbstractSelectedField {
  private linkedProfiles: string[] = [];
  private referencedProfileUrls: string[] = [];

  constructor(
    elementId: string,
    display: Display,
    description: Display,
    mustHave: boolean,
    linkedProfiles: string[],
    referencedProfileUrls: string[] = []
  ) {
    super(display, description, elementId, mustHave, ProfileFieldTypes.reference);
    this.linkedProfiles = linkedProfiles;
    this.referencedProfileUrls = referencedProfileUrls;
  }

  public getReferencedProfileUrls(): string[] {
    return this.referencedProfileUrls;
  }

  public setReferencedProfileUrls(referencedProfileUrls: string[]): void {
    this.referencedProfileUrls = referencedProfileUrls;
  }

  public getLinkedProfiles(): string[] {
    return this.linkedProfiles;
  }

  public setLinkedProfiles(linkedProfiles: string[]): void {
    this.linkedProfiles = linkedProfiles;
  }

  public addLinkedProfile(linkedProfile: string): void {
    this.linkedProfiles.push(linkedProfile);
  }

  public removeLinkedProfile(linkedProfile: string): void {
    const index = this.linkedProfiles.indexOf(linkedProfile);
    if (index > -1) {
      this.linkedProfiles.splice(index, 1);
    }
  }

  public clearLinkedProfiles(): void {
    this.linkedProfiles = [];
  }
}
