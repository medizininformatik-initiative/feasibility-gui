import { AbstractTimeRestriction } from './AbstractTimeRestriction';

export class AtFilter extends AbstractTimeRestriction {
  /**
   * afterDate has to be equal to beforeDate
   */
  afterDate: string;
  beforeDate: string;
}
