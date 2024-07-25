import { AbstractTermHashContext } from '../../../model/ElasticSearch/ElasticSearchResult/AbstractTermHashContext';
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
   * @param id
   */
  constructor(id: string) {
    super(id);
  }

  getId(): string {
    return this.id;
  }
}
