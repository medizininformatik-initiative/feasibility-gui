/**
 * Represents the types of criteria used in filtering or selection processes.
 */
export enum CriteriaType {
  /**
   * @description Exclusion: Criteria used to exclude certain items or conditions,
   * typically represented in Disjunctive Normal Form (DNF) without negation.
   * Each element of the array represents a disjunction of criteria
   */
  EXCLUSION = 'exclusion',

  /**
   * @description Inclusion: Criteria used to include certain items or conditions,
   *  typically represented in Conjunctive Normal Form (CNF) without negation.
   *  Each element of the array represents a conjunction of criteria,
   *  where each criterion must be satisfied for the overall criteria to be met.
   */
  INCLUSION = 'inclusion',
}
