import { Criterion } from './Criterion/Criterion';

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
/**
 * Represents a query with display name, consent, inclusion criteria, and exclusion criteria.
 */
export class Query {
  private display: string;
  private consent: boolean;
  private inclusionCriteria: Criterion[][];
  private exclusionCriteria: Criterion[][];

  /**
   * Constructor to initialize the Query with display and consent.
   *
   * @param display - The display name of the query.
   * @param consent - The consent status of the query.
   */
  constructor(display: string = 'Ausgewählte Merkmale', consent: boolean = false) {
    this.display = display;
    this.consent = consent;
    this.inclusionCriteria = [];
    this.exclusionCriteria = [];
  }

  /**
   * Gets the display name of the query.
   *
   * @returns The display name of the query.
   */
  getDisplay(): string {
    return this.display;
  }

  /**
   * Sets the display name of the query.
   *
   * @param display - The new display name of the query.
   */
  setDisplay(display: string): void {
    this.display = display;
  }

  /**
   * Gets the consent status of the query.
   *
   * @returns The consent status of the query.
   */
  getConsent(): boolean {
    return this.consent;
  }

  /**
   * Sets the consent status of the query.
   *
   * @param consent - The new consent status of the query.
   */
  setConsent(consent: boolean): void {
    this.consent = consent;
  }

  /**
   * Gets the inclusion criteria of the query.
   *
   * @returns The inclusion criteria of the query.
   */
  getInclusionCriteria(): Criterion[][] {
    return this.inclusionCriteria;
  }

  /**
   * Sets the inclusion criteria of the query.
   *
   * @param inclusionCriteria - The new inclusion criteria of the query.
   */
  setInclusionCriteria(inclusionCriteria: Criterion[][]): void {
    this.inclusionCriteria = inclusionCriteria;
  }

  /**
   * Gets the exclusion criteria of the query.
   *
   * @returns The exclusion criteria of the query.
   */
  getExclusionCriteria(): Criterion[][] {
    return this.exclusionCriteria;
  }

  /**
   * Sets the exclusion criteria of the query.
   *
   * @param exclusionCriteria - The new exclusion criteria of the query.
   */
  setExclusionCriteria(exclusionCriteria: Criterion[][]): void {
    this.exclusionCriteria = exclusionCriteria;
  }
}
