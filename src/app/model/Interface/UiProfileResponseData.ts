import { UiProfileData } from './UiProfileData';

export interface UiProfileResponseData {
  /**
   * The unique identifier of the UI profile response.
   * @type {string}
   * @readonly
   */
  readonly id: string

  /**
   * The UI profile data.
   * @type {UiProfileData}
   * @readonly
   */
  readonly uiProfileId: UiProfileData
}
