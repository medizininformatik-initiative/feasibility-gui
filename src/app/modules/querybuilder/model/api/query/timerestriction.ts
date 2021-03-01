import { V2 } from '../annotations'

@V2()
export class TimeRestriction {
  tvpe = TimeRestrictionType.EVER

  minDate?: Date // implicitly included date
  maxDate?: Date // implicitly included date
}

export enum TimeRestrictionType {
  EVER = 'EVER',
  LATEST = 'LATEST',
}
