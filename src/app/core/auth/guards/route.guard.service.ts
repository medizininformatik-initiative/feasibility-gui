import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { Injectable } from '@angular/core';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable, of } from 'rxjs';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { PathSegments } from 'src/app/app-paths';

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {
  constructor(
    private criterionProviderService: CriterionProviderService,
    private navigationHelperService: NavigationHelperService,
    private profileService: ProfileProviderService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    const url = route.url[0]?.path;
    if (url === PathSegments.profile) {
      return this.handleProfile(id);
    } else if (url === PathSegments.criterion) {
      return this.handleCriterion(id);
    }
  }

  private handleProfile(id: string) {
    const canRoute = this.profileService.getProfileById(id) ? true : false;
    if (!canRoute) {
      this.navigationHelperService.navigateToDataSelectionSearch();
      return of(false);
    } else {
      of(true);
    }
  }

  private handleCriterion(id: string) {
    const canRoute = this.criterionProviderService.getCriterionByUID(id) ? true : false;
    if (!canRoute) {
      this.navigationHelperService.navigateToFeasibilityQuerySearch();
      return of(false);
    } else {
      of(true);
    }
  }
}
