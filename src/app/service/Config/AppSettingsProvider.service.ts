import * as iso8601 from 'iso8601-duration';
import { AppConfigKey } from 'src/app/config/model/AppConfig/AppConfigKey';
import { AppConfigProviderService } from 'src/app/core/settings/AppConfigProvider.service';
import { AppConfigValue } from 'src/app/config/model/AppConfig/AppConfigValue';
import { DataportalConfigKey } from 'src/app/config/model/DataPortalConfig/DataportalConfigKey';
import { DataportalConfigProviderService } from '../../core/settings/DataportalConfigProvider.service';
import { DataportalConfigValue } from 'src/app/config/model/DataPortalConfig/DataportalConfigValue';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsProviderService {
  constructor(
    private readonly settingsProvider: DataportalConfigProviderService,
    private readonly appConfigProvider: AppConfigProviderService
  ) {}

  /**
   * Gets a specific setting by key using the settings provider
   * @param key The setting key to retrieve
   * @returns The setting value or undefined if not found
   */
  private getDataPortalByKey<K extends DataportalConfigKey>(
    key: K
  ): DataportalConfigValue<K> | undefined {
    return this.settingsProvider.getSettingByKey(key);
  }

  /**
   * Gets a specific AppConfig setting by key
   * @param key The AppConfig setting key to retrieve
   * @returns The setting value or undefined if not found
   */
  private getAppConfigSettingByKey<K extends AppConfigKey>(key: K): AppConfigValue<K> | undefined {
    return this.appConfigProvider.getSettingByKey(key);
  }

  /**
   * Gets the base URL for the application
   */
  public getBaseUrl(): string {
    return this.getAppConfigSettingByKey('baseUrl') ?? '';
  }

  /**
   * Gets the authentication base URL
   */
  public getAuthBaseUrl(): string {
    return this.getAppConfigSettingByKey('authBaseUrl');
  }

  /**
   * Gets the authentication realm
   */
  public getAuthRealm(): string {
    return this.getAppConfigSettingByKey('authRealm');
  }

  /**
   * Gets the authentication client ID
   */
  public getAuthClientId(): string {
    return this.getAppConfigSettingByKey('authClientId');
  }

  /**
   * Gets the authentication roles
   */
  public getAuthRoles(): string[] {
    return this.getAppConfigSettingByKey('authRoles') ?? [];
  }

  /**
   * Checks if a specific role is configured
   */
  public hasAuthRole(role: string): boolean {
    return this.getAuthRoles().includes(role);
  }

  /**
   * Gets the legal version
   */
  public getLegalVersion(): string {
    return this.getAppConfigSettingByKey('version') ?? '';
  }

  /**
   * Gets the copyright year
   */
  public getCopyrightYear(): string {
    return this.getAppConfigSettingByKey('copyrightYear') ?? '';
  }

  /**
   * Gets the copyright owner
   */
  public getCopyrightOwner(): string {
    return this.getAppConfigSettingByKey('copyrightOwner') ?? '';
  }

  /**
   * Gets the legal contact email
   */
  public getLegalEmail(): string {
    return this.getAppConfigSettingByKey('email') ?? '';
  }

  /**
   * Gets the complete copyright notice
   */
  public getCopyrightNotice(): string {
    const year = this.getCopyrightYear();
    const owner = this.getCopyrightOwner();
    return year && owner ? `© ${year} ${owner}` : '';
  }

  /**
   * Gets whether the options page should be shown
   */
  public getShowOptionsPage(): boolean {
    return this.getAppConfigSettingByKey('featuresShowOptionsPage') ?? false;
  }

  /**
   * Gets the roles allowed to access the options page
   */
  public getOptionsPageRoles(): string[] {
    return this.getAppConfigSettingByKey('featuresOptionPageRoles') ?? [];
  }

  /**
   * Checks if a user with given roles can access the options page
   */
  public canAccessOptionsPage(userRoles: string[]): boolean {
    if (!this.getShowOptionsPage()) {
      return false;
    }

    const requiredRoles = this.getOptionsPageRoles();
    if (requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.some((role) => userRoles.includes(role));
  }

  /**
   * Checks if a specific role can access the options page
   */
  public hasOptionsPageRole(role: string): boolean {
    return this.getOptionsPageRoles().includes(role);
  }

  /**
   * Gets the proposal portal link URL
   */
  public getProposalPortalLink(): string {
    return this.getDataPortalByKey('proposalPortalLink') ?? '';
  }

  /**
   * Gets the UI backend API URL
   */
  public getUiBackendApiUrl(): string {
    return this.getDataPortalByKey('uiBackendApiUrl') ?? '';
  }

  /**
   * Gets the DSE patient profile URL
   */
  public getDsePatientProfileUrl(): string {
    return this.getDataPortalByKey('dsePatientProfileUrl') ?? '';
  }

  /**
   * Gets the lower boundary for patient results
   */
  public getLowerBoundaryPatientResult(): number {
    return this.getDataPortalByKey('lowerboundarypatientresult') ?? 0;
  }

  /**
   * Gets the lower boundary for location results
   */
  public getLowerBoundaryLocationResult(): number {
    return this.getDataPortalByKey('lowerboundarylocationresult') ?? 0;
  }

  /**
   * Gets the polling interval configuration
   */
  public getPollingInterval(): number {
    const duration = iso8601.parse(this.getDataPortalByKey('pollingintervall'));
    return iso8601.toSeconds(duration);
  }

  /**
   * Gets the polling time configuration in milliseconds and parsed according to iso8601
   */
  public getPollingTime(): number {
    const duration = iso8601.parse(this.getDataPortalByKey('pollingtime'));
    return iso8601.toSeconds(duration);
  }

  /**
   * Gets the CCDL version
   */
  public getCcdlVersion(): string {
    return this.getDataPortalByKey('ccdlVersion') ?? '';
  }

  /** Gets the backend base URL
   */
  public getBackenBaseUrl(): string {
    return this.getAppConfigSettingByKey('backendBaseUrl') ?? '';
  }

  /**
   * Checks if the configuration is loaded and valid
   */
  public isConfigurationValid(): boolean {
    return this.getBaseUrl() !== '' && this.getAuthBaseUrl() !== '';
  }

  /**
   * Gets the configured stylesheet or an empty string if not set
   * @returns The configured stylesheet or an empty string if not set
   */
  public getStylesheet(): string | undefined {
    return this.getAppConfigSettingByKey('stylesheet');
  }
}
