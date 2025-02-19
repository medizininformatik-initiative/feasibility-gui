import { CohortFileUploadService } from 'src/app/service/FileUpload/CohortFileUpload.service';
import { Component, OnInit } from '@angular/core';
import { DownloadCohortComponent } from '../download-cohort/download-cohort.component';
import { FeasibilityQueryInstanceService } from 'src/app/service/FeasibilityQuery/FeasibilityQueryInstance.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable } from 'rxjs';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';

@Component({
  selector: 'num-cohort-definition-action-bar',
  templateUrl: './cohort-definition-action-bar.component.html',
  styleUrls: ['./cohort-definition-action-bar.component.scss'],
})
export class CohortDefinitionActionBarComponent implements OnInit {
  fileName: string;
  isFeasibilityInclusionSet: Observable<boolean>;
  isFeasibilityExistent: Observable<boolean>;
  isFeasibilityQueryValid: Observable<boolean>;
  totalNumberOfPatients: number;

  constructor(
    private routerHelperService: NavigationHelperService,
    private feasibilityQueryService: FeasibilityQueryProviderService,
    private resultProviderService: ResultProviderService,
    private navigationHelperService: NavigationHelperService,
    private dialog: MatDialog,
    private terminologySystemProvider: TerminologySystemProvider,
    private feasibilityQueryInstanceService: FeasibilityQueryInstanceService,
    private cohortFileUploadService: CohortFileUploadService
  ) {}

  ngOnInit() {
    this.feasibilityQueryService.getActiveFeasibilityQuery().subscribe((feasibilityQuery) => {
      const resultIdsLength = feasibilityQuery.getResultIds().length;
      this.totalNumberOfPatients = this.resultProviderService
        .getResultByID(feasibilityQuery.getResultIds()[resultIdsLength - 1])
        ?.getTotalNumberOfPatients();
    });

    this.isFeasibilityInclusionSet = this.feasibilityQueryService.getIsInclusionSet();
    this.isFeasibilityExistent = this.feasibilityQueryService.getIsFeasibilityQuerySet();
    this.isFeasibilityQueryValid = this.feasibilityQueryService.getIsFeasibilityQueryValid();
  }

  public uploadCohort(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.cohortFileUploadService.uploadCohort(file);
  }

  public sendQuery(): void {
    this.routerHelperService.navigateToFeasibilityQueryResult();
  }

  public downloadCohort(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(DownloadCohortComponent, dialogConfig);
  }

  public editFeasibilityQuery(): void {
    this.routerHelperService.navigateToFeasibilityQueryEditor();
  }

  public createNewCohort(): void {
    this.feasibilityQueryInstanceService.instantiate();
    this.routerHelperService.navigateToFeasibilityQuerySearch();
  }

  public navigatToDataQueryDataSelection(): void {
    this.navigationHelperService.navigateToDataQueryDataSelection();
  }
}
