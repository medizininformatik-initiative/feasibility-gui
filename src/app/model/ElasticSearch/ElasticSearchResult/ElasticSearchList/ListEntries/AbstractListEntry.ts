import { AbstractTermHashContext } from '../../AbstractTermHashContext';
import { InterfaceListEntry } from './InterfaceListEntry';

/**
 * Represents an abstract search result, extending AbstractTermHashContext.
 */
export abstract class AbstractListEntry
  extends AbstractTermHashContext
  implements InterfaceListEntry
{
  /**
   * Constructs a new AbstractSearchResult instance.
   *
   * @param name
   * @param id
   */
  constructor(name: string, id: string) {
    super(name, id);
  }

  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }
}
