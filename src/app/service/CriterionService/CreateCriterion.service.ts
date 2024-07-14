//import { AnnotatedStructuredQueryIssue } from '../../model/result/AnnotatedStructuredQuery/AnnotatedStructuredQueryIssue';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriterionHashService } from './CriterionHash.service';
import { CriterionProviderService } from '../Provider/CriterionProvider.service';
//import { CritGroupPosition } from 'src/app/modules/querybuilder/controller/CritGroupArranger';
import { FeatureService } from '../Feature.service';
import { Injectable } from '@angular/core';
//import { LoadUIProfileService } from '../LoadUIProfile.service';
import { finalize, of, switchMap, take } from 'rxjs';
import { SearchResultListItemSelectionService } from '../ElasticSearch/SearchTermListItemService.service';
//import { TerminologyCode, TerminologyEntry } from 'src/app/model/terminology/TerminologyCode';
import { AttributeDefinitions } from 'src/app/model/AttributeDefinitions';
import { v4 as uuidv4 } from 'uuid';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { InterfaceListEntry } from '../../model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';
import { StageProviderService } from '../Provider/StageProvider.service';
import { UIQuery2StructuredQueryTranslatorService } from '../UIQuery2StructuredQueryTranslator.service';
import { QuantityRangeFilter } from '../../model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityUnit } from '../../model/FeasibilityQuery/QuantityUnit';
import { QuantityComparatorFilter } from '../../model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { Comparator } from '../../model/Comparator';
import { AtFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AtFilter';
import { AfterFilter } from '../../model/FeasibilityQuery/Criterion/TimeRestriction/AfterFilter';
import { AttributeFiltersBuilder } from '../../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFiltersBuilder';
import { FilterTypes } from '../../model/FilterTypes';
import { ReferenceCriterion } from '../../model/FeasibilityQuery/Criterion/ReferenceCriterion';

@Injectable({
  providedIn: 'root',
})
export class CreateCriterionService {
  ids: Set<string> = new Set<string>();

  constructor(
    private criterionHashService: CriterionHashService,
    private featureService: FeatureService,
    //private UiProfileService: LoadUIProfileService,
    private backend: BackendService,
    private listItemService: SearchResultListItemSelectionService<InterfaceListEntry>,
    private criterionService: CriterionProviderService,
    private stageProviderService: StageProviderService,
    private translator: UIQuery2StructuredQueryTranslatorService
  ) {}

  public translateListItemsToCriterions() {
    this.listItemService
      .getSelectedSearchResultListItems()
      .pipe(take(1))
      .subscribe((listItems) => {
        listItems.forEach((listItem) => {
          this.ids.add(listItem.getId());
        });
        this.getCriteriaProfileData();
      });
  }

  /**
   * @todo check if ids exceed 50 --> if so send second request and so on
   * due to url length
   */
  public getCriteriaProfileData() {
    this.backend
      .getCriteriaProfileData(Array.from(this.ids))
      .pipe(
        switchMap((responses: any[]) => {
          const criteriaProfileDataArray = responses.map((response) => {
            const attributeDefinitions: AttributeDefinitions[] = this.mapAttributeDefinitions(
              response.uiProfile
            );
            if (response.uiProfile.valueDefinition) {
              attributeDefinitions.push(this.mapValueDefinition(response.uiProfile));
            }
            const context = this.mapTerminologyCode(response.context);
            const termCodes = response.termCodes.map(this.mapTerminologyCode);
            const id = response.id;
            return new CriteriaProfileData(
              id,
              response.uiProfile.timeRestrictionAllowed,
              attributeDefinitions,
              context,
              termCodes
            );
          });
          return of(criteriaProfileDataArray);
        }),
        finalize(() => {
          this.ids.clear();
          this.listItemService.clearSelection();
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
          false,
          attributeDefinition.attributeCode,
          attributeDefinition.max,
          attributeDefinition.min,
          attributeDefinition.precision,
          attributeDefinition.referenceCriteriaSet,
          attributeDefinition.referencedValueSet
        )
    );
  }

  private mapValueDefinition(uiProfile: any): AttributeDefinitions {
    return new AttributeDefinitions(
      uiProfile.name,
      uiProfile.valueDefinition.type,
      uiProfile.valueDefinition.optional,
      uiProfile.valueDefinition.allowedUnits?.map(
        (unit) => new QuantityUnit(unit.code, unit.display, unit.system)
      ) || [],
      true,
      uiProfile.valueDefinition.attributeCode,
      uiProfile.valueDefinition.max,
      uiProfile.valueDefinition.min,
      uiProfile.valueDefinition.precision,
      uiProfile.valueDefinition.referenceCriteriaSet,
      uiProfile.valueDefinition.referencedValueSet
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

    if (criteriaProfileData.getTimeRestrictionAllowed()) {
      criterionBuilder.withTimeRestriction(criterionBuilder.buildTimeRestriction());
    }
    const criterion = criterionBuilder.buildCriterion();

    this.criterionService.setCriterionByUID(criterion);
    this.stageProviderService.addCriterionToStage(criterion.getUniqueID());
  }

  private createMandatoryFields(criteriaProfileData: CriteriaProfileData): {
    hasReference: false
    context: TerminologyCode
    criterionHash: string
    display: string
    isInvalid: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = criteriaProfileData.getContext();
    const termCodes = criteriaProfileData.getTermCodes();
    const display = criteriaProfileData.getTermCodes()[0].getDisplay();

    return {
      hasReference: false,
      context,
      criterionHash: this.criterionHashService.createHash(context, termCodes[0]),
      display,
      isInvalid: false,
      uniqueID: uuidv4(),
      termCodes,
    };
  }

  private processAttributeDefinition(
    criterionBuilder: CriterionBuilder,
    attributeDefinition: AttributeDefinitions
  ): void {
    const name = attributeDefinition.getName();
    const code = attributeDefinition.getAttributeCode();
    const type = attributeDefinition.getType();
    const attributeDef = attributeDefinition;

    if (!attributeDefinition.getValueDefinition()) {
      criterionBuilder.withAttributeFilter(
        criterionBuilder.buildAttributeFilter(name, code, type, attributeDef) as AttributeFilter
      );
    } else {
      criterionBuilder.withValueFilters(
        criterionBuilder.buildAttributeFilter(name, code, type, attributeDef) as ValueFilter
      );
    }
  }
}
