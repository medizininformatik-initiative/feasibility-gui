import { CreateDataSelectionProfileService } from './DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from '../model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionMainProfileInitializerService {
  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private dataSelectionProvider: DataSelectionProviderService
  ) {}

  /**
   * @todo set Profile in DataSelectionProviderService
   * @param patientProfileUrl
   * @returns
   */
  public initializePatientProfile(patientProfileUrl: string): Observable<DataSelectionProfile> {
    return this.createDataSelectionProfileService
      .fetchDataSelectionProfileData([patientProfileUrl])
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
