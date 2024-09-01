import { CloneAbstractCriterion } from 'src/app/model/Utilities/CriterionCloner/CloneReferenceCriterion';
import { CriterionModalService } from 'src/app/service/CriterionService/CriterionModal.service';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { FeasibilityQueryProviderService } from '../../../../service/Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { StageProviderService } from '../../../../service/Provider/StageProvider.service';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceCriterionFunctions {
  constructor(
    private criterionProviderService: CriterionProviderService,
    private editCriterionService: CriterionModalService,
    private stageProviderService: StageProviderService,
    private queryProviderService: FeasibilityQueryProviderService
  ) {}

  deleteCriterion(uid: string) {
    this.stageProviderService.deleteCriterionByUID(uid);
    this.queryProviderService.deleteFromInclusion(uid);
    this.queryProviderService.deleteFromExclusion(uid);
    this.criterionProviderService.deleteCriterionFromMapByUID(uid);
  }

  duplicateCriterion(uid: string) {
    const clonedCriterion = CloneAbstractCriterion.deepCopyAbstractCriterion(
      this.criterionProviderService.getCriterionByUID(uid)
    );
    this.criterionProviderService.setCriterionByUID(clonedCriterion);
    this.stageProviderService.addCriterionToStage(clonedCriterion.getUniqueID());
  }

  editLinkedCriteria(criterionUuid: string) {
    const criterion = this.criterionProviderService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.openReferenceCriteriaModal(criterion);
    }
  }

  applyCriterionFilter(criterionUuid: string, params: any[]) {
    const criterion = this.criterionProviderService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.openCriterionModal(criterion);
    }
  }
}
