import { InterfaceListEntry } from '../../../model/Interface/Search/ListEntryData';

/**
 * Represents an abstract search result, extending AbstractTermHashContext.
 */
export abstract class AbstractListEntry implements InterfaceListEntry {
  id: string;
  /**
   * Constructs a new AbstractSearchResult instance.
   *
   * @param id
   */
  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}
