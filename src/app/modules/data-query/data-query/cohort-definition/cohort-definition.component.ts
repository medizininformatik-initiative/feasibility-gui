import { Component, OnInit } from '@angular/core';
import { DownloadFeasibilityQueryService } from 'src/app/service/DownloadFeasibilityQuery.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { ActiveFeasibilityQueryService } from 'src/app/service/Provider/ActiveFeasibilityQuery.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';

@Component({
  selector: 'num-cohort-definition',
  templateUrl: './cohort-definition.component.html',
  styleUrls: ['./cohort-definition.component.scss'],
})
export class CohortDefinitionComponent implements OnInit {
  fileName: string;
  isFeasibilityInclusionSet = false;
  isFeasibilityExistent = false;

  constructor(
    private routerHelperService: NavigationHelperService,
    private downloadFeasibilityQueryService: DownloadFeasibilityQueryService,
    private feasibilityQueryService: FeasibilityQueryProviderService
  ) {}

  ngOnInit() {
    this.feasibilityQueryService.getActiveFeasibilityQuery().subscribe((feasibilityQuery) => {
      if (feasibilityQuery.getInclusionCriteria().length > 0) {
        this.isFeasibilityInclusionSet = true;
      } else {
        this.isFeasibilityInclusionSet = false;
      }
      if (
        feasibilityQuery.getInclusionCriteria().length === 0 &&
        feasibilityQuery.getExclusionCriteria().length === 0
      ) {
        this.isFeasibilityExistent = false;
      } else {
        this.isFeasibilityExistent = true;
      }
    });
  }

  public sendQuery() {
    this.routerHelperService.navigateToQueryBuilderResult();
  }

  public uploadCohort(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = this.onReaderLoad.bind(this);
    reader.readAsText(file);
    this.fileName = file.name;
  }

  public onReaderLoad(event): void {
    const importQuery = JSON.parse(event.target.result);
  }

  public doDownloadQuery() {
    this.downloadFeasibilityQueryService.downloadActiveFeasibilityQueryAsFile();
  }

  public editFeasibilityQuery() {
    this.routerHelperService.navigateToQueryBuilderEditor();
  }
}
