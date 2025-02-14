import { CloneAbstractCriterion } from 'src/app/model/Utilities/CriterionCloner/CloneReferenceCriterion';
import { CriterionModalService } from 'src/app/service/Criterion/CriterionModal.service';
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

  public deleteCriterion(uid: string) {
    this.stageProviderService.deleteCriterionByUID(uid);
    this.queryProviderService.deleteFromInclusion(uid);
    this.queryProviderService.deleteFromExclusion(uid);
    this.criterionProviderService.deleteCriterionFromMapByUID(uid);
  }

  public duplicateCriterion(uid: string) {
    const clonedCriterion = CloneAbstractCriterion.deepCopyAbstractCriterion(
      this.criterionProviderService.getCriterionByUID(uid)
    );
    this.criterionProviderService.setCriterionByUID(clonedCriterion, clonedCriterion.getId());
    this.stageProviderService.addCriterionToStage(clonedCriterion.getId());
  }

  public editLinkedCriteria(criterionUuid: string) {
    const criterion = this.criterionProviderService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.openReferenceCriteriaModal(criterion);
    }
  }

  public applyCriterionFilter(criterionUuid: string) {
    const criterion = this.criterionProviderService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.openCriterionModal(criterion);
    }
  }
}
