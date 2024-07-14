import { AbstractTimeRestriction } from './AbstractTimeRestriction';
import { TimeRestrictionType } from '../../TimeRestriction';

export class BeforeFilter extends AbstractTimeRestriction {
  afterDate: string;
  protected readonly type: TimeRestrictionType = TimeRestrictionType.BEFORE;

  constructor(afterDate: string) {
    super(afterDate);
    this.afterDate = afterDate;
  }
}
