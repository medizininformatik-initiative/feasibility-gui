import { AppConfigService } from './config/app-config.service';
import { concatMap, map, tap } from 'rxjs/operators';
import { DataSelectionMainProfileInitializerService } from './service/DataSelectionMainProfileInitializerService';
import { FeatureProviderService } from './modules/feasibility-query/service/feature-provider.service';
import { FeatureService } from './service/Feature.service';
import { IAppConfig } from './config/app-config.model';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { OAuthInitService } from './core/auth/oauth-init.service';
import { TerminologySystemProvider } from './service/Provider/TerminologySystemProvider.service';

@Injectable({ providedIn: 'root' })
export class CoreInitService {
  constructor(
    private appConfigService: AppConfigService,
    private oauthInitService: OAuthInitService,
    private dataSelectionMainProfileInitializerService: DataSelectionMainProfileInitializerService,
    private terminologySystemProvider: TerminologySystemProvider,
    private featureService: FeatureService,
    private featureProviderService: FeatureProviderService
  ) {}

  public init(): Observable<IAppConfig> {
    return this.loadConfig().pipe(
      concatMap((config) => this.initOAuth(config)),
      concatMap((config) => this.initFeatureService(config)),
      concatMap((config) => this.initFeatureProviderService(config)),
      concatMap((config) => this.initTerminologySystems(config)),
      concatMap((config) => this.initPatientProfile(config)),
      tap(() => console.log('CoreInitService complete'))
    );
  }

  private loadConfig(): Observable<IAppConfig> {
    return this.appConfigService
      .loadConfig()
      .pipe(tap((config) => console.log('Config loaded:', !!config)));
  }

  private initOAuth(config: IAppConfig): Observable<IAppConfig> {
    return this.oauthInitService.initOAuth(config).pipe(
      tap((result) => console.log('OAuth initialized:', result === true)),
      map(() => config)
    );
  }

  private initFeatureService(config: IAppConfig): Observable<IAppConfig> {
    return this.featureService.initFeatureService(config).pipe(
      tap((result) => console.log('FeatureService initialized:', result === true)),
      map(() => config)
    );
  }

  private initFeatureProviderService(config: IAppConfig): Observable<IAppConfig> {
    return this.featureProviderService.initFeatures(config).pipe(
      tap((result) => console.log('FeatureProviderService initialized:', result === true)),
      map(() => config)
    );
  }

  private initTerminologySystems(config: IAppConfig): Observable<IAppConfig> {
    return this.terminologySystemProvider.initializeTerminologySystems().pipe(
      tap((result) => console.log('TerminologySystems initialized:', result === true)),
      map(() => config)
    );
  }

  private initPatientProfile(config: IAppConfig): Observable<IAppConfig> {
    return this.dataSelectionMainProfileInitializerService
      .initializePatientProfile(this.featureService.getPatientProfileUrl())
      .pipe(
        tap((result) => console.log('PatientProfile initialized:', !!result)),
        map(() => config)
      );
  }
}
