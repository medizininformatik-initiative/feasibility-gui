import { Injectable, isDevMode } from '@angular/core'
import { AppConfigService } from '../config/app-config.service'
import { FeatureProviderService } from '../modules/querybuilder/service/feature-provider.service'

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(
    private appConfig: AppConfigService,
    private featureProviderService: FeatureProviderService
  ) {}

  private showOptionsPage = this.appConfig.getConfig().features.extra.showoptionspage

  public useFeatureMultipleValueDefinitions(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.v2.multiplevaluedefinitions
    } else {
      return this.appConfig.getConfig().features.v2.multiplevaluedefinitions
    }
  }

  public useFeatureMultipleGroups(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.v2.multiplegroups
    } else {
      return this.appConfig.getConfig().features.v2.multiplegroups
    }
  }

  public useFeatureDependentGroups(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.v2.dependentgroups
    } else {
      return this.appConfig.getConfig().features.v2.dependentgroups
    }
  }

  public useFeatureTimeRestriction(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.v2.timerestriction
    } else {
      return this.appConfig.getConfig().features.v2.timerestriction
    }
  }

  public useFeatureShowDisplayValueFilterIcon(): boolean {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().features.extra.displayvaluefiltericon
    } else {
      return this.appConfig.getConfig().features.extra.displayvaluefiltericon
    }
  }

  public getPollingTime(): number {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().options.pollingtimeinseconds
    } else {
      return this.appConfig.getConfig().options.pollingtimeinseconds
    }
  }
  public getPollingIntervall(): number {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().options.pollingintervallinseconds
    } else {
      return this.appConfig.getConfig().options.pollingintervallinseconds
    }
  }
  public getPatientResultLowerBoundary(): number {
    return this.appConfig.getConfig().options.lowerboundarypatientresult
  }
  public getFhirPort(): string {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().fhirport
    } else {
      return this.appConfig.getConfig().fhirport
    }
  }
  public getQueryVersion(): string {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().queryVersion
    } else {
      return this.appConfig.getConfig().queryVersion
    }
  }
  public getStylesheet(): string {
    if (this.showOptionsPage) {
      return this.featureProviderService.getFeatures().stylesheet
    } else {
      return this.appConfig.getConfig().stylesheet
    }
  }
  public getDataset(): string {
    return this.appConfig.getConfig().dataset
  }

  public useFeatureOptionsPage(): boolean {
    return this.showOptionsPage
  }

  public isDevelopMode(): boolean {
    return isDevMode()
  }

  public mockTerminology(): boolean {
    return this.appConfig.getConfig().mock.terminology && this.isDevelopMode()
  }

  public mockQuery(): boolean {
    return this.appConfig.getConfig().mock.query && this.isDevelopMode()
  }

  public mockResult(): boolean {
    return this.appConfig.getConfig().mock.result && this.isDevelopMode()
  }
}
