/**
 * Interface representing quantity unit data from backend API responses.
 * Defines measurement units with coding information for quantities and values.
 * Used for mapping JSON responses containing unit definitions to domain models.
 */
export interface QuantityUnitData {
  /**
   * The unit code value (e.g., "kg", "cm", "mmHg")
   */
  code: string

  /**
   * Human-readable display text for the unit
   */
  display: string

  /**
   * Optional URI or identifier of the unit coding system (e.g., UCUM)
   */
  system?: string
}
