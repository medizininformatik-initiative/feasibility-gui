import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { ProviderNavigationService } from './ProviderNavigation.service';
import { NavigationHelperService } from './NavigationHelper.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileProviderIteratorService {
  constructor(
    private profileProviderService: ProfileProviderService,
    private providerNavigationService: ProviderNavigationService,
    private navigationHelperService: NavigationHelperService
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
  public navigateToNextProfile(currentId: string): void {
    this.profileProviderService
      .getProfileIdMap()
      .pipe(
        map((profileMap) => {
          const nextProfile = this.providerNavigationService.getNextElementFromMap(
            profileMap,
            currentId
          );
          if (nextProfile) {
            this.navigationHelperService.navigateToEditProfile(nextProfile.getId());
          }
        })
      )
      .subscribe();
  }

  /**
   * Navigates to the previous profile.
   * @param currentId The current profile ID.
   */
  public navigateToPreviousProfile(currentId: string): void {
    this.profileProviderService
      .getProfileIdMap()
      .pipe(
        map((profileMap) => {
          const previousProfile = this.providerNavigationService.getPreviousElementFromMap(
            profileMap,
            currentId
          );
          if (previousProfile) {
            this.navigationHelperService.navigateToEditProfile(previousProfile.getId());
          }
        })
      )
      .subscribe();
  }
}
