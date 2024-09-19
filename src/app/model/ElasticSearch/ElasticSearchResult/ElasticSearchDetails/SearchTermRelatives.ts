import { AbstractTermHashContext } from '../AbstractTermHashContext';

/**
 * Represents the relatives (parents, children, related terms) and translations of a search term.
 */
export class SearchTermRelatives extends AbstractTermHashContext {
  constructor(name: string, id: string) {
    super(name, id);
  }
}
