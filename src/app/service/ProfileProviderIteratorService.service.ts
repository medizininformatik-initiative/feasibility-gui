import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NavigationHelperService } from './NavigationHelper.service';
import { Observable } from 'rxjs';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { ProviderNavigationService } from './ProviderNavigation.service';
import { StagedProfileService } from './StagedDataSelectionProfile.service';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileProviderIteratorService {
  constructor(
    private profileProviderService: ProfileProviderService,
    private providerNavigationService: ProviderNavigationService,
    private navigationHelperService: NavigationHelperService,
    private stagedProfileService: StagedProfileService,
    private dataSelectionProvider: DataSelectionProviderService
  ) {}

  public getNextElementExists(currentId: string): Observable<boolean> {
    return this.dataSelectionProvider.getActiveDataSelection().pipe(
      map((dataSelection) => {
        const profiles = dataSelection.getProfiles();
        const index = profiles.findIndex((profile) => profile.getId() === currentId);
        return index < profiles.length - 1;
      })
    );
  }

  public getPreviousElementExists(currentId: string): Observable<boolean> {
    return this.dataSelectionProvider.getActiveDataSelection().pipe(
      map((dataSelection) => {
        const profiles = dataSelection.getProfiles();
        const index = profiles.findIndex((profile) => profile.getId() === currentId);
        return index > 0;
      })
    );
  }
  public navigateToNextProfile(currentId: string): Observable<void> {
    return this.dataSelectionProvider.getActiveDataSelection().pipe(
      map((dataSelection) => {
        const profiles = dataSelection.getProfiles();
        const index = profiles.findIndex((profile) => profile.getId() === currentId);

        if (index < profiles.length - 1) {
          const nextId = profiles[index + 1].getId();
          this.navigationHelperService.navigateToEditProfile(nextId);
          this.stagedProfileService.initialize(nextId);
        }
      })
    );
  }
  public navigateToPreviousProfile(currentId: string): Observable<void> {
    return this.dataSelectionProvider.getActiveDataSelection().pipe(
      map((dataSelection) => {
        const profiles = dataSelection.getProfiles();
        const index = profiles.findIndex((profile) => profile.getId() === currentId);

        if (index > 0) {
          const nextId = profiles[index - 1].getId();
          this.navigationHelperService.navigateToEditProfile(nextId);
          this.stagedProfileService.initialize(nextId);
        }
      })
    );
  }
}
