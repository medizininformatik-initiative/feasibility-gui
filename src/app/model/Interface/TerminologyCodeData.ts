import { TerminologyCodeBaseData } from './TerminologyBaseData';

/**
 * Interface representing extended terminology code data from backend API responses.
 * Extends base terminology data with optional versioning information.
 * Used for mapping JSON responses containing versioned terminology codes to domain models.
 */
export interface TerminologyCodeData extends TerminologyCodeBaseData {
  /**
   * Optional version identifier for the terminology system or specific code version
   */
  version?: string
}
