import { AbstractTimeRestriction } from './AbstractTimeRestriction';

export class BetweenFilter extends AbstractTimeRestriction {
  afterDate: string;
  beforeDate: string;
}
