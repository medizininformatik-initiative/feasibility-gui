import { CCDLUploadService } from 'src/app/service/FileUpload/CCDLUpload.service';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { DataSelectionInstanceService } from 'src/app/service/DataSelection/DataSelectionInstance.service';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { DownloadCRDTLService } from 'src/app/service/Download/DownloadCRDTL.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { map } from 'rxjs/operators';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'num-data-selection-action-bar',
  templateUrl: './data-selection-action-bar.component.html',
  styleUrls: ['./data-selection-action-bar.component.scss'],
})
export class DataSelectionActionBarComponent implements OnDestroy, OnInit {
  isDataSelectionExistent$: Observable<boolean>;
  isCohortExistent$: Observable<boolean>;
  fileName: string;
  private subscription: Subscription;

  constructor(
    public elementRef: ElementRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private ccdlUploadService: CCDLUploadService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService,
    private dataSelectionInstanceService: DataSelectionInstanceService,
    private downloadCRDTLService: DownloadCRDTLService
  ) {}

  ngOnInit(): void {
    this.isDataSelectionExistent$ = this.dataSelectionProviderService
      .getActiveDataSelection()
      .pipe(map((dataSelection) => dataSelection.getProfiles().length > 0));

    this.isCohortExistent$ = this.feasibilityQueryProviderService.getIsFeasibilityQueryValid();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  public editDataSelection() {
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  public createNewDataSelection() {
    this.dataSelectionInstanceService.instantiate();
    this.navigationHelperService.navigateToDataSelectionSearch();
  }

  public downloadCRDTL(): void {
    this.subscription = this.isCohortExistent$.subscribe((isCohortExistent) => {
      this.downloadCRDTLService.openDownloadDialog(isCohortExistent);
    });
  }

  public uploadCCDL(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.ccdlUploadService.uploadCCDL(file);
  }

  public navigateToDataQueryCohortDefinition() {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
