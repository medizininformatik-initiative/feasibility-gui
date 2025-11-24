import { AppSettingsProviderService } from './Config/AppSettingsProvider.service';
import { CreateDataSelectionProfileService } from './DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from '../model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionMainProfileInitializerService {
  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private appSettingsProviderService: AppSettingsProviderService
  ) {}

  /**
   * @todo set Profile in DataSelectionProviderService
   * @param patientProfileUrl
   * @returns Observable<DataSelectionProfile>
   */
  public initializePatientProfile(): Observable<DataSelectionProfile> {
    const mainProfileUrl = this.appSettingsProviderService.getDsePatientProfileUrl();
    return this.createDataSelectionProfileService
      .fetchDataSelectionProfileData([mainProfileUrl])
      .pipe(
        filter((profiles) => !!profiles && profiles.length > 0),
        map((profiles) => profiles[0])
      );
  }
}
