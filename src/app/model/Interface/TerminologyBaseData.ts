/**
 * Base interface representing core terminology code information from backend API responses.
 * Provides fundamental properties for terminology codes across different systems.
 * Used as foundation for mapping JSON responses containing terminology data to domain models.
 */
export interface TerminologyCodeBaseData {
  /**
   * The terminology code value within the specified system
   */
  code: string

  /**
   * URI or identifier of the terminology system (e.g., SNOMED CT, ICD-10)
   */
  system: string

  /**
   * Human-readable display text for the terminology code
   */
  display: string
}
