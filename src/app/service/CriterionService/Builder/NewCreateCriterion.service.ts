import { AttributeDefinitionProcessorService } from './AttributeDefinitionProcessor.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriteriaProfileDataService } from '../../CriteriaProfileData.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionMetadataService } from './CriterionMetadata.service';
import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { Injectable } from '@angular/core';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from '../../ElasticSearch/SearchTermListItemService.service';
import { StageProviderService } from '../../Provider/StageProvider.service';
import { v4 as uuidv4 } from 'uuid';
import {AttributeFilter} from "../../../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter";
import {ReferenceCriterion} from "../../../model/FeasibilityQuery/Criterion/ReferenceCriterion";
import {ObjectHelper} from "../../../modules/querybuilder/controller/ObjectHelper";
import {ReferenceFilter} from "../../../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter";

@Injectable({
  providedIn: 'root',
})
export class NewCreateCriterionService {
  ids: Set<string> = new Set<string>();

  constructor(
    private criterionMetadataService: CriterionMetadataService,
    private listItemService: SelectedTableItemsService<SearchTermListEntry>,
    private criterionProviderService: CriterionProviderService,
    private stageProviderService: StageProviderService,
    private criteriaProfileDataService: CriteriaProfileDataService,
    private attributeDefinitionProcessorService: AttributeDefinitionProcessorService
  ) {}

  public translateListItemsToCriterions() {
    this.criteriaProfileDataService
      .getCriteriaProfileData(this.listItemService.getSelectedIds())
      .subscribe((criteriaProfileDatas) => {
        criteriaProfileDatas.forEach((criteriaProfileData) => {
          this.createCriterionFromProfileData(criteriaProfileData);
        });
      });
  }

  public createCriterionFromOtherCriterion(oldCriterion: Criterion): void {
    const criterionBuilder = new CriterionBuilder({hasReference: false, context: oldCriterion.getContext(), criterionHash: oldCriterion.getCriterionHash(), display: oldCriterion.getDisplay(), isInvalid: oldCriterion.getIsInvalid(), uniqueID: uuidv4(), termCodes: oldCriterion.getTermCodes()});

    const timeRestrictionAllowed: boolean = !!oldCriterion.getTimeRestriction()
    if (timeRestrictionAllowed) {
      criterionBuilder.withTimeRestriction(oldCriterion.getTimeRestriction());
    }

    if(oldCriterion.getAttributeFilters().length > 0) {

      criterionBuilder.withAttributeFilters(oldCriterion.getAttributeFilters())
    }

    if(oldCriterion.getValueFilters().length > 0) {
      criterionBuilder.withValueFilters(oldCriterion.getValueFilters())
    }

    const criterion: Criterion = criterionBuilder.buildCriterion();
    this.criterionProviderService.setCriterionByUID(criterion);
    this.stageProviderService.addCriterionToStage(criterion.getUniqueID());
  }

  public createCriterionFromProfileData(criteriaProfileData: CriteriaProfileData): void {
    const mandatoryFields = this.criterionMetadataService.createMandatoryFields(criteriaProfileData);
    const criterionBuilder = new CriterionBuilder(mandatoryFields);

    if (criteriaProfileData.getTimeRestrictionAllowed()) {
      criterionBuilder.withTimeRestriction(criterionBuilder.buildTimeRestriction());
    }

    criterionBuilder.withAttributeFilters(
      this.attributeDefinitionProcessorService.processAttributeFilters(criteriaProfileData)
    );
    criterionBuilder.withValueFilters(
      this.attributeDefinitionProcessorService.processValueFilters(criteriaProfileData)
    );

    const criterion: Criterion = criterionBuilder.buildCriterion();
    this.criterionProviderService.setCriterionByUID(criterion);
    this.stageProviderService.addCriterionToStage(criterion.getUniqueID());
  }
}
