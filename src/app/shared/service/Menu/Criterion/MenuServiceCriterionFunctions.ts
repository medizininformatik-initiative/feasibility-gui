import { Injectable } from '@angular/core';
import { EditCriterionService } from 'src/app/service/CriterionService/EditCriterionService.service';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { StageProviderService } from '../../../../service/Provider/StageProvider.service';
import { FeasibilityQueryProviderService } from '../../../../service/Provider/FeasibilityQueryProvider.service';
import {NewCreateCriterionService} from "../../../../service/CriterionService/Builder/NewCreateCriterion.service";

@Injectable({
  providedIn: 'root',
})
export class MenuServiceCriterionFunctions {
  constructor(
    private criterionService: CriterionProviderService,
    private editCriterionService: EditCriterionService,
    private stageService: StageProviderService,
    private queryProviderService: FeasibilityQueryProviderService,
    private newCreateCriterionService: NewCreateCriterionService
  ) {}

  deleteCriterion(uid: string) {
    this.stageService.deleteCriterionByUID(uid);
    this.queryProviderService.deleteFromInclusion(uid);
    this.queryProviderService.deleteFromExclusion(uid);
    this.criterionService.deleteCriterionFromMapByUID(uid);
  }

  duplicateCriterion(uid: string) {
    this.newCreateCriterionService.createCriterionFromOtherCriterion(this.criterionService.getCriterionByUID(uid))
  }

  editLinkedCriteria(criterionUuid: string) {
    const criterion = this.criterionService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.editCriterionReferenceCriteria(criterion);
    }
  }

  applyCriterionFilter(criterionUuid: string, params: any[]) {
    const criterion = this.criterionService.getCriterionByUID(criterionUuid);
    if (criterion) {
      this.editCriterionService.editCriterionAttribute(criterion);
    }
  }
}
