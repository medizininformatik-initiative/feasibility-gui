import { DisplayData } from './DisplayData';

/**
 * Interface representing a referenced profile data structure.
 */
export interface ReferencedProfileData {
  /**
   * URL/resource identifier for the referenced profile
   * @type {string}
   */
  url: string

  /**
   * Display information for the profile
   * @type {DisplayData}
   */
  display: DisplayData

  /**
   * Optional profile fields or additional metadata
   * @type {DisplayData | undefined}
   */
  fields?: DisplayData

  /**
   * Optional nested/child referenced profiles
   * @type {ReferencedProfileData[] | undefined}
   */
  children?: ReferencedProfileData[]
}
