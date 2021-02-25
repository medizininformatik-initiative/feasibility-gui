import { Criterion } from './criterion'
import { V2 } from '../annotations'

// Example
//     {
//         restrictionType: EVERY,
//         dependentGroupRestrictionType: FIRST,
//         atMostEarlierThanParentEvent: 10,
//         atMostEarlierThanParentEventUnit: DAY
//         atMostLaterThanParentEvent: 2,
//         atMostLaterThanParentEventUnit: MONTH
//     }
//
//     Every instance of group itself must be
//     * at most 10 days earlier than the first occurring instance of the related  group
//     * at most 2 months later than the first occurring instance of the related  group end note
//
@V2()
export class GroupPeriodRelation {
  restrictionType: InstanceRestrictionType
  dependentGroupRestrictionType: InstanceRestrictionType

  atMostEarlierThanRelatedGroup?: number // negative values allowed
  atMostEarlierThanRelatedGroupUnit?: PeriodUnit
  atMostLaterThanRelatedGroup?: number // negative values allowed
  atMostLaterThanRelatedGroupUnit?: PeriodUnit
}

export class Group {
  id: string
  display: string

  // conjunctive normal form (without negation)
  inclusionCriteria: Criterion[][] = []
  // disjunctive normal form (without negation)
  exclusionCriteria: Criterion[][] = []

  @V2()
  dependentGroup?: Group
  @V2()
  dependentPeriodRelation?: GroupPeriodRelation
}

// Determines which items are considered for comparison
export enum InstanceRestrictionType {
  EVERY = 'EVERY',
  FIRST = 'FIRST',
  LATEST = 'LATEST',
}

export enum PeriodUnit {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export type CritType = 'exclusion' | 'inclusion'
