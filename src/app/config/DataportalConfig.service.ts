import { DataportalConfigProviderService } from '../core/settings/DataportalConfigProvider.service';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SettingsApiService } from '../service/Backend/Api/SettingsApi.service';
import { DataportalConfigData } from './model/DataPortalConfig/DataportalConfigData';

@Injectable({
  providedIn: 'root',
})
export class DataportalConfigService {
  constructor(
    private settingsApiService: SettingsApiService,
    private dataPortalConfigProvider: DataportalConfigProviderService
  ) {}

  /**
   * Loads the dataportal configuration from the backend API.
   * @returns An observable of the dataportal configuration.
   */
  public loadDataportalConfig(): Observable<DataportalConfigData> {
    return this.settingsApiService
      .getSettings()
      .pipe(
        tap((config: DataportalConfigData) =>
          this.dataPortalConfigProvider.setDataportalConfig(config)
        )
      );
  }
}
