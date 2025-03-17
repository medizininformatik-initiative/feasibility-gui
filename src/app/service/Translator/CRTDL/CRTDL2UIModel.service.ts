import { combineLatest, map, Observable, of } from 'rxjs';
import { CreateCRDTLService } from './CreateCRDTL.service';
import { CRTDLData } from 'src/app/model/Interface/CRTDLData';
import { DataExtraction2UiDataSelectionService } from '../DataExtraction/DataExtraction2UiDataSelection.service';
import { DataExtractionData } from 'src/app/model/Interface/DataExtractionData';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../../Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { StructuredQuery2FeasibilityQueryService } from '../StructureQuery/StructuredQuery2FeasibilityQuery.service';
import { StructuredQueryData } from 'src/app/model/Interface/StructuredQueryData';
import { TypeAssertion } from '../../TypeGuard/TypeAssersations';
import { TypeGuard } from '../../TypeGuard/TypeGuard';
import { UiCRTDL } from 'src/app/model/UiCRTDL';
import { v4 as uuidv4 } from 'uuid';
import { ValidationService } from '../../Validation.service';

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
    if (TypeGuard.isDataExtractionData(dataExtraction)) {
      try {
        TypeAssertion.assertDataExtractionData(dataExtraction);
        return this.dataExtraction2UiDataSelectionService.translate(dataExtraction);
      } catch (error) {
        console.error(error);
      }
    }
    return of(new DataSelection([], uuidv4()));
  }

  private combineFeasibilityAndDataExtraction(
    cohortDefinition: Observable<FeasibilityQuery>,
    dataExtraction: Observable<DataSelection>
  ): Observable<UiCRTDL> {
    return combineLatest([cohortDefinition, dataExtraction]).pipe(
      map(([cohort, data]) => new UiCRTDL(uuidv4(), cohort, data))
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
