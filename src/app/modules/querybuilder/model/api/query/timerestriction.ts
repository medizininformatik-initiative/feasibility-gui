import { V2 } from '../annotations'

@V2()
export class TimeRestriction {
  tvpe = TimeRestrictionType.BETWEEN

  minDate?: Date // implicitly included date
  maxDate?: Date // implicitly included date
  beforeDate?: Date
  afterDate?: Date
}

export enum TimeRestrictionType {
  BETWEEN = 'BETWEEN',
  AT = 'AT',
  // NOT_AT = 'NOT_AT',
  BEFORE = 'BEFORE',
  // BEFORE_OR_AT = 'BEFORE_OR_AT',
  AFTER = 'AFTER',
  // AFTER_OR_AT = 'AFTER_OR_AT',
}
