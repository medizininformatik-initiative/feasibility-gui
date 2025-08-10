import { DisplayData } from '../DisplayData';
import { ListEntryData } from './ListEntryData';

/**
 * Interface representing criteria list entry data from backend search API responses.
 * Extends base ListEntryData with additional criteria-specific properties including
 * availability metrics, terminology information, and contextual data.
 * Used for mapping JSON responses to CriteriaListEntry domain models.
 */
export interface CriteriaListEntryData extends ListEntryData {
  /**
   * Number indicating the availability count of this criteria
   */
  readonly availability: number

  /**
   * Flag indicating whether this criteria can be selected by users
   */
  readonly selectable: boolean

  /**
   * Terminology system identifier for this criteria
   */
  readonly terminology: string

  /**
   * Terminology code value for this criteria
   */
  readonly termcode: string

  /**
   * KDS (Kerndatensatz) module identifier associated with this criteria
   */
  readonly kdsModule: string

  /**
   * Context information describing the scope or domain of this criteria
   */
  readonly context: string

  /**
   * Display information including original text and translations
   */
  readonly display: DisplayData
}
