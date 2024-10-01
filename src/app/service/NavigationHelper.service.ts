import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationHelperService {
  constructor(private router: Router) {}

  public navigateToQueryBuilderResult(): void {
    this.router.navigate(['/querybuilder/result'], {
      state: { preventReset: true, startPolling: true },
    });
  }

  public navigateToSavedQueries(): void {
    this.router.navigate(['/saved-queries'], { state: { preventReset: true } });
  }

  public navigateToQueryBuilderEditor(): void {
    this.router.navigate(['/querybuilder/editor'], { state: { jumpToStage: true } });
  }
}
