import { Injectable } from '@angular/core';
import { EditCriterionService } from 'src/app/service/CriterionService/EditCriterionService.service';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { StageProviderService } from '../../../../service/Provider/StageProvider.service';
import { FeasibilityQueryProviderService } from '../../../../service/Provider/FeasibilityQueryProvider.service';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';

@Injectable({
  providedIn: 'root',
})
export class RefrenceCriterionMenuFunctionsService {
  constructor(
    private criterionService: CriterionProviderService,
    private editCriterionService: EditCriterionService,
    private stageService: StageProviderService,
    private queryProviderService: FeasibilityQueryProviderService
  ) {}

  deleteCriterion(uid: string) {
    this.stageService.deleteCriterionByUID(uid);
    this.queryProviderService.deleteFromInclusion(uid);
    this.queryProviderService.deleteFromExclusion(uid);
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

  applyCriterionFilter(params: ReferenceCriterion[]) {
    this.editCriterionService.editCriterionAttribute(params[0]);
  }
}
