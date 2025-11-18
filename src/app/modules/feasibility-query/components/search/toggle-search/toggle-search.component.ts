import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';

@Component({
  selector: 'num-toggle-search',
  templateUrl: './toggle-search.component.html',
  styleUrls: ['./toggle-search.component.scss'],
})
export class ToggleSearchComponent implements OnInit {
  selectedMode: 'search' | 'bulk-search' | 'num-button';

  constructor(
    private navigationHelperService: NavigationHelperService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.url.subscribe((urlSegments) => {
      const lastSegment = urlSegments[urlSegments.length - 1].path;
      if (lastSegment === 'bulk-search') {
        this.selectedMode = 'bulk-search';
      } else {
        this.selectedMode = 'search';
      }
    });
  }

  public onNumButtonClick(): void {
    this.selectedMode = 'num-button';
    console.log('Num button clicked');
    // Add your navigation or action here
    // this.navigationHelperService.navigateToSomewhere();
  }

  public toggleSearchMode(event: MatButtonToggleChange): void {
    console.log(event.value);
    if (event.value === 'bulk-search') {
      this.navigationHelperService.navigateToFeasibilityQueryBulkSearch();
    } else if (event.value === 'search') {
      this.navigationHelperService.navigateToFeasibilityQuerySearch();
    }
  }

  public setMode(mode: 'search' | 'bulk-search'): void {
    this.selectedMode = mode;
    if (mode === 'bulk-search') {
      this.navigationHelperService.navigateToFeasibilityQueryBulkSearch();
    } else if (mode === 'search') {
      this.navigationHelperService.navigateToFeasibilityQuerySearch();
    }
  }
}
