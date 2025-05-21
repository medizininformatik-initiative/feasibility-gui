import { CreateDataSelectionProfileService } from './DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from '../model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';
import { FeatureProviderService } from '../modules/feasibility-query/service/feature-provider.service';
import { FeatureService } from './Feature.service';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionMainProfileInitializerService {
  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private featureProvider: FeatureService
  ) {}

  /**
   * @todo set Profile in DataSelectionProviderService
   * @param patientProfileUrl
   * @returns
   */
  public initializePatientProfile(): Observable<DataSelectionProfile> {
    const mainProfileUrl = this.featureProvider.getPatientProfileUrl();
    return this.createDataSelectionProfileService
      .fetchDataSelectionProfileData([mainProfileUrl])
      .pipe(
        map((profiles) => {
          if (profiles && profiles.length > 0) {
            const profile = profiles[0];
            return profile;
          }
        })
      );
  }
}
