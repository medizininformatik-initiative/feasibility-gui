import { ProfileFilterTypes } from '../Utilities/ProfileFilterTypes';

export interface ProfileFilterData {
  type: string
  name: string
  ui_type: ProfileFilterTypes
  valueSetUrls: string[]
}
