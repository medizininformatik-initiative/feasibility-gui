import { inject, Injectable } from '@angular/core';
import { DataSelectionApiService } from './Backend/Api/DataSelectionApi.service';
import { FeatureProviderService } from '../modules/feasibility-query/service/feature-provider.service';
import { FeatureService } from './Feature.service';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';
import { CreateDataSelectionProfileService } from './DataSelection/CreateDataSelectionProfile.service';
import { Observable, take, tap } from 'rxjs';
import { DataSelectionProfile } from '../model/DataSelection/Profile/DataSelectionProfile';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionMainProfileInitializerService {
  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private dataSelectionApiService: DataSelectionApiService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private featureService: FeatureService
  ) {
    this.initializePatientProfile();
  }

  public initializePatientProfile(): Observable<DataSelectionProfile[]> {
    const patientUrl = this.featureService.getPatientProfileUrl();
    return this.createDataSelectionProfileService.fetchDataSelectionProfileData([patientUrl]);
  }
}
