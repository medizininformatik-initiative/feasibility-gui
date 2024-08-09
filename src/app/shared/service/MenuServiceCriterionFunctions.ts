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

  deleteAction(uid: string) {
    this.criterionService.deleteCriterionFromMapByUID(uid);
  }

  duplicateAction(uid: string) {
    const originalElement = this.criterionService.getCriterionByUID(uid);
    if (originalElement) {
      const duplicateElement = { ...originalElement };
    }
  }

  linkCriteriaAction(criterionUuid: string) {
    const criterion = this.criterionService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.editCriterionReferenceCriteria(criterion);
    }
  }

  applyFilterAction(criterionUuid: string) {
    const criterion = this.criterionService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.editCriterionAttribute(criterion);
    }
  }
}
