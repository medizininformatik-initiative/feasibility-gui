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

  public navigateToFeasibilityQueryEditor(jumpToStage: boolean = false): void {
    this.router.navigate(['/feasibility-query/editor'], { state: { jumpToStage } });
  }

  public navigateToFeasibilityQuerySearch(): void {
    this.router.navigate(['/feasibility-query/search']);
  }

  public navigateToDataSelectionEditor(): void {
    this.router.navigate(['/data-selection'], { state: { jumpToStage: true } });
  }

  public navigateToDataQueryEditor() {
    this.router.navigate(['/data-query'], { state: { preventReset: true } });
  }
}
