import { AbstractAttributeFilters } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractStructuredQueryFilters } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/AbstractStructuredQueryFilters';
import { AbstractTimeRestriction } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/TimeRestriction/AbstractTimeRestriction';
import { AttributeDefinition } from '../model/terminology/AttributeDefinitions/AttributeDefinition';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BeforeFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/TimeRestriction/BeforeFilter';
import { ConceptAttributeFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ConceptFilter/ConceptAttributeFilter';
import { ConceptValueFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ConceptFilter/ConceptValueFilter';
import { CreateCriterionService } from './CriterionService/CreateCriterion.service';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { FilterTypes } from '../model/FilterTypes';
import { FilterTypesService } from './FilterTypes.service';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ObjectHelper } from '../modules/querybuilder/controller/ObjectHelper';
import { Query } from '../model/FeasibilityQuery/Query';
import { ReferenceFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ReferenceFilter/ReferenceFilter';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { StructuredQueryCriterion } from '../model/StructuredQuery/Criterion/StructuredQueryCriterion';
import { StructuredQueryTemplate } from '../model/StructuredQuery/StructuredQueryTemplate';
import { TerminologyCode } from '../model/terminology/Terminology';
import { TimeRestriction, TimeRestrictionType } from '../model/FeasibilityQuery/TimeRestriction';
import { ValueFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2UIQueryTranslatorService {
  constructor(
    private filter: FilterTypesService,
    private createCriterionService: CreateCriterionService
  ) {}

  public translateImportedSQtoUIQuery(uiquery: Query, sqquery: StructuredQuery): Observable<Query> {
    const invalidCriteria = [];
    const subject = new Subject<Query>();
    const inclusion = sqquery.inclusionCriteria ? sqquery.inclusionCriteria : [];
    const exclusion = sqquery.exclusionCriteria ? sqquery.exclusionCriteria : [];
    this.translateSQtoUICriteria(inclusion, invalidCriteria).subscribe((inclusionQuery) => {
      uiquery.groups[0].inclusionCriteria = this.addReferenceCriteria(inclusionQuery);

      //TODO: find a better way for joining in- and exclusion instead of nested subscription
      this.translateSQtoUICriteria(exclusion, invalidCriteria).subscribe((exclusionQuery) => {
        uiquery.groups[0].exclusionCriteria = this.addReferenceCriteria(exclusionQuery);
        subject.next(this.rePosition(uiquery));
        subject.complete();
      });
    });

    //uiquery.consent = this.hasConsentAndIfSoDeleteIt(sqquery);

    return subject.asObservable();
  }

  public translateSQtoUIQuery(uiquery: Query, sqquery: StructuredQueryTemplate): Observable<Query> {
    const invalidCriteria = sqquery.invalidTerms;
    const subject = new Subject<Query>();
    const inclusion = sqquery.content.inclusionCriteria ? sqquery.content.inclusionCriteria : [];
    const exclusion = sqquery.content.exclusionCriteria ? sqquery.content.exclusionCriteria : [];
    this.translateSQtoUICriteria(inclusion, invalidCriteria).subscribe((inclusionQuery) => {
      uiquery.groups[0].inclusionCriteria = this.addReferenceCriteria(inclusionQuery);

      //TODO: find a better way for joining in- and exclusion instead of nested subscription
      this.translateSQtoUICriteria(exclusion, invalidCriteria).subscribe((exclusionQuery) => {
        uiquery.groups[0].exclusionCriteria = this.addReferenceCriteria(exclusionQuery);
        subject.next(this.rePosition(uiquery));
        subject.complete();
      });
    });

    //uiquery.consent = this.hasConsentAndIfSoDeleteIt(sqquery.content);

    return subject.asObservable();
  }

  private translateSQtoUICriteria(
    inexclusion: StructuredQueryCriterion[][],
    invalidCriteria: TerminologyCode[]
  ): Observable<Criterion[][]> {
    const invalidCriteriaSet = this.getInvalidCriteriaSet(invalidCriteria);
    const resultInExclusion: Criterion[][] = [];
    const observableBatch = [];

    inexclusion.forEach((structuredQueryCriterionArray) => {
      const criterionArray: Criterion[] = [];
      observableBatch.push(this.innerCriterion(structuredQueryCriterionArray));
      resultInExclusion.push(criterionArray);
    });

    return observableBatch.length > 0 ? forkJoin(observableBatch) : of([]);
  }

  private innerCriterion(
    structuredQueryCriterionInnerArray: StructuredQueryCriterion[]
  ): Observable<Criterion[]> {
    const observableBatch = [];
    structuredQueryCriterionInnerArray.forEach((structuredQueryCriterion) => {
      observableBatch.push(
        this.createCriterionFromStructuredQueryCriterion(structuredQueryCriterion)
      );
    });
    return observableBatch.length > 0 ? forkJoin(observableBatch) : of([]);
  }

  /**
   * @todo Work in progress
   */
  private getInvalidCriteriaSet(invalidCriteria: TerminologyCode[]): Set<string> {
    const invalidCriteriaSet: Set<string> = new Set();
    invalidCriteria.forEach((invalids) => {
      invalidCriteriaSet.add(JSON.stringify(invalids));
    });
    return invalidCriteriaSet;
  }

  private createCriterionFromStructuredQueryCriterion(
    structuredQueryCriterion: StructuredQueryCriterion
  ): Observable<Criterion> {
    let criterion: Criterion;
    const subject = new Subject<Criterion>();
    this.createCriterionService
      .createCriterionFromTermCode(
        structuredQueryCriterion.termCodes,
        structuredQueryCriterion.context
      )
      .subscribe((crit) => {
        criterion = crit;
        if (criterion.attributeFilters === undefined) {
          criterion.attributeFilters = [];
        }
        const structuredQueryAttribute = this.getAttributeFilters(
          structuredQueryCriterion,
          criterion
        );
        //TODO: outsource this in a separate function:
        structuredQueryAttribute.forEach((attribute) => {
          const find = criterion.attributeFilters.find(
            (attr) => attribute.attributeCode.code === attr.attributeDefinition.attributeCode.code
          );
          if (find.type === 'reference') {
            find.attributeDefinition.selectableConcepts =
              attribute.attributeDefinition.selectableConcepts;
            find.attributeDefinition.optional = attribute.attributeDefinition.optional;
          }
          if (find.type === 'concept') {
            if (attribute.selectedConcepts) {
              find.selectedConcepts = attribute.selectedConcepts;
            }
          }
          if (find.type === 'quantity-comparator' || find.type === 'quantity-range') {
            find.precision = attribute.precision;
            find.unit = attribute.unit;
            find.maxValue = attribute.maxValue;
            find.minValue = attribute.minValue;
            find.value = attribute.value;
            find.comparator = attribute.comparator;
          }
        });

        criterion.timeRestriction = this.addTimeRestriction(
          structuredQueryCriterion.timeRestriction
        );
        criterion.valueFilters = this.getValueFilters(structuredQueryCriterion);
        subject.next(criterion);
        subject.complete();
      });

    return subject.asObservable();
  }

  private getAttributeFilters(
    structuredCriterion: StructuredQueryCriterion,
    criterion: Criterion
  ): AttributeFilter[] {
    const attributeFilters: AttributeFilter[] = [];
    structuredCriterion.attributeFilters?.forEach((structuredQueryAttributeFilter) => {
      const attributeFilter: AttributeFilter = this.createAttributeFilter(
        structuredQueryAttributeFilter,
        criterion
      ) as AttributeFilter;
      attributeFilters.push(attributeFilter);
    });
    return attributeFilters;
  }

  private createAttributeFilter(
    structuredQueryAttributeFilter: AbstractStructuredQueryFilters,
    criterion: Criterion
  ) {
    const attributeFilter: AttributeFilter = new AttributeFilter();
    if (this.filter.isConcept(structuredQueryAttributeFilter.type)) {
      const conceptFilter = structuredQueryAttributeFilter as ConceptAttributeFilter;
      attributeFilter.attributeCode = conceptFilter.attributeCode;
      attributeFilter.type = FilterTypes.CONCEPT;
      attributeFilter.selectedConcepts = conceptFilter.selectedConcepts;
    }
    if (this.filter.isQuantityComparator(structuredQueryAttributeFilter.type)) {
      return this.createQuantityComparatorFilter(structuredQueryAttributeFilter, attributeFilter);
    }
    if (this.filter.isQuantityRange(structuredQueryAttributeFilter.type)) {
      return this.createQuantityRangeFilter(
        structuredQueryAttributeFilter,
        attributeFilter
      ) as AttributeFilter;
    }
    if (this.filter.isReference(structuredQueryAttributeFilter.type)) {
      const referenceFilter = structuredQueryAttributeFilter as ReferenceFilter;
      attributeFilter.attributeCode = referenceFilter.attributeCode;
      attributeFilter.type = FilterTypes.REFERENCE;
      referenceFilter.criteria.forEach((refCrit) => {
        const referenceCriteria = this.createCriterionService.createReferenceCriterionFromTermCode(
          refCrit.termCodes,
          refCrit.context
        );
        criterion.linkedCriteria.push(referenceCriteria);
        attributeFilter.attributeDefinition = new AttributeDefinition();
        attributeFilter.attributeDefinition.selectableConcepts.push(refCrit.termCodes[0]);
        attributeFilter.attributeDefinition.optional = true;
      });
    }
    return attributeFilter;
  }

  private createQuantityComparatorFilter(
    structuredQueryAttributeFilter,
    abstractFilter: AbstractAttributeFilters
  ): AbstractAttributeFilters {
    abstractFilter.type = FilterTypes.QUANTITY_COMPARATOR;
    abstractFilter.comparator = structuredQueryAttributeFilter.comparator;
    abstractFilter.unit = structuredQueryAttributeFilter.unit;
    abstractFilter.value = structuredQueryAttributeFilter.value;
    return abstractFilter;
  }

  private createQuantityRangeFilter(
    structuredQueryAttributeFilter,
    abstractFilter: AbstractAttributeFilters
  ): AbstractAttributeFilters {
    abstractFilter.type = FilterTypes.QUANTITY_RANGE;
    abstractFilter.maxValue = structuredQueryAttributeFilter.maxValue;
    abstractFilter.minValue = structuredQueryAttributeFilter.minValue;
    abstractFilter.unit = structuredQueryAttributeFilter.unit;
    return abstractFilter;
  }

  /**
   * @todo We keep ValueFilters as an Array despite being only one element inside the array
   * @todo we need to test if the declaration with 'as' is assigning all requiered fields
   * @param structuredCriterion
   * @returns
   */
  private getValueFilters(structuredCriterion: StructuredQueryCriterion): ValueFilter[] {
    const valueFiltersResult: ValueFilter[] = [];
    if (structuredCriterion.valueFilter) {
      valueFiltersResult.push(this.createValueFilter(structuredCriterion.valueFilter));
    }
    return valueFiltersResult;
  }

  private createValueFilter(
    structuredQueryValueFilter: AbstractStructuredQueryFilters
  ): ValueFilter {
    const valueFilterResult: ValueFilter = new ValueFilter();
    if (this.filter.isConcept(structuredQueryValueFilter.type)) {
      const conceptFilter = structuredQueryValueFilter as ConceptValueFilter;
      valueFilterResult.type = FilterTypes.CONCEPT;
      valueFilterResult.selectedConcepts = conceptFilter.selectedConcepts;
      return valueFilterResult;
    }
    if (this.filter.isQuantityComparator(structuredQueryValueFilter.type)) {
      return this.createQuantityComparatorFilter(
        structuredQueryValueFilter,
        valueFilterResult
      ) as ValueFilter;
    }
    if (this.filter.isQuantityRange(structuredQueryValueFilter.type)) {
      return this.createQuantityRangeFilter(
        structuredQueryValueFilter,
        valueFilterResult
      ) as ValueFilter;
    }
  }

  private addTimeRestriction(timeRestriction: AbstractTimeRestriction): TimeRestriction {
    const resultTimeRestriction = new TimeRestriction();
    if (timeRestriction) {
      if (timeRestriction.beforeDate && timeRestriction.afterDate) {
        if (timeRestriction.beforeDate === timeRestriction.afterDate) {
          resultTimeRestriction.tvpe = TimeRestrictionType.AT;
          resultTimeRestriction.minDate = new Date(timeRestriction.beforeDate);
        } else {
          resultTimeRestriction.tvpe = TimeRestrictionType.BETWEEN;
          resultTimeRestriction.minDate = new Date(timeRestriction.afterDate);
          resultTimeRestriction.maxDate = new Date(timeRestriction.beforeDate);
        }
      }
      if (timeRestriction.beforeDate && !timeRestriction.afterDate) {
        resultTimeRestriction.tvpe = TimeRestrictionType.BEFORE;
        resultTimeRestriction.minDate = new Date(timeRestriction.beforeDate);
      }
      if (!timeRestriction.beforeDate && timeRestriction.afterDate) {
        resultTimeRestriction.tvpe = TimeRestrictionType.AFTER;
        resultTimeRestriction.minDate = new Date(timeRestriction.afterDate);
      }
    }
    return resultTimeRestriction;
  }

  private addReferenceCriteria(inexclusion: Criterion[][]): Criterion[][] {
    inexclusion.forEach((outerCrit) => {
      outerCrit.forEach((innerCrit) => {
        if (innerCrit.linkedCriteria.length > 0) {
          innerCrit.linkedCriteria.forEach((crit) => {
            inexclusion.unshift([crit]);
          });
        }
      });
    });
    return inexclusion;
  }

  private rePosition(query: Query): Query {
    for (const inex of ['inclusion', 'exclusion']) {
      query.groups[0][inex + 'Criteria'].forEach((disj, i) => {
        disj.forEach((conj, j) => {
          conj.position.row = i;
          conj.position.column = j;
          conj.position.critType = inex;
          if (conj.isLinked) {
            this.setPositionForRefCrit(query, conj.uniqueID, i, j, inex);
          }
        });
      });
    }
    return query;
  }

  private setPositionForRefCrit(
    query: Query,
    uid: string,
    row: number,
    column: number,
    critType: string
  ): Query {
    for (const inex of ['inclusion', 'exclusion']) {
      query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.linkedCriteria?.length > 0) {
            conj.linkedCriteria.forEach((linkedCrit) => {
              if (linkedCrit.uniqueID === uid) {
                linkedCrit.position.row = row;
                linkedCrit.position.column = column;
                linkedCrit.position.critType = critType;
              }
            });
          }
        });
      });
    }
    return query;
  }
}
