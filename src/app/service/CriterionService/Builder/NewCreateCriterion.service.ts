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
  public createCriterionFromProfileData(criteriaProfileData: CriteriaProfileData): void {
    const mandatoryFields = this.criterionMetadataService.createMandatoryFields(criteriaProfileData);
    const criterionBuilder = new CriterionBuilder(mandatoryFields);

    if (criteriaProfileData.getTimeRestrictionAllowed()) {
      criterionBuilder.withTimeRestriction(criterionBuilder.buildTimeRestriction());
    }

    criterionBuilder
      .withAttributeFilters(
        this.attributeDefinitionProcessorService.processAttributeFilters(criteriaProfileData)
      )
      .withValueFilters(
        this.attributeDefinitionProcessorService.processValueFilters(criteriaProfileData)
      );

    const criterion: Criterion = criterionBuilder.buildCriterion();
    this.criterionProviderService.setCriterionByUID(criterion);
    this.stageProviderService.addCriterionToStage(criterion.getUniqueID());
  }
}
