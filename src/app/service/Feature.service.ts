import { environment } from '../../environments/environment';
import { IAppConfig } from '../config/app-config.model';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private subject = new Subject<number>();
  private appConfig!: IAppConfig;
  private showOptionsPage = false;
  private showDataselectionPage = false;

  constructor() {}

  public initFeatureService(config: IAppConfig): Observable<boolean> {
    this.showOptionsPage = !!config.features?.extra?.showoptionspage;
    this.showDataselectionPage = !!config.features?.extra?.showdataselectionpage;
    this.appConfig = config;
    return of(true);
  }

  public useFeatureMultipleValueDefinitions(): boolean {
    return !!this.appConfig.features?.v2?.multiplevaluedefinitions;
  }

  public useFeatureMultipleGroups(): boolean {
    return !!this.appConfig.features?.v2?.multiplegroups;
  }

  public useFeatureDependentGroups(): boolean {
    return !!this.appConfig.features?.v2?.dependentgroups;
  }

  public useFeatureTimeRestriction(): boolean {
    return !!this.appConfig.features?.v2?.timerestriction;
  }

  public useFeatureShowDisplayValueFilterIcon(): boolean {
    return !!this.appConfig.features?.extra?.displayvaluefiltericon;
  }

  public useFeatureOptionsPage(): boolean {
    return this.showOptionsPage;
  }

  public useFeatureDataselectionPage(): boolean {
    return this.showDataselectionPage;
  }

  public getPollingTime(): number {
    return this.appConfig.options?.pollingtimeinseconds ?? 0;
  }

  public getPollingIntervall(): number {
    const interval = this.appConfig.options?.pollingintervallinseconds ?? 0;
    const pollingTime = this.getPollingTime();
    return interval > pollingTime ? pollingTime : interval;
  }

  public getPatientResultLowerBoundary(): number {
    return this.appConfig.options?.lowerboundarypatientresult ?? 0;
  }

  public getLocationResultLowerBoundary(): number {
    return this.appConfig.options?.lowerboundarylocationresult ?? 0;
  }

  public getFhirPort(): string {
    return this.appConfig.fhirport ?? '';
  }

  public getQueryVersion(): string {
    return this.appConfig.queryVersion ?? '';
  }

  public getStylesheet(): string {
    return this.appConfig.stylesheet ?? '';
  }

  public getSendSQContextToBackend(): boolean {
    return this.appConfig.options?.sendsqcontexttobackend ?? true;
  }

  public getDataset(): string {
    return this.appConfig.dataset ?? '';
  }

  public getProposalPortalLink(): string {
    return this.appConfig.proposalPortalLink ?? '';
  }

  public getRoles(site: string): string[] {
    if (site === 'main') {
      return this.appConfig.auth?.roles ?? [];
    }
    if (site === 'optionpage') {
      return this.appConfig.features?.extra?.optionpageroles ?? [];
    }
    return [];
  }

  public showInfoPage(): boolean {
    return !!this.appConfig.features?.extra?.displayInfoMessage;
  }

  public showUpdateInfo(): boolean {
    return !!this.appConfig.features?.extra?.displayUpdateInfo;
  }

  // Mock features (only in dev mode)
  public isDevelopMode(): boolean {
    return !environment.production;
  }

  public mockTerminology(): boolean {
    return !!this.appConfig.mock?.terminology && this.isDevelopMode();
  }

  public mockQuery(): boolean {
    return !!this.appConfig.mock?.query && this.isDevelopMode();
  }

  public mockResult(): boolean {
    return !!this.appConfig.mock?.result && this.isDevelopMode();
  }

  public mockLoadnSave(): boolean {
    return !!this.appConfig.mock?.loadnsave && this.isDevelopMode();
  }

  public getPatientProfileUrl(): string {
    return this.appConfig.options?.dsePatientProfileUrl ?? '';
  }

  public sendClickEvent(pollingTime: number): void {
    this.subject.next(pollingTime);
  }

  public getClickEvent(): Observable<number> {
    return this.subject.asObservable();
  }

  public getLegalCopyrightOwner(): string {
    return this.appConfig.legal.copyrightOwner;
  }

  public getLegalCopyrightYear(): string {
    return this.appConfig.legal.copyrightYear;
  }

  public getLegalVersion(): string {
    return this.appConfig.legal.version;
  }
}
