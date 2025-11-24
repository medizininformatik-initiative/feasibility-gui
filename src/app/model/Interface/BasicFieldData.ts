import { DisplayData } from './DisplayData';

/**
 * Interface representing basic field data for data selection.
 * Contains information about a field including its display properties and hierarchy.
 */
export interface BasicFieldData {
  /**
   * Unique identifier for the field
   * @type {string}
   */
  id: string

  /**
   * Display text for the field
   * @type {DisplayData}
   */
  display: DisplayData

  /**
   * Description text for the field
   * @type {DisplayData}
   */
  description: DisplayData

  /**
   * Whether this field is required
   * @type {boolean}
   */
  required: boolean

  /**
   * Whether this field is recommended
   * @type {boolean}
   */
  recommended: boolean

  /**
   * Optional array of child/nested fields
   * @type {BasicFieldData[] | undefined}
   */
  children?: BasicFieldData[]
}
