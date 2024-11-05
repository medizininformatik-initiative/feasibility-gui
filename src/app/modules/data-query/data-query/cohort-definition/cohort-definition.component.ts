import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsentService } from '../../../../service/Consent/Consent.service';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { StructuredQuery2FeasibilityQueryService } from 'src/app/service/Translator/StructureQuery/StructuredQuery2FeasibilityQuery.service';
import { v4 as uuidv4 } from 'uuid';
import { ValidationService } from 'src/app/service/Validation.service';
import { DownloadCohortComponent } from './download-cohort/download-cohort.component';

@Component({
  selector: 'num-cohort-definition',
  templateUrl: './cohort-definition.component.html',
  styleUrls: ['./cohort-definition.component.scss'],
})
export class CohortDefinitionComponent implements OnInit {
  @Input() showActionBar;
  @Output() scrollClick = new EventEmitter();
  fileName: string;
  isFeasibilityInclusionSet = false;
  isFeasibilityExistent = false;
  totalNumberOfPatients: number;

  constructor(
    private routerHelperService: NavigationHelperService,
    private feasibilityQueryService: FeasibilityQueryProviderService,
    private structuredQuery2FeasibilityQueryService: StructuredQuery2FeasibilityQueryService,
    private validationService: ValidationService,
    private resultProviderService: ResultProviderService,
    private navigationHelperService: NavigationHelperService,
    private consentService: ConsentService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.feasibilityQueryService.getActiveFeasibilityQuery().subscribe((feasibilityQuery) => {
      const resultIdsLength = feasibilityQuery.getResultIds().length;
      this.totalNumberOfPatients = this.resultProviderService
        .getResultByID(feasibilityQuery.getResultIds()[resultIdsLength - 1])
        ?.getTotalNumberOfPatients();
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
    this.routerHelperService.navigateToFeasibilityQueryResult();
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

  public onReaderLoad(event: ProgressEvent<FileReader>): void {
    try {
      const importedQuery = JSON.parse(event.target?.result as string);
      this.doValidate(importedQuery);
    } catch (error) {
      console.error('Error parsing the file:', error);
    }
  }

  doValidate(importedQuery): void {
    this.validationService.validateStructuredQuery(importedQuery).subscribe(
      (validatedStructuredQuery) => {
        this.structuredQuery2FeasibilityQueryService
          .translate(validatedStructuredQuery)
          .subscribe((feasibilityQuery) => {
            this.feasibilityQueryService.setFeasibilityQueryByID(
              feasibilityQuery,
              feasibilityQuery.getID(),
              true
            );
          });
      },
      (error) => {
        console.error('Validation error:', error);
      }
    );
  }

  public doDownloadQuery() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(DownloadCohortComponent, dialogConfig);
  }

  public editFeasibilityQuery() {
    this.routerHelperService.navigateToFeasibilityQueryEditor();
  }

  public createNewCohort() {
    if (this.isFeasibilityExistent) {
      const feasibilityQuery = new FeasibilityQuery(uuidv4());
      this.feasibilityQueryService.setFeasibilityQueryByID(
        feasibilityQuery,
        feasibilityQuery.getID(),
        true
      );
      this.consentService.setConsent(false);
      this.consentService.setProvisionCode(false, false, false, false);
    }
    this.routerHelperService.navigateToFeasibilityQuerySearch();
  }

  public navigatToDataQueryDataSelection() {
    this.navigationHelperService.navigateToDataQueryDataSelection();
  }
}
