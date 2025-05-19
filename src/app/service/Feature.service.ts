import { AppConfigService } from '../config/app-config.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FeatureProviderService } from '../modules/feasibility-query/service/feature-provider.service';

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
  private showDataselectionPage = this.appConfig.getConfig().features.extra.showdataselectionpage;

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
      const pollingIntervallinSeconds =
        this.featureProviderService.getFeatures().options.pollingintervallinseconds;
      if (pollingIntervallinSeconds > this.getPollingTime()) {
        return this.getPollingTime();
      }
      return this.featureProviderService.getFeatures().options.pollingintervallinseconds;
    } else {
      const pollingIntervallinSeconds = this.appConfig.getConfig().options.pollingintervallinseconds;
      if (pollingIntervallinSeconds > this.getPollingTime()) {
        return this.getPollingTime();
      }
      return pollingIntervallinSeconds;
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

  public getSendSQContextToBackend(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().options.sendsqcontexttobackend !== undefined
        ? this.featureProviderService.getFeatures().options.sendsqcontexttobackend
        : true;
    } else {
      return this.appConfig.getConfig().options.sendsqcontexttobackend !== undefined
        ? this.appConfig.getConfig().options.sendsqcontexttobackend
        : true;
    }
  }

  public getDataset(): string {
    return this.appConfig.getConfig().dataset;
  }
  public getproposalPortalLink(): string {
    return this.appConfig.getConfig().proposalPortalLink;
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

  public useFeatureDataselectionPage(): boolean {
    return this.showDataselectionPage;
  }

  public isDevelopMode(): boolean {
    return !environment.production;
  }

  public showInfoPage(): boolean {
    return this.appConfig.getConfig().features.extra.displayInfoMessage;
  }

  public showUpdateInfo(): boolean {
    return this.appConfig.getConfig().features.extra.displayUpdateInfo;
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

  public getPatientProfileUrl(): string {
    return this.appConfig.getConfig().options.dsePatientProfileUrl;
  }

  sendClickEvent(pollingTime: number): void {
    this.subject.next(pollingTime);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
