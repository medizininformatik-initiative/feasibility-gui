import { Component, OnInit,EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { StructuredQuery2FeasibilityQueryService } from 'src/app/service/Translator/StructureQuery/StructuredQuery2FeasibilityQuery.service';
import { v4 as uuidv4 } from 'uuid';
import { ValidationService } from 'src/app/service/Validation.service';

@Component({
  selector: 'num-cohort-definition',
  templateUrl: './cohort-definition.component.html',
  styleUrls: ['./cohort-definition.component.scss'],
})
export class CohortDefinitionComponent implements OnInit {
  @Input() showActionBar
  @Output() scrollClick = new EventEmitter();
  fileName: string;
  isFeasibilityInclusionSet = false;
  isFeasibilityExistent = false;

  constructor(
    public elementRef: ElementRef,
    private routerHelperService: NavigationHelperService,
    private downloadCCDLService: DownloadCCDLService,
    private feasibilityQueryService: FeasibilityQueryProviderService,
    private structuredQuery2FeasibilityQueryService: StructuredQuery2FeasibilityQueryService,
    private validationService: ValidationService
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
    this.downloadCCDLService.downloadActiveFeasibilityQueryAsFile();
  }

  public editFeasibilityQuery() {
    this.routerHelperService.navigateToQueryBuilderEditor();
  }

  public createNewCohort() {
    if (this.isFeasibilityExistent) {
      const feasibilityQuery = new FeasibilityQuery(uuidv4());
      this.feasibilityQueryService.setFeasibilityQueryByID(
        feasibilityQuery,
        feasibilityQuery.getID(),
        true
      );
    }
    this.routerHelperService.navigateToQueryBuilderEditor();
  }

  scroll() {
    this.showActionBar = false;
    this.scrollClick.emit(false);
  }
}
