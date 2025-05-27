import { CRTDL2UIModelService } from 'src/app/service/Translator/CRTDL/CRTDL2UIModel.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { DownloadDataSelectionComponent } from './download-data-selection/download-data-selection.component';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';
import { v4 as uuidv4 } from 'uuid';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { FeasibilityQueryValidation } from 'src/app/service/Criterion/FeasibilityQueryValidation.service';
import { CRTDLData } from '../../../../model/Interface/CRTDLData';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { DataSelectionMainProfileInitializerService } from '../../../../service/DataSelectionMainProfileInitializerService';
import { SaveDataQueryModalService } from 'src/app/service/SaveDataQueryModal.service';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit, OnDestroy {
  @Input() showActionBar;
  @Output()
  scrollClick = new EventEmitter();

  saveDataQueryModalSubscription: Subscription;

  isDataSelectionExistent$: Observable<boolean>;
  isCohortExistent$: Observable<boolean>;

  downloadSubscription: Subscription;
  translatedCRTLDSubscription: Subscription;
  fileName: string;
  createDSSubscription: Subscription;
  constructor(
    public elementRef: ElementRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private crdtlTranslatorService: CRTDL2UIModelService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService,
    private profileProviderService: ProfileProviderService,
    private feasibilityQueryValidation: FeasibilityQueryValidation,
    private dataSelectionMainInitializer: DataSelectionMainProfileInitializerService,
    private saveDataQueryModalService: SaveDataQueryModalService
  ) {}

  ngOnInit(): void {
    this.isDataSelectionExistent$ = this.dataSelectionProviderService
      .getActiveDataSelection()
      .pipe(map((dataSelection) => dataSelection.getProfiles().length > 0));

    this.isCohortExistent$ = this.feasibilityQueryValidation.getIsFeasibilityQueryValid();
  }

  ngOnDestroy(): void {
    this.downloadSubscription?.unsubscribe();
    this.translatedCRTLDSubscription?.unsubscribe();
    this.createDSSubscription?.unsubscribe();
  }

  public editDataSelection() {
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  public createNewDataSelection() {
    this.createDSSubscription?.unsubscribe();
    this.createDSSubscription = this.dataSelectionMainInitializer
      .initializePatientProfile()
      .subscribe((dataSelectionProfile) => {
        this.dataSelectionProviderService.initializeDataSelectionInstance(dataSelectionProfile);
        this.navigationHelperService.navigateToDataSelectionSearch();
      });
  }

  public downloadCRDTL(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.downloadSubscription?.unsubscribe();
    this.downloadSubscription = this.isCohortExistent$
      .pipe(
        take(1),
        map((isCohortExistent) => {
          if (isCohortExistent) {
            this.dialog
              .open(DownloadDataSelectionComponent, dialogConfig)
              .afterClosed()
              .pipe(take(1))
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

  public uploadDataSelection(crtdl: CRTDLData) {
    this.translatedCRTLDSubscription?.unsubscribe();
    this.profileProviderService.resetProfileMap();
    if (crtdl.cohortDefinition?.inclusionCriteria?.length > 0) {
      this.translatedCRTLDSubscription = this.crdtlTranslatorService
        .createCRDTLFromJson(crtdl)
        .subscribe((uiCRTDL) => {
          if (uiCRTDL?.getFeasibilityQuery()?.getInclusionCriteria()?.length > 0) {
            this.snackbarService.displayInfoMessage('DATAQUERY.DATASELECTION.SUCCESS.UPLOAD');
          } else {
            this.snackbarService.displayErrorMessageWithNoCode(
              'DATAQUERY.DATASELECTION.ERROR.UPLOAD'
            );
          }
        });
    } else {
      this.snackbarService.displayErrorMessageWithNoCode('DATAQUERY.DATASELECTION.ERROR.UPLOAD');
    }
  }

  public saveDataQuery(): void {
    this.saveDataQueryModalSubscription?.unsubscribe();
    this.saveDataQueryModalSubscription = this.saveDataQueryModalService
      .openSaveDataQueryModal()
      .subscribe();
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
