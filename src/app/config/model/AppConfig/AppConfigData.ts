/**
 * Application configuration interface that defines all configurable settings
 * for the feasibility GUI application including backend URLs, authentication,
 * legal information, and feature flags.
 */
export interface AppConfigData {
  /**
   * The base URL of the backend API server.
   * Used for all HTTP requests to the backend services.
   */
  readonly baseUrl: string

  /**
   * The specific API path for the UI backend.
   */
  readonly backendBaseUrl: string

  /**
   * The base URL for the authentication server.
   * Used for login, logout, and token operations.
   */
  readonly authBaseUrl: string

  /**
   * The authentication realm name in the identity provider.
   * Defines the security domain for user authentication.
   */
  readonly authRealm: string

  /**
   * The client ID registered in the authentication server.
   * Identifies this application to the identity provider.
   */
  readonly authClientId: string

  /**
   * Array of roles that users can have in the application.
   * Used for role-based access control and feature gating.
   */
  readonly authRoles: string[]

  // Legal Information

  /**
   * The version string of the application for legal and compliance purposes.
   * Displayed in legal notices and about dialogs.
   */
  readonly version: string

  /**
   * The copyright year or year range for legal notices.
   * Used in footer copyright statements and legal pages.
   */
  readonly copyrightYear: string

  /**
   * The name of the organization or entity that owns the copyright.
   * Displayed in copyright notices throughout the application.
   */
  readonly copyrightOwner: string

  /**
   * Contact email address for legal inquiries and support.
   * Used for legal compliance and user support contact information.
   */
  readonly email: string

  // Feature Flags

  /**
   * Whether to show the options and settings page in the application.
   * Controls the visibility of configuration and preference screens.
   */
  readonly featuresShowOptionsPage: boolean

  /**
   * Array of roles that are allowed to access the options page.
   * Only users with these roles can view and modify application settings.
   * Empty array means all authenticated users can access if featuresShowOptionsPage is true.
   */
  readonly featuresOptionPageRoles: string[]

  /**
   * The name of the default stylesheet to apply on application startup.
   * Used to set the initial look and feel of the user interface.
   */
  readonly stylesheet: string
}
