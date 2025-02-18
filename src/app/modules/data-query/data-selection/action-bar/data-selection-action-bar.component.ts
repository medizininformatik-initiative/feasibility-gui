import { Component, ElementRef } from '@angular/core';
import { CRTDL2UIModelService } from 'src/app/service/Translator/CRTDL/CRTDL2UIModel.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProfileProviderService } from 'src/app/modules/data-selection/services/DataSelectionProfileProvider.service';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { DownloadDataSelectionComponent } from '../download-data-selection/download-data-selection.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'num-data-selection-action-bar',
  templateUrl: './data-selection-action-bar.component.html',
  styleUrls: ['./data-selection-action-bar.component.scss'],
})
export class DataSelectionActionBarComponent {
  isDataSelectionExistent = false;
  isCohortExistent = false;
  fileName: string;

  constructor(
    public elementRef: ElementRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private crdtlTranslatorService: CRTDL2UIModelService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private dataSelectionProfileProviderService: DataSelectionProfileProviderService
  ) {}

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
    if (this.isCohortExistent) {
      this.dialog
        .open(DownloadDataSelectionComponent, dialogConfig)
        .afterClosed()
        .subscribe(() => {
          this.snackbarService.displayInfoMessage('DATAQUERY.DATASELECTION.SUCCESS.DOWNLOAD');
        });
    } else {
      this.snackbarService.displayErrorMessageWithNoCode('DATAQUERY.DATASELECTION.ERROR.DOWNLOAD');
    }
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
    this.isDataSelectionExistent = this.crdtlTranslatorService.translateToUiModel(crtdl);
    if (!this.isDataSelectionExistent) {
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
