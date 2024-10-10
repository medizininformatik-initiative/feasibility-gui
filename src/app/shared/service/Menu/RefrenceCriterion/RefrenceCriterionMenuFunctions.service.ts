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
    private criterionService: CriterionProviderService,
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
    this.criterionService
      .getCriterionByUID(parentID)
      .getAttributeFilters()
      .forEach((attributeFilter) => {
        console.log(attributeFilter);
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
    const originalElement = this.criterionService.getCriterionByUID(uid);
    if (originalElement) {
      const duplicateElement = { ...originalElement };
    }
  }

  applyReferenceCriterionFilter(uid: string) {
    this.editCriterionService.openCriterionModal(
      this.referenceCriterionProvider.getReferenceCriterionByUID(uid)
    );
  }
}
