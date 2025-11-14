import { Injectable } from '@angular/core';
import { BasePaths, UrlPaths } from '../app-paths';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationHelperService {
  constructor(private router: Router) {}

  /**
   * Navigates to {@link UrlPaths.feasibilityQuery.result | /feasibility-query/result}
   * @returns void
   */
  public navigateToFeasibilityQueryResult(): void {
    this.router.navigate([UrlPaths.feasibilityQuery.result], {
      state: { preventReset: true, startPolling: true },
    });
  }

  /**
   * Navigates to {@link UrlPaths.feasibilityQuery.editor | /feasibility-query/editor}
   * @param id - The query profile identifier
   * @returns void
   */
  public navigateToEditProfile(id: string): void {
    this.router.navigate([`${UrlPaths.queryEditor.feature}`, id]);
  }

  /**
   * Navigates to {@link UrlPaths.feasibilityQuery.editor | /feasibility-query/editor}
   * @returns void
   */
  public navigateToFeasibilityQueryEditor(): void {
    this.router.navigate([UrlPaths.feasibilityQuery.editor]);
  }

  /**
   * Navigates to {@link UrlPaths.feasibilityQuery.search | /feasibility-query/search}
   * @returns void
   */
  public navigateToFeasibilityQuerySearch(): void {
    this.router.navigate([UrlPaths.feasibilityQuery.search]);
  }

  /**
   * Navigates to {@link UrlPaths.dataSelection.editor | /data-selection/editor}
   * @returns void
   */
  public navigateToDataSelectionEditor(): void {
    this.router.navigate([UrlPaths.dataSelection.editor]);
  }

  /**
   * Navigates to {@link UrlPaths.dataSelection.search | /data-selection/search}
   * @returns void
   */
  public navigateToDataSelectionSearch(): void {
    this.router.navigate([UrlPaths.dataSelection.search]);
  }

  /**
   * Navigates to {@link UrlPaths.dataQuery.cohortDefinition | /data-query/cohort-definition}
   * @returns void
   */
  public navigateToDataQueryCohortDefinition(): void {
    this.router.navigate([UrlPaths.dataQuery.cohortDefinition], {
      state: { preventReset: true },
    });
  }

  /**
   * Navigates to {@link UrlPaths.dataQuery.dataSelection | /data-query/data-selection}
   * @returns void
   */
  public navigateToDataQueryDataSelection(): void {
    this.router.navigate([UrlPaths.dataQuery.dataSelection], {
      state: { preventReset: true },
    });
  }

  /**
   * Navigates to {@link BasePaths.savedQueries | /saved-queries}
   * @returns void
   */
  public navigateToSavedQueries(): void {
    this.router.navigate([BasePaths.savedQueries], {
      state: { preventReset: true },
    });
  }
}
