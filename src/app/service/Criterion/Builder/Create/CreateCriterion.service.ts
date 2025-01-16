import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from 'src/app/modules/feasibility-query/service/backend.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionHashService } from '../../CriterionHash.service';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { FeasibilityQueryProviderService } from '../../../Provider/FeasibilityQueryProvider.service';
import { finalize, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { StageProviderService } from 'src/app/service/Provider/StageProvider.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';
import { ValueDefinition } from 'src/app/model/Utilities/AttributeDefinition.ts/ValueDefnition';

@Injectable({
  providedIn: 'root',
})
export class CreateCriterionService {
  ids: Set<string> = new Set<string>();

  constructor(
    private criterionHashService: CriterionHashService,
    private backend: BackendService,
    private listItemService: SelectedTableItemsService<SearchTermListEntry>,
    private criterionProviderService: CriterionProviderService,
    private stageProviderService: StageProviderService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService
  ) {}

  public translateListItemsToCriterions() {
    this.getCriteriaProfileData(this.listItemService.getSelectedIds());
  }

  /**
   * @todo check if ids exceed 50 --> if so send second request and so on
   * due to url length
   */
  public getCriteriaProfileData(ids: Array<string>, clearIds: boolean = true) {
    this.backend
      .getCriteriaProfileData(ids)
      .pipe(
        switchMap((responses: any[]) => {
          const criteriaProfileDataArray = responses.map((response) => {
            const context = this.mapTerminologyCode(response.context);
            const termCodes = response.termCodes.map(this.mapTerminologyCode);
            const id = response.id;
            const display = response.display;
            return new CriteriaProfileData(
              id,
              display,
              response.uiProfile.timeRestrictionAllowed,
              this.mapAttributeDefinitions(response.uiProfile),
              context,
              termCodes,
              this.mapValueDefinition(response.uiProfile)
            );
          });
          return of(criteriaProfileDataArray);
        }),
        finalize(() => {
          if (clearIds) {
            this.ids.clear();
            this.listItemService.clearSelection();
          }
        })
      )
      .subscribe(
        (criteriaProfileDataArray: CriteriaProfileData[] | null) => {
          criteriaProfileDataArray.forEach((criteriaProfileData) => {
            this.createCriterionFromProfileData(criteriaProfileData);
          });
          this.ids.clear();
        },
        (error) => {
          console.error('Error fetching criteria profile data:', error);
        }
      );
  }

  private mapAttributeDefinitions(uiProfile: any): AttributeDefinitions[] {
    if (!uiProfile.attributeDefinitions || uiProfile.attributeDefinitions.length === 0) {
      return [];
    }
    return uiProfile.attributeDefinitions.map(
      (attributeDefinition) =>
        new AttributeDefinitions(
          uiProfile.name,
          attributeDefinition.type,
          attributeDefinition.optional,
          attributeDefinition.allowedUnits?.map(
            (unit) => new QuantityUnit(unit.code, unit.display, unit.system)
          ) || [],
          this.createNewTerminologyCode(attributeDefinition.attributeCode),
          attributeDefinition.max,
          attributeDefinition.min,
          attributeDefinition.precision,
          attributeDefinition.referencedCriteriaSet,
          attributeDefinition.referencedValueSet
        )
    );
  }

  private mapValueDefinition(uiProfile: any): ValueDefinition[] {
    if (uiProfile.valueDefinition) {
      return [
        new ValueDefinition(
          uiProfile.name,
          uiProfile.valueDefinition.type,
          uiProfile.valueDefinition.optional,
          uiProfile.valueDefinition.allowedUnits?.map(
            (unit) => new QuantityUnit(unit.code, unit.display, unit.system)
          ) || [],
          uiProfile.valueDefinition.max,
          uiProfile.valueDefinition.min,
          uiProfile.valueDefinition.precision,
          uiProfile.valueDefinition.referencedValueSet
        ),
      ];
    }
    return [];
  }

  private createNewTerminologyCode(terminologyCode) {
    return new TerminologyCode(
      terminologyCode.code,
      terminologyCode.display,
      terminologyCode.system
    );
  }

  private mapTerminologyCode(termCode: any): TerminologyCode {
    return new TerminologyCode(termCode.code, termCode.display, termCode.system, termCode.version);
  }

  public createCriterionFromProfileData(criteriaProfileData: CriteriaProfileData): void {
    const mandatoryFields = this.createMandatoryFields(criteriaProfileData);
    const criterionBuilder = new CriterionBuilder(mandatoryFields);

    criteriaProfileData.getAttributeDefinitions().forEach((attributeDefinition) => {
      this.processAttributeDefinition(criterionBuilder, attributeDefinition);
    });
    criteriaProfileData.getValueDefinitions().forEach((valueDefinition) => {
      this.processValueDefinition(criterionBuilder, valueDefinition);
    });

    if (criteriaProfileData.getTimeRestrictionAllowed()) {
      criterionBuilder.withTimeRestriction(criterionBuilder.buildTimeRestriction());
    }
    const criterion: Criterion = criterionBuilder.buildCriterion();
    this.criterionProviderService.setCriterionByUID(criterion, criterion.getId());
    this.stageProviderService.addCriterionToStage(criterion.getId());
    this.feasibilityQueryProviderService.checkCriteria();
  }

  private createMandatoryFields(criteriaProfileData: CriteriaProfileData): {
    isReference: false
    context: TerminologyCode
    criterionHash: string
    display: DisplayData
    isInvalid: boolean
    isRequiredFilterSet: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = criteriaProfileData.getContext();
    const termCodes = criteriaProfileData.getTermCodes();
    const display = criteriaProfileData.getDisplay();
    const criterionHash = this.criterionHashService.createHash(context, termCodes[0]);
    const isFilterRequired = !this.setIsRequiredFilterSet(criteriaProfileData);

    return {
      isReference: false,
      context,
      criterionHash,
      display,
      isInvalid: false,
      isRequiredFilterSet: isFilterRequired,
      uniqueID: uuidv4(),
      termCodes,
    };
  }

  private setIsRequiredFilterSet(criteriaProfileData: CriteriaProfileData) {
    return (
      criteriaProfileData
        .getAttributeDefinitions()
        .filter((attributeDefinition) => !attributeDefinition.getOptional()).length > 0 ||
      criteriaProfileData
        .getValueDefinitions()
        .filter((valueDefinition) => !valueDefinition.getOptional()).length > 0
    );
  }

  private processAttributeDefinition(
    criterionBuilder: CriterionBuilder,
    attributeDefinition: AttributeDefinitions
  ): void {
    const name = attributeDefinition.getName();
    const attributeCode = attributeDefinition.getAttributeCode();
    const type = attributeDefinition.getType();
    const attributeDef = attributeDefinition;
    criterionBuilder.withAttributeFilter(
      criterionBuilder.buildAttributeFilter(
        name,
        type,
        attributeDef,
        attributeCode
      ) as AttributeFilter
    );
  }

  private processValueDefinition(
    criterionBuilder: CriterionBuilder,
    valueDefinition: ValueDefinition
  ): void {
    const name = valueDefinition.getName();
    const type = valueDefinition.getType();
    criterionBuilder.withValueFilters([
      criterionBuilder.buildValueFilter(valueDefinition, name, type),
    ]);
  }
}
