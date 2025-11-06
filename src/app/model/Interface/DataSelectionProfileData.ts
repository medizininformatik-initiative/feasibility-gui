import { BasicFieldData } from './BasicFieldData';
import { DisplayData } from './DisplayData';
import { ProfileFilterData } from './ProfileFilterData';
import { ReferenceFieldData } from './ReferenceFieldData';

/**
 * Interface representing data selection profile data structure.
 */
export interface DataSelectionProfileData {
  /**
   * URL/resource identifier for the profile
   * @type {string}
   */
  url: string

  /**
   * Display information for the profile
   * @type {DisplayData}
   */
  display: DisplayData

  /**
   * Array of basic fields in the profile
   * @type {BasicFieldData[]}
   */
  fields: BasicFieldData[]

  /**
   * Array of reference fields in the profile
   * @type {ReferenceFieldData[]}
   */
  references: ReferenceFieldData[]

  /**
   * Array of filters applied to the profile
   * @type {ProfileFilterData[]}
   */
  filters: ProfileFilterData[]
}
