import { AbstractSelectedField } from '../AbstractSelectedField';
import { Display } from '../../Display';

export class SelectedReferenceField extends AbstractSelectedField {
  private linkedProfiles: string[] = [];

  constructor(
    display: Display,
    description: Display,
    elementId: string,
    mustHave: boolean,
    linkedProfiles: string[]
  ) {
    super(display, description, elementId, mustHave);
    this.linkedProfiles = linkedProfiles;
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
