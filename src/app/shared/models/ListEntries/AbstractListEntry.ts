import { AbstractTermHashContext } from '../../../model/ElasticSearch/ElasticSearchResult/AbstractTermHashContext';
import { InterfaceListEntry } from './InterfaceListEntry';

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
