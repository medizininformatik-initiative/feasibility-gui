import { AttributeDefinitionData } from '../model/Interface/AttributeDefinitionData';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AttributeFilterFactoryService } from './Criterion/AttributeFilterFactory.service';
import { AttributeFiltersBuilder } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFiltersBuilder';
import { CriteriaBulkEntry } from '../model/Search/ListEntries/CriteriaBulkEntry';
import { CriteriaBulkResultList } from '../model/Search/ResultList/CriteriaBulkResultList';
import { CriterionBuilder } from '../model/FeasibilityQuery/Criterion/CriterionBuilder';
import { Display } from '../model/DataSelection/Profile/Display';
import { FilterTypes } from '../model/Utilities/FilterTypes';
import { HashService } from './Hash.service';
import { Injectable } from '@angular/core';
import { QuantityUnit } from '../model/FeasibilityQuery/QuantityUnit';
import { QuantityUnitData } from '../model/Interface/Unit';
import { ReferenceFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { TerminologyCode } from '../model/Terminology/TerminologyCode';
import { TimeRestrictionFactoryService } from './Factory/TimeRestrictionFactory.service';
import { TimeRestrictionNotSet } from '../model/FeasibilityQuery/Criterion/TimeRestriction/TimeRestrictionNotSet';
import { UiProfileData } from '../model/Interface/UiProfileData';
import { UiProfileProviderService } from './Provider/UiProfileProvider.service';
import { v4 as uuidv4 } from 'uuid';
import { ValueDefinitionData } from '../model/Interface/ValueDefinition';
import { ValueFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';

@Injectable({
  providedIn: 'root',
})
export class CreateBulkCriterionService {
  constructor(
    private uiProfileProviderService: UiProfileProviderService,
    private hashService: HashService,
    private timeRestrictionService: TimeRestrictionFactoryService,
    private attributeFilterFactory: AttributeFilterFactoryService
  ) {}

  public createBulkCriterion(response: CriteriaBulkResultList) {
    console.log('Bulk Search Response:', response);
    const uiProfileId = response.getUiProfileId();

    const uiProfile: UiProfileData = this.uiProfileProviderService.getUiProfileById(uiProfileId);
    const termcodes: TerminologyCode[] = response
      .getFound()
      .map((found: CriteriaBulkEntry) => found.getTermcodes()[0]);
    const criteriaProfile = response
      .getFound()
      .map((found: CriteriaBulkEntry) => this.createCriteriaProfileData(found, termcodes));
    uiProfile.attributeDefinitions.map((attributeDefinition) =>
      this.createBuilderInstance(attributeDefinition)
    );
    const builder = new CriterionBuilder(criteriaProfile[0]);
    builder.withAttributeFilters(this.createAttributeFilter(uiProfile));
    builder.withValueFilters(
      [this.createValueFilter(uiProfile)].filter(
        (filter): filter is ValueFilter => filter !== undefined
      )
    );
    builder.withTimeRestriction(this.createTimeRestriction(uiProfile));
    return builder.buildCriterion();
  }

  private createCriteriaProfileData(
    response: CriteriaBulkEntry,
    termcodes: TerminologyCode[]
  ): {
    isReference: false
    context: TerminologyCode
    criterionHash: string
    display: Display
    isInvalid: boolean
    isRequiredFilterSet: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = response.getContext();
    const termcode = response.getTermcodes()[0];
    const hash = this.hashService.createCriterionHash(context, termcode);
    const display = response.getDisplay();
    return {
      isReference: false,
      context,
      criterionHash: hash,
      display,
      isInvalid: false,
      isRequiredFilterSet: true,
      uniqueID: uuidv4(),
      termCodes: termcodes,
    };
  }

  private createTimeRestriction(uiProfile: UiProfileData): TimeRestrictionNotSet | undefined {
    if (uiProfile.timeRestrictionAllowed) {
      return new TimeRestrictionNotSet();
    } else {
      return undefined;
    }
  }

  private createValueFilter(uiProfile: UiProfileData): ValueFilter | undefined {
    return this.attributeFilterFactory.createValueFilter(uiProfile.valueDefinition);
  }

  private createAttributeFilter(uiProfile: UiProfileData): AttributeFilter[] {
    const t = uiProfile.attributeDefinitions.map((value: AttributeDefinitionData) =>
      this.attributeFilterFactory.createAttributeFilter(value)
    );

    return uiProfile.attributeDefinitions.reduce((acc: AttributeFilter[], attributeDefinition) => {
      const builder = this.createBuilderInstance(attributeDefinition);
      if (attributeDefinition.type === FilterTypes.CONCEPT) {
        const concept = builder.buildConceptFilter(uuidv4(), attributeDefinition.referencedValueSet);
        builder.withConceptFilter(concept);
        acc.push(builder.buildAttributeFilter());
        return acc;
      }
      if (attributeDefinition.type === FilterTypes.QUANTITY) {
        const allowedUnits = attributeDefinition.allowedUnits.map((unit: QuantityUnitData) =>
          QuantityUnit.fromJson(unit)
        );
        const quantity = builder.buildQuantityFilter(allowedUnits, attributeDefinition.precision);
        builder.withQuantityFilter(quantity);
        acc.push(builder.buildAttributeFilter());
        return acc;
      }
      if (attributeDefinition.type === FilterTypes.REFERENCE) {
        const referenceFilter: ReferenceFilter = builder.buildReferenceFilter(
          uuidv4(),
          attributeDefinition.referencedCriteriaSet
        );
        builder.withReferenceFilter(referenceFilter);
        acc.push(builder.buildAttributeFilter());
        return acc;
      } else {
        return acc;
      }
    }, []);
  }

  /**
   * Creates an instance of the AttributeFiltersBuilder.
   * @param attributeDefinition
   * @returns
   */
  private createBuilderInstance(
    attributeDefinition: AttributeDefinitionData | ValueDefinitionData
  ): AttributeFiltersBuilder {
    return new AttributeFiltersBuilder(
      Display.fromJson(attributeDefinition.display),
      attributeDefinition.optional,
      attributeDefinition.type
    );
  }
}
