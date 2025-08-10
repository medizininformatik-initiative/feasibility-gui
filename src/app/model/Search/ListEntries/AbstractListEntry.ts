import { ListEntryData } from '../../Interface/Search/ListEntryData';

/**
 * Represents an abstract search result, extending AbstractTermHashContext.
 */
export abstract class AbstractListEntry {
  protected id: string;
  /**
   * Constructs a new AbstractSearchResult instance.
   *
   * @param id
   */
  constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }
}
