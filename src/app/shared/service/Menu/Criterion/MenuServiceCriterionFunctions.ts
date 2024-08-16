import { Injectable } from '@angular/core';
import { EditCriterionService } from 'src/app/service/CriterionService/EditCriterionService.service';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceCriterionFunctions {
  constructor(
    private criterionService: CriterionProviderService,
    private editCriterionService: EditCriterionService
  ) {}

  deleteCriterion(uid: string) {
    console.log(uid);
    this.criterionService.deleteCriterionFromMapByUID(uid);
  }

  duplicateCriterion(uid: string) {
    const originalElement = this.criterionService.getCriterionByUID(uid);
    if (originalElement) {
      const duplicateElement = { ...originalElement };
    }
  }

  editLinkedCriteria(criterionUuid: string) {
    const criterion = this.criterionService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.editCriterionReferenceCriteria(criterion);
    }
  }

  applyCriterionFilter(criterionUuid: string) {
    const criterion = this.criterionService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.editCriterionAttribute(criterion);
    }
  }
}
