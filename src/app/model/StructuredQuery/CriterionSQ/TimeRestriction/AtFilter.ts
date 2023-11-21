import { AbstractTimeRestriction } from './AbstractTimeRestriction';

export class AtFilter extends AbstractTimeRestriction {
  afterDate: string;
  beforeDate: string;
}
