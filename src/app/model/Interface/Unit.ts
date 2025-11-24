/**
 * Represents a quantity unit as returned by the backend API.
 *
 * This interface defines the coding information for measurement units (e.g., kilograms, centimeters, mmHg).
 * It is primarily used to map JSON responses containing unit definitions into domain models.
 *
 * @interface QuantityUnitData
 */
export interface QuantityUnitData {
  /**
   * The coded unit value.
   * @type {string}
   */
  readonly code: string

  /**
   * The human-readable display name for the unit.
   * @type {string}
   */
  readonly display: string

  /**
   * The optional URI or identifier for the unit’s coding system.
   * @type {string | undefined}
   */
  readonly system?: string
}
