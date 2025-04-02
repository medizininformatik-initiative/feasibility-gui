import { Injectable } from '@angular/core';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { StageProviderService } from '../../../../service/Provider/StageProvider.service';
import { FeasibilityQueryProviderService } from '../../../../service/Provider/FeasibilityQueryProvider.service';
import { CriterionModalService } from 'src/app/service/Criterion/CriterionModal.service';
import { ReferenceCriterionProviderService } from '../../../../service/Provider/ReferenceCriterionProvider.service';

@Injectable({
  providedIn: 'root',
})
export class RefrenceCriterionMenuFunctionsService {
  constructor(
    private criterionProviderService: CriterionProviderService,
    private editCriterionService: CriterionModalService,
    private referenceCriterionProvider: ReferenceCriterionProviderService,
    private stageService: StageProviderService,
    private queryProviderService: FeasibilityQueryProviderService
  ) {}

  deleteCriterion(uid: string) {
    /*this.stageService.deleteCriterionByUID(uid);
    this.queryProviderService.deleteFromInclusion(uid);
    this.queryProviderService.deleteFromExclusion(uid);
    this.criterionService.deleteCriterionFromMapByUID(uid);*/

    const parentID = this.referenceCriterionProvider.getReferenceCriterionByUID(uid).getParentId();
    this.criterionProviderService
      .getCriterionByUID(parentID)
      .getAttributeFilters()
      .forEach((attributeFilter) => {
        if (attributeFilter.isReferenceSet()) {
          const updatedReferences = attributeFilter
            .getReference()
            .getSelectedReferences()
            .filter((reference) => reference.getId() !== uid);
          attributeFilter.getReference().setSelectedReferences(updatedReferences);
        }
      });

    this.referenceCriterionProvider.deleteReferenceCriterionFromMapByUID(uid);
  }

  duplicateCriterion(uid: string) {
    const originalElement = this.criterionProviderService.getCriterionByUID(uid);
    if (originalElement) {
      const duplicateElement = { ...originalElement };
    }
  }

  applyReferenceCriterionFilter(uid: string) {
    this.editCriterionService.openCriterionModal(
      this.criterionProviderService.getCriterionByUID(uid) ??
        this.referenceCriterionProvider.getReferenceCriterionByUID(uid)
    );
  }
}
