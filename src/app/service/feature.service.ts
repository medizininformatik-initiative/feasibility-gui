import { Injectable, isDevMode } from '@angular/core'
import { AppConfigService } from '../config/app-config.service'

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(private appConfig: AppConfigService) {}

  public useFeatureMultipleValueDefinitions(): boolean {
    return this.appConfig.getConfig().features.v2.multiplevaluedefinitions
  }

  public useFeatureMultipleGroups(): boolean {
    return this.appConfig.getConfig().features.v2.multiplegroups
  }

  public useFeatureDependentGroups(): boolean {
    return this.appConfig.getConfig().features.v2.dependentgroups
  }

  public useFeatureTimeRestriction(): boolean {
    return this.appConfig.getConfig().features.v2.timerestriction
  }

  public useFeatureShowDisplayValueFilterIcon(): boolean {
    return this.appConfig.getConfig().features.extra.displayvaluefiltericon
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

  public getPollingTime(): number {
    return this.appConfig.getConfig().options.pollingtimeinseconds
  }
  public getPollingIntervall(): number {
    return this.appConfig.getConfig().options.pollingintervallinseconds
  }
}
