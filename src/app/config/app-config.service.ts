import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAppConfig } from './app-config.model';
import { FeatureProviderService } from '../modules/querybuilder/service/feature-provider.service';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly CONFIG_URL = `assets/config/config.${environment.name}.json`;

  config: IAppConfig = null;

  constructor(private http: HttpClient, private featureProviderService: FeatureProviderService) {}

  public getConfig(): IAppConfig {
    return this.config;
  }

  public loadConfig(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get<IAppConfig>(this.CONFIG_URL)
        .toPromise()
        .then((config) => {
          this.config = config;
          this.featureProviderService.initFeatures(this.config);
          return resolve();
        })
        .catch((error) => reject(`Could not load AppConfig': ${JSON.stringify(error)}`));
    });
  }
}
