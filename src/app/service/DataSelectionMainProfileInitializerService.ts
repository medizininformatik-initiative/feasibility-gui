import { CreateDataSelectionProfileService } from './DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from '../model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataSelectionMainProfileProviderService } from './DataSelectionMainProfileProvider.service';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionMainProfileInitializerService {
  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private profileProvider: DataSelectionMainProfileProviderService
  ) {}

  public initializePatientProfile(patientProfileUrl: string): Observable<DataSelectionProfile[]> {
    return this.createDataSelectionProfileService
      .fetchDataSelectionProfileData([patientProfileUrl])
      .pipe(
        tap((profiles) => {
          if (profiles && profiles.length > 0) {
            this.profileProvider.setPatientProfile(profiles[0]);
          }
        })
      );
  }
}
