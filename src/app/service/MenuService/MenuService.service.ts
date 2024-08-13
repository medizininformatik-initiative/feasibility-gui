import { CriterionProviderService } from '../Provider/CriterionProvider.service';
import { EditCriterionService } from '../CriterionService/EditCriterionService.service';
import { Injectable, OnInit } from '@angular/core';
import { StageProviderService } from '../Provider/StageProvider.service';
import { FeasibilityQuery } from '../../model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../Provider/FeasibilityQueryProvider.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private criterionService: CriterionProviderService,
    private editCriterionService: EditCriterionService,
    private stageService: StageProviderService,
    private queryProviderService: FeasibilityQueryProviderService
  ) {}

  getMenuItems(criterionUuid: string) {
    return [
      { icon: 'trash', label: 'löschen', action: () => this.deleteAction(criterionUuid) },
      { icon: 'clone', label: 'dublizieren', action: () => this.duplicateAction(criterionUuid) },
      {
        icon: 'link',
        label: 'kriterien verknüpfen',
        action: () => this.linkCriteriaAction(criterionUuid),
      },
      {
        icon: 'cog',
        label: 'Filter anwenden',
        action: () => this.applyFilterAction(criterionUuid),
      },
    ];
  }

  deleteAction(uid: string) {
    this.stageService.deleteCriterionByUID(uid);
    this.queryProviderService.deleteFromInclusion(uid);
    this.queryProviderService.deleteFromExclusion(uid);
    this.criterionService.deleteCriterionFromMapByUID(uid);
  }

  duplicateAction(uid: string) {
    const originalElement = this.criterionService.getCriterionByUID(uid);
    if (originalElement) {
      const duplicateElement = { ...originalElement };
      //duplicateElement.setUniqueID(uuidv4());
      //this.criterionService.setCriterionByUID(duplicateElement);
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
