import { AbstractAttributeFilters } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractStructuredQueryFilters } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/AbstractStructuredQueryFilters';
import { AbstractTimeRestriction } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/TimeRestriction/AbstractTimeRestriction';
import { AttributeDefinition } from '../model/terminology/AttributeDefinitions/AttributeDefinition';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { ConceptAttributeFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ConceptFilter/ConceptAttributeFilter';
import { ConceptValueFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ConceptFilter/ConceptValueFilter';
import { CreateCriterionService } from './CriterionService/CreateCriterion.service';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { FilterTypes } from '../model/FilterTypes';
import { FilterTypesService } from './FilterTypes.service';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Query } from '../model/FeasibilityQuery/Query';
import { ReferenceFilter } from '../model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/ReferenceFilter/ReferenceFilter';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { StructuredQueryCriterion } from '../model/StructuredQuery/Criterion/StructuredQueryCriterion';
import { TerminologyCode } from '../model/terminology/Terminology';
import { TimeRestriction, TimeRestrictionType } from '../model/FeasibilityQuery/TimeRestriction';
import { ValidationService } from './Validation.service';
import { ValueFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { QueryProviderService } from '../modules/querybuilder/service/query-provider.service';
import { StructuredQueryInquiry } from '../model/SavedInquiry/StructuredQueryInquiry';

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2UIQueryTranslatorService {
  hasConsent = false;
  private invalidCriteriaSet: Set<string> = new Set();

  constructor(
    private filter: FilterTypesService,
    private validationService: ValidationService,
    private createCriterionService: CreateCriterionService
  ) {}

  /**
   * @todo we dont need uiquery as a parameter, needs to be create with queryprovdierservice inside this service
   * @param uiquery
   * @param sqquery
   * @returns
   */
  public translateImportedSQtoUIQuery(
    uiquery: Query,
    structuredQuery: StructuredQuery
  ): Observable<Query> {
    this.hasConsent = false;
    const subject = new Subject<Query>();
    const inclusion = structuredQuery.inclusionCriteria ? structuredQuery.inclusionCriteria : [];
    const exclusion = structuredQuery.exclusionCriteria ? structuredQuery.exclusionCriteria : [];
    this.getInvalidCriteriaSet(structuredQuery).subscribe(() => {
      this.translateSQtoUICriteria(inclusion).subscribe((inclusionQuery) => {
        uiquery.groups[0].inclusionCriteria = this.addReferenceCriteria(inclusionQuery);
        //TODO: find a better way for joining in- and exclusion instead of nested subscription
        this.translateSQtoUICriteria(exclusion).subscribe((exclusionQuery) => {
          uiquery.groups[0].exclusionCriteria = this.addReferenceCriteria(exclusionQuery);
          uiquery.consent = this.hasConsent;
          subject.next(this.rePosition(uiquery));
          subject.complete();
        });
      });
    });
    return subject.asObservable();
  }

  private getInvalidCriteriaSet(structuredQuery: StructuredQuery): Observable<Set<string>> {
    const invalidCriteriaSetSubject = new Subject<Set<string>>();
    this.validationService.validateStructuredQuery(structuredQuery).subscribe((invalidCriteria) => {
      this.invalidCriteriaSet = this.createSetOfInvalidCriteria(invalidCriteria);
      invalidCriteriaSetSubject.next(this.invalidCriteriaSet);
      invalidCriteriaSetSubject.complete();
    });
    return invalidCriteriaSetSubject.asObservable();
  }

  private createSetOfInvalidCriteria(invalidCriteria: StructuredQueryCriterion[]): Set<string> {
    const invalidCriteriaSet = new Set<string>();
    invalidCriteria.forEach((invalidCriterion) => {
      invalidCriteriaSet.add(JSON.stringify(invalidCriterion.termCodes[0]));
    });
    return invalidCriteriaSet;
  }

  public translateSQtoUIQuery(structuredQueryInquiry: StructuredQueryInquiry): Observable<Query> {
    const uiquery: Query = QueryProviderService.createDefaultQuery();
    this.hasConsent = false;
    const subject = new Subject<Query>();
    const inclusion = structuredQueryInquiry.content.inclusionCriteria
      ? structuredQueryInquiry.content.inclusionCriteria
      : [];
    const exclusion = structuredQueryInquiry.content.exclusionCriteria
      ? structuredQueryInquiry.content.exclusionCriteria
      : [];
    this.invalidCriteriaSet = this.createSetOfInvalidCriteria(
      structuredQueryInquiry.invalidCriteria
    );
    this.translateSQtoUICriteria(inclusion).subscribe((inclusionQuery) => {
      uiquery.groups[0].inclusionCriteria = this.addReferenceCriteria(inclusionQuery);
      //TODO: find a better way for joining in- and exclusion instead of nested subscription
      this.translateSQtoUICriteria(exclusion).subscribe((exclusionQuery) => {
        uiquery.groups[0].exclusionCriteria = this.addReferenceCriteria(exclusionQuery);
        uiquery.consent = this.hasConsent;
        subject.next(this.rePosition(uiquery));
        subject.complete();
      });
    });
    return subject.asObservable();
  }

  private translateSQtoUICriteria(
    inexclusion: StructuredQueryCriterion[][]
  ): Observable<Criterion[][]> {
    const resultInExclusion: Criterion[][] = [];
    const observableBatch = [];

    inexclusion.forEach((structuredQueryCriterionArray) => {
      const criterionArray: Criterion[] = [];
      observableBatch.push(this.innerCriterion(structuredQueryCriterionArray));
      resultInExclusion.push(criterionArray);
    });

    return observableBatch.filter(Boolean).length > 0
      ? forkJoin(observableBatch.filter(Boolean))
      : of([]);
  }

  private innerCriterion(
    structuredQueryCriterionInnerArray: StructuredQueryCriterion[]
  ): Observable<Criterion[]> {
    const observableBatch = [];
    structuredQueryCriterionInnerArray.forEach((structuredQueryCriterion) => {
      if (this.consentIsNotSet(structuredQueryCriterion.termCodes)) {
        observableBatch.push(
          this.createCriterionFromStructuredQueryCriterion(structuredQueryCriterion)
        );
      }
    });
    return observableBatch.length > 0 ? forkJoin(observableBatch) : undefined;
  }

  private consentIsNotSet(termCodes: Array<TerminologyCode>): boolean {
    const consentCode = '2.16.840.1.113883.3.1937.777.24.5.3.8';
    const systemConsent = 'urn:oid:2.16.840.1.113883.3.1937.777.24.5.3';
    if (termCodes[0].code === consentCode && termCodes[0].system === systemConsent) {
      this.hasConsent = true;
      return false;
    } else {
      return true;
    }
  }

  private createCriterionFromStructuredQueryCriterion(
    structuredQueryCriterion: StructuredQueryCriterion
  ): Observable<Criterion> {
    let criterion: Criterion;
    const subject = new Subject<Criterion>();
    this.createCriterionService
      .createCriterionFromTermCode(
        structuredQueryCriterion.termCodes,
        structuredQueryCriterion.context,
        this.invalidCriteriaSet
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
          if (find?.type === 'reference') {
            find.attributeDefinition.selectableConcepts =
              attribute.attributeDefinition.selectableConcepts;
            find.attributeDefinition.optional = attribute.attributeDefinition.optional;
          }
          if (find?.type === 'concept') {
            if (attribute.selectedConcepts) {
              find.selectedConcepts = attribute.selectedConcepts;
            }
          }
          if (find?.type === 'quantity-comparator' || find?.type === 'quantity-range') {
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
