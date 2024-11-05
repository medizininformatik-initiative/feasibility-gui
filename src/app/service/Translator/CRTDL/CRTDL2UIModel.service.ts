import { DataExtraction2UiDataSelectionService } from '../DataExtraction/DataExtraction2UiDataSelection.service';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FeasibilityQueryProviderService } from '../../Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { StructuredQuery2FeasibilityQueryService } from '../StructureQuery/StructuredQuery2FeasibilityQuery.service';
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
    private validationService: ValidationService
  ) {}
  public translateToUiModel(importedCrdtl: any) {
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
}
