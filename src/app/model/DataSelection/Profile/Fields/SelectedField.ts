import { Display } from '../Display';

export class SelectedField {
  private display: Display;
  private elementId: string;
  private mustHave: boolean;
  private linkedProfiles: string[];

  constructor(display: Display, elementId: string, mustHave: boolean, linkedProfiles: string[]) {
    this.display = display;
    this.elementId = elementId;
    this.mustHave = mustHave;
    this.linkedProfiles = linkedProfiles;
  }

  public getDisplay(): Display {
    return this.display;
  }
  public setDisplay(display: Display): void {
    this.display = display;
  }
  public getElementId(): string {
    return this.elementId;
  }

  public setElementId(elementId: string): void {
    this.elementId = elementId;
  }

  public getMustHave(): boolean {
    return this.mustHave;
  }

  public setMustHave(mustHave: boolean): void {
    this.mustHave = mustHave;
  }

  public getLinkedProfiles(): string[] {
    return this.linkedProfiles;
  }

  public setLinkedProfiles(linkedProfiles: string[]): void {
    this.linkedProfiles = linkedProfiles;
  }
}
