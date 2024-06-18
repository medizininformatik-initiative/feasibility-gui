import { Injectable } from '@angular/core';
import { CriterionService } from '../CriterionService.service';
import { v4 as uuidv4 } from 'uuid';
import { EditCriterionService } from '../CriterionService/edit-criterion.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { QueryService } from '../QueryService.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private criterionService: CriterionService,
    private editCriterionService: EditCriterionService,
    private queryProviderService: QueryService
  ) {}

  getMenuItems(criterionUuid: string) {
    return [
      { icon: 'trash', label: 'löschen', action: () => this.deleteAction(criterionUuid) },
      { icon: 'clone', label: 'dublizieren', action: () => this.duplicateAction(criterionUuid) },
      { icon: 'link', label: 'kriterien verknüpfen', action: this.linkCriteriaAction.bind(this) },
      {
        icon: 'cog',
        label: 'Filter anwenden',
        action: () => this.applyFilterAction(criterionUuid),
      },
    ];
  }

  deleteAction(uid: string) {
    this.criterionService.deleteCriterionByUID(uid);
  }

  duplicateAction(uid) {
    const originalElement = this.criterionService.getCriterionByUID(uid);
    if (originalElement) {
      const duplicateElement = { ...originalElement };
      duplicateElement.uniqueID = uuidv4();
      this.criterionService.setCriterionByUID(duplicateElement);
    }
  }

  linkCriteriaAction() {
    console.log('Link criteria action triggered');
  }

  applyFilterAction(criterionUuid: string) {}
}
