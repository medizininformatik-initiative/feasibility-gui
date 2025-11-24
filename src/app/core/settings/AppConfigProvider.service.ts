import { AppConfigData } from 'src/app/config/model/AppConfig/AppConfigData';
import { AppConfigKey } from 'src/app/config/model/AppConfig/AppConfigKey';
import { AppConfigValue } from 'src/app/config/model/AppConfig/AppConfigValue';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigProviderService {
  private appConfigMap = new Map<AppConfigKey, AppConfigValue<AppConfigKey>>();
  private appConfigMapSubject = new BehaviorSubject<
    Map<AppConfigKey, AppConfigValue<AppConfigKey>>
  >(new Map());

  constructor() {}

  /**
   * Get the settings map as an observable.
   * @returns An observable of the settings map.
   */
  public getSettingsMap(): Observable<Map<AppConfigKey, AppConfigValue<AppConfigKey>>> {
    return this.appConfigMapSubject.asObservable();
  }

  public setAppConfigMap(appConfig: AppConfigData): void {
    if (this.appConfigMap.size > 0) {
      console.warn('[AppConfigProviderService] Attempt to overwrite locked settings ignored.');
      return;
    }
    const appConfigMap = new Map(
      Object.entries(appConfig) as [AppConfigKey, AppConfigValue<AppConfigKey>][]
    );
    this.appConfigMap = appConfigMap;
    this.appConfigMapSubject.next(appConfigMap);
  }

  /**
   * Get a specific setting by key.
   */
  public getSettingByKey<K extends AppConfigKey>(key: K): AppConfigValue<K> | undefined {
    return this.appConfigMap.get(key) as AppConfigValue<K> | undefined;
  }
}
