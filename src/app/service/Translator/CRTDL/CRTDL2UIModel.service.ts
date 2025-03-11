import { DataExtraction2UiDataSelectionService } from '../DataExtraction/DataExtraction2UiDataSelection.service';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FeasibilityQueryProviderService } from '../../Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { StructuredQuery2FeasibilityQueryService } from '../StructureQuery/StructuredQuery2FeasibilityQuery.service';
import { ValidationService } from '../../Validation.service';
import { CRTDLData } from 'src/app/model/Interface/CRTDLData';
import { StructuredQueryData } from 'src/app/model/Interface/StructuredQueryData';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { DataExtractionData } from 'src/app/model/Interface/DataExtractionData';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { CreateCRDTLService } from './CreateCRDTL.service';
import { UiCRTDL } from 'src/app/model/UiCRTDL';

@Injectable({
  providedIn: 'root',
})
export class CRTDL2UIModelService {
  constructor(
    private dataExtraction2UiDataSelectionService: DataExtraction2UiDataSelectionService,
    private dataSelectionProvider: DataSelectionProviderService,
    private feasibilityQueryService: FeasibilityQueryProviderService,
    private structuredQuery2FeasibilityQueryService: StructuredQuery2FeasibilityQueryService,
    private validationService: ValidationService,
    private createCRDTLService: CreateCRDTLService
  ) {}

  public createCRDTLFromJson(crtdl: CRTDLData): Observable<UiCRTDL> {
    const cohortDefinition = crtdl.cohortDefinition;
    const dataExtraction = crtdl.dataExtraction;

    const translatedCohort = this.translateCohort(cohortDefinition);
    const translatedDataExtraction = this.translateDataExtraction(dataExtraction);

    return this.combineFeasibilityAndDataExtraction(translatedCohort, translatedDataExtraction);
  }

  private translateCohort(cohortDefinition: StructuredQueryData): Observable<FeasibilityQuery> {
    return this.structuredQuery2FeasibilityQueryService.translate(cohortDefinition);
  }

  private translateDataExtraction(dataExtraction: DataExtractionData): Observable<DataSelection> {
    return this.dataExtraction2UiDataSelectionService.translate(dataExtraction);
  }

  private combineFeasibilityAndDataExtraction(
    cohortDefinition: Observable<FeasibilityQuery>,
    dataExtraction: Observable<DataSelection>
  ): Observable<UiCRTDL> {
    return combineLatest([cohortDefinition, dataExtraction]).pipe(
      map(([cohort, data]) => new UiCRTDL(cohort, data))
    );
  }

  public translateToUiModel(importedCrdtl: any) {
    if (importedCrdtl.cohortDefinition?.inclusionCriteria?.length > 0) {
      this.dataExtraction2UiDataSelectionService
        .translate(importedCrdtl.dataExtraction)
        .pipe(
          map((dataSelection) => {
            this.dataSelectionProvider.setDataSelectionByUID(
              dataSelection.getId(),
              dataSelection,
              true
            );
          })
        )
        .subscribe();
      this.doValidate(importedCrdtl.cohortDefinition);
      return true;
    } else if (importedCrdtl.inclusionCriteria) {
      this.doValidate(importedCrdtl);
      return true;
    } else {
      return false;
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
              feasibilityQuery.getId(),
              true
            );
          });
      },
      (error) => {
        console.error('Validation error:', error);
      }
    );
  }
}
