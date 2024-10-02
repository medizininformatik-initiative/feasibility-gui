import { DataSelectionProfileProfile } from './Profile/DataSelectionProfileProfile';

export class DataSelection {
  private id: string;

  private profiles: DataSelectionProfileProfile[] = [];

  constructor(profiles: DataSelectionProfileProfile[], id: string) {
    this.profiles = profiles;
    this.id = id;
  }

  public getProfiles(): DataSelectionProfileProfile[] {
    return this.profiles;
  }

  public setProfiles(profiles: DataSelectionProfileProfile[]): void {
    this.profiles = profiles;
  }

  public getId(): string {
    return this.id;
  }
}
