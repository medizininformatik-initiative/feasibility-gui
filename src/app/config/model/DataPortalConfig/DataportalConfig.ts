/**
 * Data portal specific settings interface that defines configuration values
 * for portal functionality, API endpoints, polling behavior, and result boundaries.
 */
export interface DataportalConfig {
  /**
   * Version string of the CCDL (Common Clinical Data Language) specification.
   * Indicates which version of the data standard is being used.
   */
  readonly ccdlVersion: string

  /**
   * URL for the DSE (Data Sharing Engine) patient profile service.
   * Used to retrieve detailed patient profile information.
   */
  readonly dsePatientProfileUrl: string

  /**
   * Lower boundary threshold for location result counts.
   * Minimum number of locations required to display location-based results.
   */
  readonly lowerboundarylocationresult: number

  /**
   * Lower boundary threshold for patient result counts.
   * Minimum number of patients required to display results publicly.
   */
  readonly lowerboundarypatientresult: number

  /**
   * Polling interval configuration string.
   * Defines how frequently the application should poll for updates.
   */
  readonly pollingintervall: string

  /**
   * Polling time configuration string.
   * Specifies the duration or timing for polling operations.
   */
  readonly pollingtime: string

  /**
   * URL link to the external proposal portal.
   * Used for redirecting users to submit research proposals.
   */
  readonly proposalPortalLink: string

  /**
   * Base URL for the UI backend API service.
   * Used for all backend communication from the user interface.
   */
  readonly uiBackendApiUrl: string
}
