import { AppConfigService } from './config/app-config.service';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { DataSelectionMainProfileInitializerService } from './service/DataSelectionMainProfileInitializerService';
import { DataSelectionProfile } from './model/DataSelection/Profile/DataSelectionProfile';
import { FeatureProviderService } from './service/FeatureProvider.service';
import { FeatureService } from './service/Feature.service';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './config/app-config.model';
import { Injectable } from '@angular/core';
import { OAuthInitService } from './core/auth/oauth-init.service';
import { Observable, of, throwError } from 'rxjs';
import { ProvidersInitService } from './service/Provider/ProvidersInit.service';
import { TerminologySystemProvider } from './service/Provider/TerminologySystemProvider.service';
import { ActuatorApiService } from './service/Backend/Api/ActuatorApi.service';

interface PatientProfileInitResult {
  config: IAppConfig
  patientProfileResult: DataSelectionProfile
}

@Injectable({ providedIn: 'root' })
export class CoreInitService {
  constructor(
    private appConfigService: AppConfigService,
    private oauthInitService: OAuthInitService,
    private dataSelectionMainProfileInitializerService: DataSelectionMainProfileInitializerService,
    private terminologySystemProvider: TerminologySystemProvider,
    private featureService: FeatureService,
    private featureProviderService: FeatureProviderService,
    private providersInitService: ProvidersInitService,
    private http: HttpClient,
    private actuatorApiService: ActuatorApiService
  ) {}

  public init(): Observable<IAppConfig> {
    return this.loadConfig().pipe(
      concatMap((config) => this.initOAuth(config)),
      concatMap((config) => this.initFeatureService(config)),
      concatMap((config) => this.initFeatureProviderService(config)),
      concatMap((config) => this.checkBackendHealth(config)),
      concatMap((config) => this.initTerminologySystems(config)),
      concatMap((config) =>
        this.initPatientProfile(config).pipe(
          map((patientProfileResult) => ({ config, patientProfileResult }))
        )
      ),
      concatMap(({ config, patientProfileResult }) =>
        this.initializeProviders(config, patientProfileResult)
      ),
      tap(() => console.log('CoreInitService complete')),
      catchError((err) => {
        console.error('CoreInitService failed:', err);
        return throwError(() => err);
      })
    );
  }

  private loadConfig(): Observable<IAppConfig> {
    return this.appConfigService.loadConfig().pipe(
      tap((config) => console.log('Config loaded:', !!config)),
      catchError((err) => {
        console.error('Config load failed:', err);
        return throwError(() => err);
      })
    );
  }

  private initOAuth(config: IAppConfig): Observable<IAppConfig> {
    return this.oauthInitService.initOAuth(config).pipe(
      tap((result) => console.log('OAuth initialized:', result)),
      concatMap((result) =>
        result === true ? of(config) : throwError(() => new Error('OAuth initialization failed'))
      ),
      catchError((err) => {
        console.error('OAuth init failed:', err);
        return throwError(() => err);
      })
    );
  }

  private initFeatureService(config: IAppConfig): Observable<IAppConfig> {
    return this.featureService.initFeatureService(config).pipe(
      tap((result) => console.log('FeatureService initialized:', result === true)),
      concatMap((result) =>
        result === true
          ? of(config)
          : throwError(() => new Error('FeatureService initialization failed'))
      ),
      catchError((err) => {
        console.error('FeatureService init failed:', err);
        return throwError(() => err);
      })
    );
  }

  private initFeatureProviderService(config: IAppConfig): Observable<IAppConfig> {
    return this.featureProviderService.initFeatures(config).pipe(
      concatMap((result) =>
        result === true
          ? of(config)
          : throwError(() => new Error('FeatureProviderService initialization failed'))
      ),
      catchError((err) => {
        console.error('FeatureProviderService init failed:', err);
        return throwError(() => err);
      })
    );
  }

  private checkBackendHealth(config: IAppConfig): Observable<IAppConfig> {
    return this.actuatorApiService.getActuatorHealth().pipe(
      tap(() => console.log('Backend is up')),
      map(() => config),
      catchError((err) => {
        console.error('Backend health check failed:', err);
        return throwError(() => new Error('Backend is not reachable'));
      })
    );
  }

  private initTerminologySystems(config: IAppConfig): Observable<IAppConfig> {
    return this.terminologySystemProvider.initializeTerminologySystems().pipe(
      tap((result) => console.log('TerminologySystems initialized:', result === true)),
      concatMap((result) =>
        result === true
          ? of(config)
          : throwError(() => new Error('TerminologySystems initialization failed'))
      ),
      catchError((err) => {
        console.error('TerminologySystems init failed:', err);
        return throwError(() => err);
      })
    );
  }

  private initializeProviders(
    config: IAppConfig,
    patientProfileResult: DataSelectionProfile
  ): Observable<IAppConfig> {
    return this.providersInitService.initializeProviders(patientProfileResult).pipe(
      tap((result) => console.log('Providers initialized:', result === true)),
      concatMap((result) =>
        result === true
          ? of(config)
          : throwError(() => new Error('Providers initialization failed'))
      ),
      catchError((err) => {
        console.error('Providers init failed:', err);
        return throwError(() => err);
      })
    );
  }

  private initPatientProfile(config: IAppConfig): Observable<DataSelectionProfile> {
    return this.dataSelectionMainProfileInitializerService.initializePatientProfile().pipe(
      tap((result) => console.log('PatientProfile initialized:', !!result)),
      concatMap((result) =>
        !!result ? of(result) : throwError(() => new Error('PatientProfile initialization failed'))
      ),
      catchError((err) => {
        console.error('PatientProfile init failed:', err);
        return throwError(() => err);
      })
    );
  }
}
