import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable, combineLatest } from 'rxjs';
import { FeasibilityQueryValidation } from '../Criterion/FeasibilityQueryValidation.service';

@Injectable({
  providedIn: 'root',
})
export class DataQueryValidationService {
  constructor(
    private dataSelectionProviderService: DataSelectionProviderService,
    private criterionValidationService: FeasibilityQueryValidation
  ) {}

  public validateDataQuery(): Observable<{ feasibilityQuery: boolean; dataSelection: boolean }> {
    const feasibility$ = this.criterionValidationService.getIsFeasibilityQueryValid();
    const dse$ = this.hasValidDataSelection();
    return combineLatest([feasibility$, dse$]).pipe(
      map(([feasibilityQuery, dataSelection]) => ({
        feasibilityQuery,
        dataSelection,
      }))
    );
  }

  private isFeasibilityQueryValid(): Observable<boolean> {
    return combineLatest([
      this.criterionValidationService.getIsFeasibilityQuerySet(),
      this.criterionValidationService.getIsFeasibilityQueryValid(),
    ]).pipe(
      map(([isSet, isValid]) => isSet && isValid) // AND logic applied here
    );
  }

  private hasValidDataSelection(): Observable<boolean> {
    return this.dataSelectionProviderService
      .getActiveDataSelection()
      .pipe(map((dataSelection) => this.isDataSelectionValid(dataSelection)));
  }

  private isDataSelectionValid(dataSelection: any): boolean {
    return dataSelection && dataSelection.getProfiles().length > 0;
  }
}
