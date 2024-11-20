export class TimeRestriction {
  tvpe: TimeRestrictionType = TimeRestrictionType.BETWEEN;

  minDate?: Date; // implicitly included date
  maxDate?: Date; // implicitly included date
  beforeDate?: string;
  afterDate?: string;
}

export enum TimeRestrictionType {
  AFTER = 'AFTER',
  AT = 'AT',
  BEFORE = 'BEFORE',
  BETWEEN = 'BETWEEN',
  NONE = 'NONE',
}
