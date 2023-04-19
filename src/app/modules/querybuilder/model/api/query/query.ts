import { Group } from './group';
import { CriterionOnlyV1, CriterionOnlyV2 } from './criterion';

// The atomic building block of a query is a Criterion (e.g. "Geschlecht: weiblich")
//
// We have following hierarchy from Query (top) to Criterion (bottom):
//
//    Query               contains Groups
//    Group               contains inclusion and exclusion criteria - it may also be related to one dependent child Group
//
//                        The inclusion criteria of type Criterion[][] are interpreted as (conjunctive normal form)
//                              (inclusion[0][0] or  inclusion[0][1] or  ...)
//                          and (inclusion[1][0] or  inclusion[1][1] or  ...)
//                          and
//                          ...
//                          and (inclusion[n][0] or  inclusion[n][1] or  ...)
//
//                        The exclusion criteria of type Criterion[][] are interpreted as (disjunctive normal form)
//                              (exclusion[0][0] and exclusion[0][1] and ...)
//                          or  (exclusion[1][0] and exclusion[1][1] and ...)
//                          or
//                          ...
//                          or  (exclusion[n][0] and exclusion[n][1] and ...)
//
//    Criterion           atomic building block of a query
//

export class Query {
  display = '';
  consent = false;
  groups: Group[] = [new Group()];
}

// agreed CODEX format of queries in version 1 (without groups)
export class QueryOnlyV1 {
  version = 'http://to_be_decided.com/draft-1/schema#';
  display = '';

  // conjunctive normal form (without negation)
  inclusionCriteria: CriterionOnlyV1[][] = [];
  // disjunctive normal form (without negation)
  exclusionCriteria: CriterionOnlyV1[][] = [];
}
export class QueryOnlyV2 {
  version = 'http://to_be_decided.com/draft-1/schema#';
  display = '';

  // conjunctive normal form (without negation)
  inclusionCriteria: CriterionOnlyV2[][] = [];
  // disjunctive normal form (without negation)
  exclusionCriteria: CriterionOnlyV2[][] = [];
}

export class DataSelectionOnly {
  version = 'http://to_be_decided.com/draft-1/schema#';
  display = '';

  selectedCriteria: CriterionOnlyV2[][] = [];
}
