import { CriterionValidationService } from '../Criterion/CriterionValidation.service';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataQueryValidationService {
  constructor(
    private dataSelectionProviderService: DataSelectionProviderService,
    private criterionValidationService: CriterionValidationService
  ) {}

  public validateDataQuery(): Observable<boolean> {
    return (
      (this.criterionValidationService.getIsFeasibilityQuerySet() &&
        this.criterionValidationService.getIsFeasibilityQueryValid()) ||
      this.dataSelectionProviderService
        .getActiveDataSelection()
        .pipe(map((dataSelection) => dataSelection.getProfiles().length > 0))
    );
  }
}
