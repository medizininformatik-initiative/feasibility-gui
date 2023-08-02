import { Injectable, isDevMode } from '@angular/core';
import { AppConfigService } from '../config/app-config.service';
import { FeatureProviderService } from '../modules/querybuilder/service/feature-provider.service';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(
    private appConfig: AppConfigService,
    private featureProviderService: FeatureProviderService
  ) {}

  private subject = new Subject<any>();
  private showOptionsPage = this.appConfig.getConfig().features.extra.showoptionspage;

  public useFeatureMultipleValueDefinitions(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.v2.multiplevaluedefinitions;
    } else {
      return this.appConfig.getConfig().features.v2.multiplevaluedefinitions;
    }
  }

  public useFeatureMultipleGroups(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.v2.multiplegroups;
    } else {
      return this.appConfig.getConfig().features.v2.multiplegroups;
    }
  }

  public useFeatureDependentGroups(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.v2.dependentgroups;
    } else {
      return this.appConfig.getConfig().features.v2.dependentgroups;
    }
  }

  public useFeatureTimeRestriction(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.v2.timerestriction;
    } else {
      return this.appConfig.getConfig().features.v2.timerestriction;
    }
  }

  public useFeatureShowDisplayValueFilterIcon(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.extra.displayvaluefiltericon;
    } else {
      return this.appConfig.getConfig().features.extra.displayvaluefiltericon;
    }
  }

  public getPollingTime(): number {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().options.pollingtimeinseconds;
    } else {
      return this.appConfig.getConfig().options.pollingtimeinseconds;
    }
  }
  public getPollingIntervall(): number {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().options.pollingintervallinseconds;
    } else {
      return this.appConfig.getConfig().options.pollingintervallinseconds;
    }
  }
  public getPatientResultLowerBoundary(): number {
    return this.appConfig.getConfig().options.lowerboundarypatientresult;
  }
  public getLocationResultLowerBoundary(): number {
    return this.appConfig.getConfig().options.lowerboundarylocationresult;
  }
  public getFhirPort(): string {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().fhirport;
    } else {
      return this.appConfig.getConfig().fhirport;
    }
  }
  public getQueryVersion(): string {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().queryVersion;
    } else {
      return this.appConfig.getConfig().queryVersion;
    }
  }
  public getStylesheet(): string {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().stylesheet;
    } else {
      return this.appConfig.getConfig().stylesheet;
    }
  }

  public getSqToBackend() {
    return this.appConfig.getConfig().options.sqContextBackend;
  }

  public getDataset(): string {
    return this.appConfig.getConfig().dataset;
  }
  public getRoles(site: string): string[] {
    if (site === 'main') {
      return this.appConfig.getConfig().auth.roles;
    }
    if (site === 'optionpage') {
      return this.appConfig.getConfig().features.extra.optionpageroles;
    }
  }
  public useFeatureOptionsPage(): boolean {
    return this.showOptionsPage;
  }

  public isDevelopMode(): boolean {
    //return isDevMode();
    return !environment.production;
  }

  public showInfoPage(): boolean {
    //return isDevMode();
    return this.appConfig.getConfig().features.extra.displayInfoMessage;
  }

  public mockTerminology(): boolean {
    return this.appConfig.getConfig().mock.terminology && this.isDevelopMode();
  }

  public mockQuery(): boolean {
    return this.appConfig.getConfig().mock.query && this.isDevelopMode();
  }

  public mockResult(): boolean {
    return this.appConfig.getConfig().mock.result && this.isDevelopMode();
  }

  public mockLoadnSave(): boolean {
    return this.appConfig.getConfig().mock.loadnsave && this.isDevelopMode();
  }

  sendClickEvent(pollingTime: number): void {
    this.subject.next(pollingTime);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
