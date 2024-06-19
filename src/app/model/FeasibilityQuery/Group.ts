import { Criterion } from './Criterion/Criterion';

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
export class GroupDependencyInfo {
  linked = false;

  restrictionType: InstanceRestrictionType;
  dependentGroupRestrictionType: InstanceRestrictionType;

  atMostEarlierThanRelatedGroupTimeRelation?: TimeRelation;
  atMostEarlierThanRelatedGroup?: number; // negative values allowed
  atMostEarlierThanRelatedGroupUnit?: PeriodUnit;
  atMostLaterThanRelatedGroupTimeRelation?: TimeRelation;
  atMostLaterThanRelatedGroup?: number; // negative values allowed
  atMostLaterThanRelatedGroupUnit?: PeriodUnit;
}

export class Group {
  id: number;
  display: string;

  // conjunctive normal form (without negation)
  inclusionCriteria: Criterion[][] = [];
  // disjunctive normal form (without negation)
  exclusionCriteria: Criterion[][] = [];

  selectedCriteria?: Criterion[][] = [];

  dependencyInfo?: GroupDependencyInfo;

  constructor(id: number = 0) {
    this.id = id;
  }
}

// Determines which items are considered for comparison
export enum InstanceRestrictionType {
  EVERY = 'EVERY',
  FIRST = 'FIRST',
  LATEST = 'LATEST',
}

export enum TimeRelation {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

export enum PeriodUnit {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export type CritType = 'exclusion' | 'inclusion';
