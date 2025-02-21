import { DisplayData } from './DisplayData';
import { TerminologyCodeData } from './TerminologyCodeData ';
import { UiProfileData } from './UiProfileData';

export interface CriteriaProfileData {
  id: string
  display: DisplayData
  uiProfile: UiProfileData
  context: TerminologyCodeData
  termCodes: TerminologyCodeData[]
}
