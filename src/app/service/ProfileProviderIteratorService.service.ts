import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { NavigationHelperService } from './NavigationHelper.service';
import { Observable } from 'rxjs';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { ProviderNavigationService } from './ProviderNavigation.service';
import { StagedProfileService } from './StagedDataSelectionProfile.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileProviderIteratorService {
  constructor(
    private profileProviderService: ProfileProviderService,
    private providerNavigationService: ProviderNavigationService,
    private navigationHelperService: NavigationHelperService,
    private stagedProfileService: StagedProfileService
  ) {}

  /**
   * Checks if the next profile exists.
   * @param currentId The current profile ID.
   * @returns An observable that emits `true` if the next profile exists, otherwise `false`.
   */
  public getNextElementExists(currentId: string): Observable<boolean> {
    return this.profileProviderService.getProfileIdMap().pipe(
      map((profileMap) => {
        const nextProfile = this.providerNavigationService.getNextElementFromMap(
          profileMap,
          currentId
        );
        return !!nextProfile;
      })
    );
  }

  /**
   * Checks if the previous profile exists.
   * @param currentId The current profile ID.
   * @returns An observable that emits `true` if the previous profile exists, otherwise `false`.
   */
  public getPreviousElementExists(currentId: string): Observable<boolean> {
    return this.profileProviderService.getProfileIdMap().pipe(
      map((profileMap) => {
        const previousProfile = this.providerNavigationService.getPreviousElementFromMap(
          profileMap,
          currentId
        );
        return !!previousProfile;
      })
    );
  }

  /**
   * Navigates to the next profile.
   * @param currentId The current profile ID.
   */
  public navigateToNextProfile(currentId: string): Observable<void> {
    return this.profileProviderService.getProfileIdMap().pipe(
      take(1),
      map((profileMap) => {
        const nextProfile = this.providerNavigationService.getNextElementFromMap(
          profileMap,
          currentId
        );
        if (nextProfile) {
          this.navigationHelperService.navigateToEditProfile(nextProfile.getId());
          this.stagedProfileService.initialize(nextProfile);
        }
      })
    );
  }

  /**
   * Navigates to the previous profile.
   * @param currentId The current profile ID.
   */
  public navigateToPreviousProfile(currentId: string): Observable<void> {
    return this.profileProviderService.getProfileIdMap().pipe(
      take(1),
      map((profileMap) => {
        const previousProfile = this.providerNavigationService.getPreviousElementFromMap(
          profileMap,
          currentId
        );
        if (previousProfile) {
          this.navigationHelperService.navigateToEditProfile(previousProfile.getId());
          this.stagedProfileService.initialize(previousProfile);
        }
      })
    );
  }
}
