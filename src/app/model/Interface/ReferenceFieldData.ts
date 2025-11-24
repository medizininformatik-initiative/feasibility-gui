import { DisplayData } from './DisplayData';
import { ReferencedProfileData } from './ReferencedProfileData';

/**
 * Interface representing reference field data structure.
 */
export interface ReferenceFieldData {
  /**
   * Unique identifier for the field element
   * @type {string}
   */
  id: string

  /**
   * Display information for the field
   * @type {DisplayData}
   */
  display: DisplayData

  /**
   * Description information for the field
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
   * Type of the field (always 'reference' for reference fields)
   * @type {string}
   */
  type: string

  /**
   * Array of profiles that can be referenced by this field
   * @type {ReferencedProfileData[]}
   */
  referencedProfiles: ReferencedProfileData[]
}
