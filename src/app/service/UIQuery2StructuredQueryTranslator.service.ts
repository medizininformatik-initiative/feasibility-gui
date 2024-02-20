import { AbstractStructuredQueryFilters } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/AbstractStructuredQueryFilters';
import { AbstractTimeRestriction } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/TimeRestriction/AbstractTimeRestriction';
import { AfterFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/TimeRestriction/AfterFilter';
import { AtFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/TimeRestriction/AtFilter';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BeforeFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/TimeRestriction/BeforeFilter';
import { BetweenFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/TimeRestriction/BetweenFilter';
import { ConceptAttributeFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ConceptFilter/ConceptAttributeFilter';
import { ConceptValueFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ConceptFilter/ConceptValueFilter';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { FeatureService } from './Feature.service';
import { FilterTypes } from '../model/FilterTypes';
import { FilterTypesService } from './FilterTypes.service';
import { Group } from '../model/FeasibilityQuery/Group';
import { Injectable } from '@angular/core';
import { ObjectHelper } from '../modules/querybuilder/controller/ObjectHelper';
import { QuantityComparatorFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/QuantityFilter/QuantityComparatorFilter';
import { QuantityRangeFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/QuantityFilter/QuantityRangeFilter';
import { Query } from '../model/FeasibilityQuery/Query';
import { ReferenceFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ReferenceFilter/ReferenceFilter';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { StructuredQueryCriterion } from '../model/StructuredQuery/Criterion/StructuredQueryCriterion';
import { TerminologyCode } from '../model/terminology/Terminology';
import { TimeRestrictionType } from '../model/FeasibilityQuery/TimeRestriction';
import { ValueFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { AbstractAttributeFilters } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';

@Injectable({
  providedIn: 'root',
})
export class UIQuery2StructuredQueryTranslatorService {
  constructor(private featureService: FeatureService, private filter: FilterTypesService) {}

  public translateToStructuredQuery(feasibilityQuery: Query): StructuredQuery {
    const structuredQuery = new StructuredQuery();
    if (feasibilityQuery.display) {
      structuredQuery.display = feasibilityQuery.display;
    }
    const group: Group = feasibilityQuery.groups[0];
    structuredQuery.inclusionCriteria = this.translateInclusionCriteria(group);
    structuredQuery.exclusionCriteria = this.translateExclusionCriteria(group);
    if (feasibilityQuery.consent) {
      structuredQuery.inclusionCriteria.push(this.getConsent());
    }
    return structuredQuery;
  }

  private translateInclusionCriteria(group: Group): StructuredQueryCriterion[][] | [] {
    const inclusionCriteria = ObjectHelper.clone(group.inclusionCriteria);
    if (inclusionCriteria.length > 0) {
      return this.translateCriterionGroup(inclusionCriteria);
    }
  }

  private translateExclusionCriteria(group: Group): StructuredQueryCriterion[][] | undefined {
    const exclusionCriteria = ObjectHelper.clone(group.exclusionCriteria);
    console.log(exclusionCriteria);
    if (exclusionCriteria.length > 0) {
      return this.translateCriterionGroup(exclusionCriteria);
    } else {
      return undefined;
    }
  }

  private translateCriterionGroup(criterionGroup: Criterion[][]): StructuredQueryCriterion[][] {
    const structuredQueryCriterion: StructuredQueryCriterion[][] = [];
    criterionGroup.forEach((criterionArray) => {
      const innerArray: StructuredQueryCriterion[] = this.translateInnerArray(criterionArray);
      if (innerArray.length > 0) {
        structuredQueryCriterion.push(innerArray);
      }
    });
    return structuredQueryCriterion.length > 0 ? structuredQueryCriterion : undefined;
  }

  private translateInnerArray(criterionArray: Criterion[]): StructuredQueryCriterion[] {
    const structuredQueryInnerArray: StructuredQueryCriterion[] = [];
    criterionArray.forEach((criterion) => {
      if (criterion.isLinked !== true) {
        structuredQueryInnerArray.push(this.assignStructuredQueryCriterionElements(criterion));
      }
    });
    return structuredQueryInnerArray;
  }

  private assignStructuredQueryCriterionElements(criterion: Criterion): StructuredQueryCriterion {
    const structuredQueryCriterion = new StructuredQueryCriterion();
    structuredQueryCriterion.attributeFilters = this.translateAttributeFilters(criterion);
    structuredQueryCriterion.context = this.addContextToStructuredQuery(criterion);
    structuredQueryCriterion.termCodes = this.assignTermCodes(criterion.termCodes);
    structuredQueryCriterion.timeRestriction =
      this.translateTimeRestrictionToStructuredQuery(criterion);
    structuredQueryCriterion.valueFilter = this.translateValueFilter(criterion);
    return structuredQueryCriterion;
  }

  private addContextToStructuredQuery(criterion: Criterion): TerminologyCode | undefined {
    if (this.featureService.getSendSQContextToBackend()) {
      return criterion.context;
    } else {
      return undefined;
    }
  }

  private translateAttributeFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters[] | undefined {
    if (criterion.attributeFilters.length > 0) {
      return this.createStructuredQueryAttributeFilters(criterion);
    } else {
      return undefined;
    }
  }

  private translateValueFilter(criterion: Criterion): AbstractStructuredQueryFilters | undefined {
    if (criterion.valueFilters.length > 0) {
      return this.createStructuredQueryValueFilters(criterion);
    } else {
      return undefined;
    }
  }

  private createStructuredQueryAttributeFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters[] | undefined {
    const translatedFilters: AbstractStructuredQueryFilters[] = [];
    criterion.attributeFilters.forEach((attributeFilter) => {
      const type = attributeFilter.type;
      if (this.filter.isConcept(type) && attributeFilter.selectedConcepts?.length > 0) {
        translatedFilters.push(this.attributeConceptFilter(attributeFilter));
      }
      if (this.filter.isReference(type) && criterion.linkedCriteria?.length > 0) {
        translatedFilters.push(this.setReferences(criterion.linkedCriteria, attributeFilter));
      }
      if (this.filter.isQuantity(type)) {
        translatedFilters.push(this.quantityFilters(attributeFilter));
      }
    });
    return translatedFilters.length > 0 ? translatedFilters : undefined;
  }

  private createStructuredQueryValueFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters | undefined {
    const translatedFilters: AbstractStructuredQueryFilters[] = [];
    criterion.valueFilters.forEach((valueFilter) => {
      if (this.filter.isConcept(valueFilter.type)) {
        translatedFilters.push(this.createValueConceptFilter(valueFilter));
      } else {
        translatedFilters.push(this.quantityFilters(valueFilter));
      }
    });
    return translatedFilters[0];
  }

  private quantityFilters(
    abstractAttributeFilter: ValueFilter | AttributeFilter
  ): AbstractStructuredQueryFilters {
    const type: FilterTypes = abstractAttributeFilter.type;
    if (this.filter.isQuantityComparator(type)) {
      return this.createQuantityComparatorFilter(abstractAttributeFilter);
    }
    if (this.filter.isQuantityRange(type)) {
      return this.createQuantityRangeFilter(abstractAttributeFilter);
    }
  }

  private createQuantityComparatorFilter(
    attributeFilter: AttributeFilter | ValueFilter
  ): QuantityComparatorFilter | undefined {
    if (this.isQuantityFilter(attributeFilter)) {
      if (!this.filter.isNoneComparator(attributeFilter.comparator)) {
        return this.setQuantityComparatorAttributes(attributeFilter);
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  private createQuantityRangeFilter(
    attributeFilter: AttributeFilter | ValueFilter
  ): QuantityRangeFilter | undefined {
    if (this.isQuantityFilter(attributeFilter)) {
      return this.setQuantityRangeAttributes(attributeFilter);
    } else {
      return undefined;
    }
  }

  private isQuantityFilter(abstractAttributeFilter: AbstractAttributeFilters): boolean {
    if (this.filter.isQuantity(abstractAttributeFilter.type)) {
      return true;
    } else {
      return false;
    }
  }

  private attributeConceptFilter(
    attributeFilter: AttributeFilter
  ): ConceptAttributeFilter | undefined {
    if (this.filter.isConcept(attributeFilter.type)) {
      return this.createAttributeConceptFilter(attributeFilter);
    } else {
      return undefined;
    }
  }

  private createAttributeConceptFilter(attributeFilter: AttributeFilter): ConceptAttributeFilter {
    const conceptFilter = new ConceptAttributeFilter();
    conceptFilter.attributeCode = this.assignAttributeCode(
      attributeFilter.attributeDefinition.attributeCode
    );
    conceptFilter.selectedConcepts = attributeFilter.selectedConcepts;
    return conceptFilter;
  }

  private createValueConceptFilter(
    valueFilter: ValueFilter
  ): AbstractStructuredQueryFilters | undefined {
    if (this.filter.isConcept(valueFilter.type)) {
      return this.setConceptValueFilter(valueFilter);
    } else {
      return undefined;
    }
  }

  private translateTimeRestrictionToStructuredQuery(criterion: Criterion): AbstractTimeRestriction {
    if (criterion.timeRestriction) {
      if (criterion.timeRestriction.minDate) {
        const startDate = new Date(criterion.timeRestriction.minDate);
        const endDate = new Date(criterion.timeRestriction.maxDate);
        const offset = startDate.getTimezoneOffset() / -60;
        startDate.setHours(23 + offset, 59, 59, 999);
        endDate.setHours(offset, 0, 0, 0);

        switch (criterion.timeRestriction.tvpe) {
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

  private setConceptValueFilter(valueFilter: ValueFilter): ConceptValueFilter {
    const conceptFilter = new ConceptValueFilter();
    conceptFilter.selectedConcepts = valueFilter.selectedConcepts;
    return conceptFilter;
  }

  private setReferences(
    linkedCriteria: Criterion[],
    attributeFilter: AttributeFilter
  ): ReferenceFilter {
    const translatedRefrenceFilter: ReferenceFilter = new ReferenceFilter();
    translatedRefrenceFilter.attributeCode = this.assignAttributeCode(
      attributeFilter.attributeDefinition.attributeCode
    );
    translatedRefrenceFilter.criteria = this.setEachLinkedCriteria(linkedCriteria);
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
    attributeFilter: AttributeFilter | ValueFilter
  ): QuantityComparatorFilter {
    const comparatorFilter = new QuantityComparatorFilter();
    if (attributeFilter instanceof AttributeFilter) {
      comparatorFilter.attributeCode = this.assignAttributeCode(
        attributeFilter.attributeDefinition.attributeCode
      );
    }
    comparatorFilter.comparator = attributeFilter.comparator;
    comparatorFilter.unit.code = attributeFilter.unit.code;
    comparatorFilter.unit.display = attributeFilter.unit.display;
    comparatorFilter.value = attributeFilter.value;
    return comparatorFilter;
  }

  private setQuantityRangeAttributes(
    attributeFilter: AttributeFilter | ValueFilter
  ): QuantityRangeFilter {
    const rangeFilter = new QuantityRangeFilter();
    if (attributeFilter instanceof AttributeFilter) {
      rangeFilter.attributeCode = this.assignAttributeCode(
        attributeFilter.attributeDefinition.attributeCode
      );
    }
    rangeFilter.maxValue = attributeFilter.maxValue;
    rangeFilter.minValue = attributeFilter.minValue;
    rangeFilter.unit.code = attributeFilter.unit.code;
    rangeFilter.unit.display = attributeFilter.unit.display;
    return rangeFilter;
  }

  private assignAttributeCode(attributeCode: TerminologyCode): TerminologyCode {
    const attributeCodeStructured: TerminologyCode = new TerminologyCode();
    attributeCodeStructured.code = attributeCode?.code;
    attributeCodeStructured.display = attributeCode?.display;
    attributeCodeStructured.system = attributeCode?.system;
    if (attributeCode.version !== undefined && attributeCode.version !== null) {
      attributeCodeStructured.version = attributeCode.version;
    }
    return attributeCodeStructured;
  }

  private assignTermCodes(termCode: TerminologyCode[]): TerminologyCode[] {
    const terminologyCodes: TerminologyCode[] = new Array<TerminologyCode>();
    termCode.forEach((terminologyCode) => {
      terminologyCode.code = termCode[0].code;
      terminologyCode.display = termCode[0].display;
      terminologyCode.system = termCode[0].system;
      if (termCode[0].version !== undefined && termCode[0].version !== null) {
        terminologyCode.version = termCode[0].version;
      }
      //TODO: eigene TerminologyCode-Klasse für SQ anlegen
      terminologyCode.uid = undefined;
      terminologyCodes.push(terminologyCode);
    });
    return terminologyCodes;
  }

  private isInstanceOfAttributeFilter(feasibilityQuerytAttributeFilter) {
    if (feasibilityQuerytAttributeFilter instanceof AttributeFilter) {
      return this.assignAttributeCode(
        feasibilityQuerytAttributeFilter.attributeDefinition.attributeCode
      );
    }
  }

  private getConsent(): StructuredQueryCriterion[] {
    return [
      {
        context: {
          code: 'Einwilligung',
          display: 'Einwilligung',
          system: 'fdpg.mii.cds',
          version: '1.0.0',
        },
        termCodes: [
          {
            code: '2.16.840.1.113883.3.1937.777.24.5.3.8',
            display: 'MDAT wissenschaftlich nutzen EU DSGVO NIVEAU',
            system: 'urn:oid:2.16.840.1.113883.3.1937.777.24.5.3',
          },
        ],
      },
    ];
  }
}
