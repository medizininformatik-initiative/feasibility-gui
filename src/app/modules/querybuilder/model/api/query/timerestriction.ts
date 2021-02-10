import { V2 } from '../annotations'
import { Moment } from 'moment'

@V2()
export class TimeRestriction {
  tvpe?: TimeRestrictionType.EVER

  restricted: boolean

  maxDate?: Moment // implicitly included date
  minDate?: Moment // implicitly included date
}

export enum TimeRestrictionType {
  EVER = 'EVER',
  LATEST = 'LATEST',
}
