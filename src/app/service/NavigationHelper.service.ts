import { Injectable } from '@angular/core';
import { BasePaths, UrlPaths } from '../app-paths';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationHelperService {
  constructor(private router: Router) {}

  /** Feasibility Query Navigation */
  public navigateToFeasibilityQueryResult(): void {
    this.router.navigate([UrlPaths.feasibilityQuery.result], {
      state: { preventReset: true, startPolling: true },
    });
  }

  navigateToEditProfile(id: string): void {
    this.router.navigate([`${UrlPaths.queryEditor.feature}`, id]);
  }

  public navigateToFeasibilityQueryEditor(): void {
    this.router.navigate([UrlPaths.feasibilityQuery.editor]);
  }

  public navigateToFeasibilityQuerySearch(): void {
    this.router.navigate([UrlPaths.feasibilityQuery.search]);
  }

  public navigateToFeasibilityQueryBulkSearch(): void {
    this.router.navigate([UrlPaths.feasibilityQuery.bulkSearch]);
  }

  /** Data Selection Navigation */
  public navigateToDataSelectionEditor(): void {
    this.router.navigate([UrlPaths.dataSelection.editor]);
  }

  public navigateToDataSelectionSearch(): void {
    this.router.navigate([UrlPaths.dataSelection.search]);
  }

  /** Data Query Navigation */
  public navigateToDataQueryCohortDefinition(): void {
    this.router.navigate([UrlPaths.dataQuery.cohortDefinition], {
      state: { preventReset: true },
    });
  }

  public navigateToDataQueryDataSelection(): void {
    this.router.navigate([UrlPaths.dataQuery.dataSelection], {
      state: { preventReset: true },
    });
  }

  /** Saved Queries Navigation */
  public navigateToSavedQueries(): void {
    this.router.navigate([BasePaths.savedQueries], {
      state: { preventReset: true },
    });
  }
}
