import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CRTDL2UIModelService } from 'src/app/service/Translator/CRTDL/CRTDL2UIModel.service';
import { DataExtraction2UiDataSelectionService } from 'src/app/service/Translator/DataExtraction/DataExtraction2UiDataSelection.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { DownloadCRDTLService } from 'src/app/service/Download/DownloadCRDTL.service';
import { DownloadDataSelectionComponent } from './download-data-selection/download-data-selection.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { v4 as uuidv4 } from 'uuid';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { map } from 'rxjs';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  @Input() showActionBar;
  @Output() scrollClick = new EventEmitter();

  isDataSelectionExistent = false;
  isCohortExistent = false;

  fileName: string;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private terminologySystemProvider: TerminologySystemProvider,
    public elementRef: ElementRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private crdtlTranslatorService: CRTDL2UIModelService,
    private downloadCRDTLService: DownloadCRDTLService,
    private dialog: MatDialog,
    private dataExtraction2UiDataSelectionService: DataExtraction2UiDataSelectionService,
    private snackbarService: SnackbarService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProviderService.getActiveDataSelection().subscribe((dataSelection) => {
      this.isDataSelectionExistent = dataSelection.getProfiles().length > 0;
    });

    this.feasibilityQueryProviderService.getIsFeasibilityQueryValid().subscribe((isValid) => {
      this.isCohortExistent = isValid;
    });
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
    if (this.isCohortExistent) {
      this.dialog
        .open(DownloadDataSelectionComponent, dialogConfig)
        .afterClosed()
        .subscribe(() => {
          this.snackbarService.displayInfoMessage('DATAQUERY.DATASELECTION.SUCCESS.DOWLOAD');
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
