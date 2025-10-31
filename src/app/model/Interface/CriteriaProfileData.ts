import { DisplayData } from './DisplayData';
import { TerminologyCodeData } from './TerminologyCodeData';
import { UiProfileData } from './UiProfileData';

export interface CriteriaProfileData {
  readonly id: string
  readonly display: DisplayData
  /**
   * Will potentially be a string
   */
  readonly uiProfile: UiProfileData
  readonly context: TerminologyCodeData
  readonly termCodes: TerminologyCodeData[]
}
