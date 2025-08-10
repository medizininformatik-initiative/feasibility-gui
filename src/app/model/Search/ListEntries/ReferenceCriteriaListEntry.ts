import { AbstractListEntry } from './AbstractListEntry';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { ReferenceCriteriaListEntryData } from '../../Interface/Search/ReferenceCriteriaListEntryData';

export class ReferenceCriteriaListEntry extends AbstractListEntry {
  private readonly display: Display;
  private readonly terminology: string;
  private readonly system: string;

  /**
   * @param terminology
   * @param id
   */
  constructor(display: Display, system: string, terminology: string, id: string) {
    super(id);
    this.display = display;
    this.terminology = terminology;
    this.system = system;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public getTerminology(): string {
    return this.terminology;
  }

  public getSystem(): string {
    return this.system;
  }

  public static fromJson(json: ReferenceCriteriaListEntryData): ReferenceCriteriaListEntry {
    return new ReferenceCriteriaListEntry(
      Display.fromJson(json.display),
      json.system,
      json.terminology,
      json.id
    );
  }
}
