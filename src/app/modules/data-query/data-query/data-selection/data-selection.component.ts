import { CRTDL2UIModelService } from 'src/app/service/Translator/CRTDL/CRTDL2UIModel.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { DownloadDataSelectionComponent } from './download-data-selection/download-data-selection.component';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { v4 as uuidv4 } from 'uuid';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSelectionProfileProviderService } from 'src/app/modules/data-selection/services/DataSelectionProfileProvider.service';
import { map, Observable } from 'rxjs';
import { FeasibilityQueryValidation } from 'src/app/service/Criterion/FeasibilityQueryValidation.service';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  @Input() showActionBar;
  @Output()
  scrollClick = new EventEmitter();

  isDataSelectionExistent$: Observable<boolean>;
  isCohortExistent$: Observable<boolean>;

  fileName: string;
  constructor(
    private terminologySystemProvider: TerminologySystemProvider,
    public elementRef: ElementRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private crdtlTranslatorService: CRTDL2UIModelService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService,
    private dataSelectionProfileProviderService: DataSelectionProfileProviderService,
    private feasibilityQueryValidation: FeasibilityQueryValidation
  ) {}

  ngOnInit(): void {
    this.isDataSelectionExistent$ = this.dataSelectionProviderService
      .getActiveDataSelection()
      .pipe(map((dataSelection) => dataSelection.getProfiles().length > 0));

    this.isCohortExistent$ = this.feasibilityQueryValidation.getIsFeasibilityQueryValid();
  }

  public editDataSelection() {
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  public createNewDataSelection() {
    const dataSelection = new DataSelection([], uuidv4());
    this.dataSelectionProviderService.setDataSelectionByUID(
      dataSelection.getId(),
      dataSelection,
      true
    );
    this.navigationHelperService.navigateToDataSelectionSearch();
  }

  public downloadCRDTL(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.isCohortExistent$
      .pipe(
        map((isCohortExistent) => {
          if (isCohortExistent) {
            this.dialog
              .open(DownloadDataSelectionComponent, dialogConfig)
              .afterClosed()
              .subscribe(() => {
                this.snackbarService.displayInfoMessage('DATAQUERY.DATASELECTION.SUCCESS.DOWNLOAD');
              });
          } else {
            this.snackbarService.displayErrorMessageWithNoCode(
              'DATAQUERY.DATASELECTION.ERROR.DOWNLOAD'
            );
          }
        })
      )
      .subscribe();
  }

  public onFileSelected(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = this.onReaderLoad.bind(this);
      reader.readAsText(file);
    }
  }

  public uploadDataSelection(crtdl: string) {
    this.dataSelectionProfileProviderService.resetDataSelectionProfileMap();
    const isDataSelectionValid = this.crdtlTranslatorService.translateToUiModel(crtdl);
    if (!isDataSelectionValid) {
      this.snackbarService.displayErrorMessageWithNoCode('DATAQUERY.DATASELECTION.ERROR.UPLOAD');
    } else {
      this.snackbarService.displayInfoMessage('DATAQUERY.DATASELECTION.SUCCESS.UPLOAD');
    }
  }

  public onReaderLoad(event: ProgressEvent<FileReader>): void {
    try {
      const importedQuery = JSON.parse(event.target?.result as string);
      this.uploadDataSelection(importedQuery);
    } catch (error) {
      console.error('Error parsing the file:', error);
    }
  }

  public navigateToDataQueryCohortDefinition() {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
