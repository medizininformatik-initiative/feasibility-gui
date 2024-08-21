import { AbstractStructuredQueryFilters } from '../model/StructuredQuery/Criterion/AttributeFilters/AbstractStructuredQueryFilters';
import { AbstractTimeRestriction } from '../model/StructuredQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { AfterFilter } from '../model/StructuredQuery/Criterion/TimeRestriction/AfterFilter';
import { AtFilter } from '../model/StructuredQuery/Criterion/TimeRestriction/AtFilter';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BeforeFilter } from '../model/StructuredQuery/Criterion/TimeRestriction/BeforeFilter';
import { BetweenFilter } from '../model/StructuredQuery/Criterion/TimeRestriction/BetweenFilter';
import { ConceptAttributeFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/ConceptFilter/ConceptAttributeFilter';
import { ConceptFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { ConceptValueFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/ConceptFilter/ConceptValueFilter';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from './Provider/CriterionProvider.service';
import { FeasibilityQuery } from '../model/FeasibilityQuery/FeasibilityQuery';
import { FeatureService } from './Feature.service';
import { FilterTypes } from '../model/Utilities/FilterTypes';
import { FilterTypesService } from './FilterTypes.service';
import { Injectable } from '@angular/core';
import { ObjectHelper } from '../modules/querybuilder/controller/ObjectHelper';
import { QuantityComparatorFilter as QuantityComparatorFilterSQ } from '../model/StructuredQuery/Criterion/AttributeFilters/QuantityFilter/QuantityComparatorFilter';
import { QuantityComparatorFilter as QuantityComparatorFilterFQ } from '../model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityRangeFilter as QuantityRangeFilterSQ } from '../model/StructuredQuery/Criterion/AttributeFilters/QuantityFilter/QuantityRangeFilter';
import { QuantityRangeFilter as QuantityRangeFilterFQ } from '../model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityUnit as QuantityUnitSQ } from '../model/StructuredQuery/QuantityUnit';
import { QuantityUnit as QuantityUnitFQ } from '../model/FeasibilityQuery/QuantityUnit';
import { ReferenceFilter as ReferenceFilterSQ } from '../model/StructuredQuery/Criterion/AttributeFilters/ReferenceFilter/ReferenceFilter';
import { ReferenceFilter as ReferenceFilterFQ } from '../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { StructuredQueryCriterion } from '../model/StructuredQuery/Criterion/StructuredQueryCriterion';
import { TerminologyCode } from '../model/Terminology/TerminologyCode';
import { TimeRestrictionType } from '../model/FeasibilityQuery/TimeRestriction';
import { ValueFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';

@Injectable({
  providedIn: 'root',
})
export class UIQuery2StructuredQueryTranslatorService {
  constructor(
    private featureService: FeatureService,
    private filter: FilterTypesService,
    private criterionProvider: CriterionProviderService
  ) {}

  public translateToStructuredQuery(feasibilityQuery: FeasibilityQuery): StructuredQuery {
    const structuredQuery = new StructuredQuery();
    if (feasibilityQuery.getDisplay()) {
      structuredQuery.display = feasibilityQuery.getDisplay();
    }
    //const group: Group = feasibilityQuery.groups[0];
    const inclusionCriteria = feasibilityQuery.getInclusionCriteria();
    const exclusionCriteria = feasibilityQuery.getExclusionCriteria();

    structuredQuery.inclusionCriteria = this.translateInclusionCriteria(inclusionCriteria);
    structuredQuery.exclusionCriteria = this.translateExclusionCriteria(exclusionCriteria);
    if (feasibilityQuery.getConsent()) {
      structuredQuery.inclusionCriteria.push(this.getConsent());
    }
    return structuredQuery;
  }

  private translateInclusionCriteria(
    inclusionCriteriaArray: string[][]
  ): StructuredQueryCriterion[][] | [] {
    const inclusionCriteria = ObjectHelper.clone(inclusionCriteriaArray);
    if (inclusionCriteria.length > 0) {
      return this.translateCriterionGroup(inclusionCriteria);
    }
  }

  private translateExclusionCriteria(
    exclusionCriteriaArray: string[][]
  ): StructuredQueryCriterion[][] | undefined {
    const exclusionCriteria = ObjectHelper.clone(exclusionCriteriaArray);
    if (exclusionCriteria.length > 0) {
      return this.translateCriterionGroup(exclusionCriteria);
    } else {
      return undefined;
    }
  }

  private translateCriterionGroup(criterionGroup: string[][]): StructuredQueryCriterion[][] {
    const structuredQueryCriterion: StructuredQueryCriterion[][] = [];
    criterionGroup.forEach((criterionIdArray) => {
      const innerArray: StructuredQueryCriterion[] = this.translateInnerArray(criterionIdArray);
      if (innerArray.length > 0) {
        structuredQueryCriterion.push(innerArray);
      }
    });
    return structuredQueryCriterion.length > 0 ? structuredQueryCriterion : undefined;
  }

  private translateInnerArray(criterionArray: string[]): StructuredQueryCriterion[] {
    const structuredQueryInnerArray: StructuredQueryCriterion[] = [];
    criterionArray.forEach((criterionID) => {
      const criterion = this.criterionProvider.getCriterionByUID(criterionID);
      structuredQueryInnerArray.push(this.assignStructuredQueryCriterionElements(criterion));
    });
    return structuredQueryInnerArray;
  }

  private assignStructuredQueryCriterionElements(criterion: Criterion): StructuredQueryCriterion {
    const structuredQueryCriterion = new StructuredQueryCriterion();
    structuredQueryCriterion.attributeFilters = this.translateAttributeFilters(criterion);
    structuredQueryCriterion.context = this.addContextToStructuredQuery(criterion);
    structuredQueryCriterion.termCodes = this.assignTermCodes(criterion.getTermCodes());
    structuredQueryCriterion.timeRestriction =
      this.translateTimeRestrictionToStructuredQuery(criterion);
    structuredQueryCriterion.valueFilter = this.translateValueFilter(criterion);
    return structuredQueryCriterion;
  }

  private addContextToStructuredQuery(criterion: Criterion): TerminologyCode | undefined {
    if (this.featureService.getSendSQContextToBackend()) {
      return criterion.getContext();
    } else {
      return undefined;
    }
  }

  private translateAttributeFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters[] | undefined {
    if (criterion.getAttributeFilters().length > 0) {
      return this.createStructuredQueryAttributeFilters(criterion);
    } else {
      return undefined;
    }
  }

  private translateValueFilter(criterion: Criterion): AbstractStructuredQueryFilters | undefined {
    if (criterion.getValueFilters().length > 0) {
      return this.createStructuredQueryValueFilters(criterion);
    } else {
      return undefined;
    }
  }

  private createStructuredQueryAttributeFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters[] | undefined {
    const translatedFilters: AbstractStructuredQueryFilters[] = [];
    criterion.getAttributeFilters().forEach((attributeFilter) => {
      const attributeCode = attributeFilter.getAttributeCode();
      if (attributeFilter.isConceptSet() && attributeFilter.getConcept()?.isSelectedConceptSet()) {
        const conceptFilter = this.createAttributeConceptFilter(attributeFilter.getConcept());
        conceptFilter.attributeCode = attributeCode;
        translatedFilters.push(conceptFilter);
      }
      if (
        attributeFilter.isReferenceSet() &&
        attributeFilter.getReference()?.isSelectedReferenceSet()
      ) {
        const referenceFilter = this.createReferences(attributeFilter.getReference());
        referenceFilter.attributeCode = attributeCode;
        translatedFilters.push(referenceFilter);
      }
      if (attributeFilter.isQuantitySet()) {
        const quantityFilter = this.quantityFilters(attributeFilter);
        quantityFilter.attributeCode = attributeCode;
        translatedFilters.push(quantityFilter);
      }
    });
    return translatedFilters.length > 0 ? translatedFilters : undefined;
  }

  private createStructuredQueryValueFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters | undefined {
    const translatedFilters: AbstractStructuredQueryFilters[] = [];
    criterion.getValueFilters().forEach((valueFilter) => {
      if (valueFilter.getConcept()?.getSelectedConcepts()) {
        translatedFilters.push(this.createAttributeConceptFilter(valueFilter.getConcept()));
      }
      if (valueFilter.getQuantity()) {
        translatedFilters.push(this.quantityFilters(valueFilter));
      }
    });
    return translatedFilters[0];
  }

  private quantityFilters(
    abstractAttributeFilter: ValueFilter | AttributeFilter
  ): AbstractStructuredQueryFilters {
    const type: FilterTypes = abstractAttributeFilter.getQuantity().getType();
    if (this.filter.isQuantityComparator(type)) {
      return this.createQuantityComparatorFilter(
        abstractAttributeFilter.getQuantity() as QuantityComparatorFilterFQ
      );
    }
    if (this.filter.isQuantityRange(type)) {
      return this.createQuantityRangeFilter(
        abstractAttributeFilter.getQuantity() as QuantityRangeFilterFQ
      );
    }
  }

  private createQuantityComparatorFilter(
    quantityComparator: QuantityComparatorFilterFQ
  ): QuantityComparatorFilterSQ | undefined {
    if (!this.filter.isNoneComparator(quantityComparator.getComparator())) {
      return this.setQuantityComparatorAttributes(quantityComparator);
    } else {
      return undefined;
    }
  }

  private createAttributeConceptFilter(conceptFilter: ConceptFilter): ConceptAttributeFilter {
    const conceptAttributeFilter = new ConceptAttributeFilter();
    conceptAttributeFilter.selectedConcepts = Array.from(conceptFilter.getSelectedConcepts());
    return conceptAttributeFilter;
  }

  private translateTimeRestrictionToStructuredQuery(criterion: Criterion): AbstractTimeRestriction {
    if (criterion.getTimeRestriction()) {
      if (criterion.getTimeRestriction().getAfterDate()) {
        const startDate = new Date(criterion.getTimeRestriction().getAfterDate());
        const endDate = new Date(criterion.getTimeRestriction().getBeforeDate());
        const offset = startDate.getTimezoneOffset() / -60;
        startDate.setHours(23 + offset, 59, 59, 999);
        endDate.setHours(offset, 0, 0, 0);

        switch (criterion.getTimeRestriction().getType()) {
          case TimeRestrictionType.AFTER: {
            const afterFilter = new AfterFilter();
            afterFilter.afterDate = startDate.toISOString().split('T')[0];
            return afterFilter;
          }
          case TimeRestrictionType.AT: {
            const atFilter = new AtFilter();
            atFilter.afterDate = startDate.toISOString().split('T')[0];
            atFilter.beforeDate = startDate.toISOString().split('T')[0];
            return atFilter;
          }
          case TimeRestrictionType.BEFORE: {
            const beforeFilter = new BeforeFilter();
            beforeFilter.beforeDate = startDate.toISOString().split('T')[0];
            return beforeFilter;
          }
          case TimeRestrictionType.BETWEEN: {
            const betweenFilter = new BetweenFilter();
            betweenFilter.afterDate = startDate.toISOString().split('T')[0];
            betweenFilter.beforeDate = endDate.toISOString().split('T')[0];
            return betweenFilter;
          }
        }
      }
    }
  }

  private setConceptValueFilter(valueFilter: ValueFilter): ConceptValueFilter | undefined {
    const conceptFilter = new ConceptValueFilter();
    if (valueFilter.getConcept()?.getSelectedConcepts().size > 0) {
      conceptFilter.selectedConcepts = Array.from(valueFilter.getConcept().getSelectedConcepts());
      return conceptFilter;
    } else {
      return undefined;
    }
  }

  private createReferences(referenceFilter: ReferenceFilterFQ): ReferenceFilterSQ {
    const translatedRefrenceFilter: ReferenceFilterSQ = new ReferenceFilterSQ();
    translatedRefrenceFilter.criteria = this.setEachLinkedCriteria(
      referenceFilter.getSelectedReferences()
    );
    return translatedRefrenceFilter;
  }

  private setEachLinkedCriteria(linkedCriteria: Criterion[]): StructuredQueryCriterion[] {
    const linkedCriteriaArray = new Array<StructuredQueryCriterion>();
    linkedCriteria.forEach((linkedCriterion) => {
      linkedCriteriaArray.push(this.assignStructuredQueryCriterionElements(linkedCriterion));
    });
    return linkedCriteriaArray;
  }

  private setQuantityComparatorAttributes(
    quantityComparator: QuantityComparatorFilterFQ
  ): QuantityComparatorFilterSQ {
    const comparatorFilter = new QuantityComparatorFilterSQ();
    comparatorFilter.comparator = quantityComparator.getComparator();
    comparatorFilter.value = quantityComparator.getValue();
    comparatorFilter.setUnit(this.assignQuantityUnit(quantityComparator.getSelectedUnit()));
    return comparatorFilter;
  }

  private createQuantityRangeFilter(quantityRange: QuantityRangeFilterFQ): QuantityRangeFilterSQ {
    const rangeFilter = new QuantityRangeFilterSQ();
    rangeFilter.maxValue = quantityRange.getMaxValue();
    rangeFilter.minValue = quantityRange.getMinValue();
    rangeFilter.setUnit(this.assignQuantityUnit(quantityRange.getSelectedUnit()));
    return rangeFilter;
  }

  private assignQuantityUnit(quantityUnit: QuantityUnitFQ): QuantityUnitSQ {
    return new QuantityUnitSQ(quantityUnit.getCode(), quantityUnit.getDisplay());
  }

  /**
   * best to create in next iteration an own instance
   *
   * @param termCode
   * @returns
   */
  private assignTermCodes(termCode: TerminologyCode[]): TerminologyCode[] {
    const terminologyCodes: TerminologyCode[] = new Array<TerminologyCode>();
    termCode.forEach((terminologyCode) => {
      terminologyCode.setCode(termCode[0].getCode());
      terminologyCode.setDisplay(termCode[0].getDisplay());
      terminologyCode.setSystem(termCode[0].getSystem());
      if (termCode[0].getVersion() !== undefined && termCode[0].getVersion() !== null) {
        terminologyCode.setVersion(termCode[0].getVersion());
      }
      //TODO: eigene TerminologyCode-Klasse für SQ anlegen!!
      terminologyCode.setUid(undefined);
      terminologyCodes.push(terminologyCode);
    });
    return terminologyCodes;
  }

  private getConsent(): StructuredQueryCriterion[] {
    return [
      {
        termCodes: [
          new TerminologyCode(
            '2.16.840.1.113883.3.1937.777.24.5.3.8',
            'MDAT wissenschaftlich nutzen EU DSGVO NIVEAU',
            'urn:oid:2.16.840.1.113883.3.1937.777.24.5.3'
          ),
        ],
        context: new TerminologyCode('Einwilligung', 'Einwilligung', 'fdpg.mii.cds', '1.0.0'),
      },
    ];
  }
}
