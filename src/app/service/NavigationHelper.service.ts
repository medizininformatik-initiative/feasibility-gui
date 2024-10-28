import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationHelperService {
  constructor(private router: Router) {}

  public navigateToFeasibilityQueryResult(): void {
    this.router.navigate(['/feasibility-query/result'], {
      state: { preventReset: true, startPolling: true },
    });
  }

  public navigateToSavedQueries(): void {
    this.router.navigate(['/saved-queries'], { state: { preventReset: true } });
  }

  public navigateToFeasibilityQueryEditor(): void {
    this.router.navigate(['/feasibility-query/editor']);
  }

  public navigateToFeasibilityQuerySearch(): void {
    this.router.navigate(['/feasibility-query/search']);
  }

  public navigateToDataSelectionEditor(): void {
    this.router.navigate(['/data-selection/editor']);
  }

  public navigateToDataSelectionSearch(): void {
    this.router.navigate(['/data-selection/search']);
  }

  public navigateToDataQueryCohortDefinition() {
    this.router.navigate(['/data-query/cohort-definition'], { state: { preventReset: true } });
  }

  public navigateToDataQueryDataSelection() {
    this.router.navigate(['/data-query/data-selection'], { state: { preventReset: true } });
  }
}
