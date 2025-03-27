import { DataExtraction } from '../CRTDL/DataExtraction/DataExtraction';
import { DataExtractionData } from '../Interface/DataExtractionData';
import { DataSelectionProfileProfile } from './Profile/DataSelectionProfileProfile';

/**
 * @todo
 *   private profiles: DataSelectionProfileProfile[] = [];
 *    sollte nicht die profiles als Array speichern sondern nur deren urls
 *    private profileUrls: string[] = []
 *
 */
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
