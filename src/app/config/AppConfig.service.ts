import { AppConfigData } from './model/AppConfig/AppConfigData';
import { AppConfigProviderService } from '../core/settings/AppConfigProvider.service';
import { AssetsPath } from '../core/assets/AssetsPath';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { FeatureProviderService } from '../service/FeatureProvider.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  constructor(private http: HttpClient, private appConfigService: AppConfigProviderService) {}

  /**
   * Loads the application configuration from a remote JSON file.
   * @returns void
   */
  public loadAppConfig(): Observable<AppConfigData> {
    return this.http.get<AppConfigData>(AssetsPath.CONFIG_URL).pipe(
      map((config: AppConfigData) => {
        this.appConfigService.setAppConfigMap(config);
        return config;
      }),
      catchError((error) => {
        console.error('Could not load AppConfig', error);
        return throwError(() => new Error(`Could not load AppConfig: ${JSON.stringify(error)}`));
      })
    );
  }
}
