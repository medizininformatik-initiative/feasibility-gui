import { AbstractListEntry } from './AbstractListEntry';

export class FeasibilityQueryResultDetailstListEntry extends AbstractListEntry {
  private numberOfPatients: number;
  private siteName: string;

  constructor(numberOfPatients: number, siteName: string) {
    super(siteName);
    this.numberOfPatients = numberOfPatients;
    this.siteName = siteName;
  }

  // Getter and Setter for numberOfPatients
  getNumberOfPatients(): number {
    return this.numberOfPatients;
  }

  setNumberOfPatients(value: number) {
    this.numberOfPatients = value;
  }

  // Getter and Setter for siteName
  getSiteName(): string {
    return this.siteName;
  }

  setSiteName(value: string) {
    this.siteName = value;
  }
}
