import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';
import { IAppConfig } from './app-config.model';
import { environment } from 'src/environments/environment';
import { FeatureProviderService } from '../service/FeatureProvider.service';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly CONFIG_URL = `assets/config/config.${environment.name}.json`;
  config: IAppConfig = null;

  public getConfig(): IAppConfig {
    return this.config;
  }
  constructor(private http: HttpClient, private featureProviderService: FeatureProviderService) {}

  public loadConfig(): Observable<IAppConfig> {
    return this.http.get<IAppConfig>(this.CONFIG_URL).pipe(
      tap((config) => {
        this.config = config;
        this.featureProviderService.initFeatures(this.config);
      }),
      catchError((error) => {
        console.error('Could not load AppConfig', error);
        return throwError(() => new Error(`Could not load AppConfig: ${JSON.stringify(error)}`));
      })
    );
  }
}
