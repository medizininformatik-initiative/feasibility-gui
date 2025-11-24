import { DisplayData } from './DisplayData';
import { TerminologyCodeData } from './TerminologyCodeData';
/**
 * @interface CriteriaProfileData
 */
export interface CriteriaProfileData {
  /**
   * The unique identifier of the criteria profile.
   * @type {string}
   * @readonly
   */
  readonly id: string

  /**
   * The display data for the criteria profile.
   * @type {DisplayData}
   * @readonly
   */
  readonly display: DisplayData

  /**
   * The unique identifier of the UI profile.
   * @type {string}
   * @readonly
   */
  readonly uiProfileId: string

  /**
   * The context for the criteria profile.
   * @type {TerminologyCodeData}
   * @readonly
   */
  readonly context: TerminologyCodeData

  /**
   * The term codes associated with the criteria profile.
   * @type {TerminologyCodeData[]}
   * @readonly
   */
  readonly termCodes: TerminologyCodeData[]
}
