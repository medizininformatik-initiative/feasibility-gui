import { AbstractCriterion } from '../../../model/FeasibilityQuery/Criterion/AbstractCriterion';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AttributeFilterData } from 'src/app/model/Interface/AttributeFilterData';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { ConceptData } from 'src/app/model/Interface/ConceptData';
import { ConceptTranslationCacheService } from '../ConceptTranslationCache.service';
import { ConsentService } from '../../Consent/Consent.service';
import { CreateCriterionService } from '../../Criterion/Builder/Create/CreateCriterionService';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { CriterionValidationService } from '../../Criterion/CriterionValidation.deprecated.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { HashService } from '../../Hash.service';
import { Injectable } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { ReferenceCriterion } from '../../../model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { StructuredQueryCriterionData } from 'src/app/model/Interface/StructuredQueryCriterionData';
import { StructuredQueryData } from 'src/app/model/Interface/StructuredQueryData';
import { TerminologyApiService } from '../../Backend/Api/TerminologyApi.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { TerminologyCodeData } from 'src/app/model/Interface/TerminologyCodeData';
import { TypeGuard } from '../../TypeGuard/TypeGuard';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { ValueFilterData } from 'src/app/model/Interface/ValueFilterData';

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2UIQueryTranslatorService {
  private subscription: Subscription;
  private hashMap: Array<{
    hash: string
    abstractCriterion: AbstractCriterion
  }> = [];

  constructor(
    private createCriterionService: CreateCriterionService,
    private terminologyApiService: TerminologyApiService,
    private conceptTranslationCache: ConceptTranslationCacheService,
    private hashService: HashService,
    private consentService: ConsentService,
    private criterionProvider: CriterionProviderService,
    private uITimeRestrictionFactoryService: UITimeRestrictionFactoryService,
    private criterionValidationService: CriterionValidationService
  ) {}

  public translateInExclusion(
    inexclusion: StructuredQueryCriterionData[][]
  ): Observable<string[][]> {
    const hashes = [];
    this.hashMap = [];

    inexclusion.forEach((criterionArray: StructuredQueryCriterionData[]) => {
      hashes.push(...this.innerCriterion(criterionArray));
    });

    return this.createCriterionInstanceFromHashes(hashes).pipe(
      map(() => {
        let idArray: string[][] = [];
        inexclusion.forEach((criterionArray, index) => {
          if (!idArray[index]) {
            idArray[index] = [];
          }
          criterionArray?.forEach((structuredQueryCriterion, innerIndex) => {
            const termCode = TerminologyCode.fromJson(structuredQueryCriterion.termCodes[0]);

            if (!this.isConsent(termCode)) {
              this.setStructuredQueryCriterionFilter(structuredQueryCriterion);
              const hash = this.createSQHash(structuredQueryCriterion);
              const criterion = this.findCriterionInMapByHash(hash);
              idArray[index][innerIndex] = criterion.getId();
            } else {
              this.setConsent(termCode);
            }
          });
        });

        this.hashMap.forEach((element) => {
          const criterion: Criterion = element.abstractCriterion;
          criterion.setIsRequiredFilterSet(
            this.criterionValidationService.setIsFilterRequired(criterion)
          );
          this.criterionProvider.setCriterionByUID(criterion, criterion.getId());
        });
        idArray = idArray.filter((id) => id.length > 0);
        return idArray;
      })
    );
  }

  public setConsent(terminologyCode: TerminologyCode): void {
    const flags = this.consentService.getBooleanFlags(terminologyCode.getCode());
    this.consentService.setProvisionCode(
      flags.distributedAnalysis,
      flags.euGdpr,
      flags.insuranceData,
      flags.contact
    );
    this.consentService.setConsent(true);
  }

  public innerCriterion(
    structuredQueryCriterionInnerArray: StructuredQueryCriterionData[]
  ): string[] {
    return structuredQueryCriterionInnerArray.map(
      (structuredQueryCriterion: StructuredQueryCriterionData) => {
        const termCode = TerminologyCode.fromJson(structuredQueryCriterion.termCodes[0]);
        if (!this.isConsent(termCode)) {
          return this.createSQHash(structuredQueryCriterion);
        }
      }
    );
  }

  public setStructuredQueryCriterionFilter(structuredQueryCriterion: StructuredQueryCriterionData) {
    const structuredQueryCriterionHash = this.createSQHash(structuredQueryCriterion);
    const criterion = this.findCriterionInMapByHash(structuredQueryCriterionHash);
    this.applyTimeRestrictionIfPresent(structuredQueryCriterion, criterion);
    this.processAttributeFilters(structuredQueryCriterion.attributeFilters, criterion);
    this.processValueFilter(structuredQueryCriterion.valueFilter, criterion);
  }

  private applyTimeRestrictionIfPresent(
    structuredQueryCriterion: StructuredQueryCriterionData,
    criterion: Criterion
  ) {
    if (structuredQueryCriterion.timeRestriction) {
      criterion.setTimeRestriction(
        this.uITimeRestrictionFactoryService.createTimeRestrictionForFeasibilityQuery(
          structuredQueryCriterion.timeRestriction
        )
      );
    }
  }

  private processAttributeFilters(attributeFilters: AttributeFilterData[], criterion: Criterion) {
    if (TypeGuard.isArray(attributeFilters)) {
      attributeFilters?.forEach((structuredQueryAttributeFilter: AttributeFilterData) => {
        const foundAttributeFilter = this.findMatchingAttributeFilter(
          criterion,
          structuredQueryAttributeFilter
        );
        if (!foundAttributeFilter) {
          return;
        }
        this.handleFilterByType(foundAttributeFilter, structuredQueryAttributeFilter, criterion);
      });
    } else {
      return [];
    }
  }

  private findMatchingAttributeFilter(
    criterion: Criterion,
    structuredQueryAttributeFilter: AttributeFilterData
  ): AttributeFilter {
    return criterion
      .getAttributeFilters()
      .find(
        (attributeFilter: AttributeFilter) =>
          attributeFilter.getAttributeCode().getCode() ===
            structuredQueryAttributeFilter.attributeCode.code &&
          attributeFilter.getAttributeCode().getSystem() ===
            structuredQueryAttributeFilter.attributeCode.system
      );
  }

  private processValueFilter(structuredQueryValueFilter: ValueFilterData, criterion: Criterion) {
    if (TypeGuard.isValueFilterData(structuredQueryValueFilter)) {
      this.handleFilterByType(criterion.getValueFilters()[0], structuredQueryValueFilter, criterion);
    } else {
      return null;
    }
  }

  private handleFilterByType(
    foundAttributeFilter: AttributeFilter | ValueFilter,
    structuredQueryAttributeFilter: AttributeFilterData | ValueFilterData,
    criterion: Criterion
  ) {
    const type: FilterTypes = foundAttributeFilter?.getFilterType();

    switch (type) {
      case FilterTypes.CONCEPT:
        this.handleConceptFilter(foundAttributeFilter, structuredQueryAttributeFilter);
        break;
      case FilterTypes.QUANTITY:
        this.handleQuantityFilter(foundAttributeFilter, structuredQueryAttributeFilter);
        break;
      case FilterTypes.REFERENCE:
        this.handleReferenceFilter(foundAttributeFilter, structuredQueryAttributeFilter, criterion);
        break;
    }
  }

  private handleConceptFilter(
    foundAttributeFilter: AttributeFilter | ValueFilter,
    structuredQueryAttributeFilter: AttributeFilterData | ValueFilterData
  ) {
    this.subscription?.unsubscribe();
    const notTranslatedHashes = structuredQueryAttributeFilter.selectedConcepts
      .filter(
        (concept) =>
          this.conceptTranslationCache.getConceptDisplayById(
            this.hashService.createConceptHash(concept)
          ) === undefined
      )
      .map((concept) => this.hashService.createConceptHash(concept));
    if (notTranslatedHashes.length > 0) {
      this.subscription = this.terminologyApiService
        .getCodeableConceptsByIds(notTranslatedHashes)
        .subscribe((conceptsData) => {
          conceptsData.forEach((conceptData: ConceptData) => {
            const display = Display.fromJson(conceptData.display);
            this.conceptTranslationCache.setConceptDisplayById(conceptData.id, display);
          });
          const conceptFilter = this.setConcepts(structuredQueryAttributeFilter.selectedConcepts);
          foundAttributeFilter.getConcept().setSelectedConcepts(conceptFilter);
        });
    } else {
      const conceptFilter = this.setConcepts(structuredQueryAttributeFilter.selectedConcepts);
      foundAttributeFilter.getConcept().setSelectedConcepts(conceptFilter);
    }
  }

  private setConcepts(selectedConceptsData: TerminologyCodeData[]): Concept[] {
    const selectedConcepts: Concept[] = selectedConceptsData.map((concept: TerminologyCodeData) => {
      const terminologyCode = TerminologyCode.fromJson(concept);
      const hash = this.hashService.createConceptHash(concept);
      const display = this.conceptTranslationCache.getConceptDisplayById(hash);
      return new Concept(display, terminologyCode);
    });
    return selectedConcepts;
  }

  private handleQuantityFilter(
    foundAttributeFilter: AttributeFilter | ValueFilter,
    structuredQueryAttributeFilter
  ) {
    if (structuredQueryAttributeFilter.type === FilterTypes.QUANTITY_RANGE) {
      this.buildQuantityRangeInstance(structuredQueryAttributeFilter, foundAttributeFilter);
    }
    if (structuredQueryAttributeFilter.type === FilterTypes.QUANTITY_COMPARATOR) {
      this.buildQuantityComparatorInstance(structuredQueryAttributeFilter, foundAttributeFilter);
    }
  }

  private handleReferenceFilter(foundAttributeFilter, structuredQueryAttributeFilter, criterion) {
    const referenceCriterionHashes = this.createReferenceCriterionHashes(
      structuredQueryAttributeFilter.criteria
    );
    this.fetchAndApplyReferenceCriteria(
      referenceCriterionHashes,
      criterion,
      foundAttributeFilter,
      structuredQueryAttributeFilter
    );
  }

  private createReferenceCriterionHashes(criteria) {
    return criteria.map((structuredQueryReferenceCriterion) =>
      this.createSQHash(structuredQueryReferenceCriterion)
    );
  }

  private fetchAndApplyReferenceCriteria(
    referenceCriterionHashes,
    criterion,
    foundAttributeFilter,
    structuredQueryAttributeFilter
  ) {
    this.createCriterionService
      .createReferenceCriteriaFromHashes(referenceCriterionHashes, criterion.getId())
      .subscribe((referenceCriteria: ReferenceCriterion[]) => {
        foundAttributeFilter.getReference().setSelectedReferences(referenceCriteria);
        this.updateCriterionHashMap(referenceCriteria);
        this.processSubCriteria(structuredQueryAttributeFilter.criteria);
      });
  }

  private updateCriterionHashMap(referenceCriteria) {
    referenceCriteria?.forEach((referenceCriterion) => {
      this.criterionProvider.setCriterionByUID(referenceCriterion, referenceCriterion.getId());
      this.setCriterionHashMap(referenceCriterion);
    });
  }

  private processSubCriteria(subCriteria) {
    subCriteria.map((structuredQueryReferenceCriterion) =>
      this.setStructuredQueryCriterionFilter(structuredQueryReferenceCriterion)
    );
  }

  private buildQuantityRangeInstance(
    structuredQueryAttributeFilter: AttributeFilterData,
    feasibilityQueryQuantityRange: AttributeFilter | ValueFilter
  ) {
    const quantityRange = new QuantityRangeFilter(
      QuantityUnit.fromJson(structuredQueryAttributeFilter.unit),
      feasibilityQueryQuantityRange.getQuantity().getAllowedUnits(),
      structuredQueryAttributeFilter.precision,
      structuredQueryAttributeFilter.minValue,
      structuredQueryAttributeFilter.maxValue
    );
    quantityRange.setMinValue(structuredQueryAttributeFilter.minValue);
    quantityRange.setMaxValue(structuredQueryAttributeFilter.maxValue);
    feasibilityQueryQuantityRange.setQuantity(quantityRange);
  }

  private buildQuantityComparatorInstance(
    structuredQueryAttributeFilter: AttributeFilterData | ValueFilterData,
    feasibilityQueryAttributeFilter: AttributeFilter | ValueFilter
  ) {
    const quantityComparatorFilter = new QuantityComparatorFilter(
      QuantityUnit.fromJson(structuredQueryAttributeFilter.unit),
      feasibilityQueryAttributeFilter.getQuantity().getAllowedUnits(),
      structuredQueryAttributeFilter.precision,
      feasibilityQueryAttributeFilter
        .getQuantity()
        .mapComparatorToQuantityComparison(structuredQueryAttributeFilter.comparator),
      structuredQueryAttributeFilter.value
    );
    feasibilityQueryAttributeFilter.setQuantity(quantityComparatorFilter);
  }

  public createCriterionInstanceFromHashes(criterionHashes: string[]): Observable<void[]> {
    return this.createCriterionService
      .createCriteriaFromHashes(criterionHashes)
      .pipe(map((criterions) => criterions.map((criterion) => this.setCriterionHashMap(criterion))));
  }

  private setCriterionHashMap(criterion: AbstractCriterion) {
    this.hashMap.push({ hash: criterion.getCriterionHash(), abstractCriterion: criterion });
  }

  private createSQHash(structuredQueryCriterion: StructuredQueryCriterionData): string {
    const context = TerminologyCode.fromJson(structuredQueryCriterion.context);
    const termCode = TerminologyCode.fromJson(structuredQueryCriterion.termCodes[0]);
    return this.hashService.createCriterionHash(context, termCode);
  }

  private isConsent(termCode: TerminologyCode): boolean {
    return this.consentService.getBooleanFlags(termCode.getCode()) !== null;
  }

  public getConsent(structuredQuery: StructuredQueryData): any {
    let result = {};
    structuredQuery.inclusionCriteria.forEach((criterionArray: StructuredQueryCriterionData[]) => {
      criterionArray.forEach((structuredQueryCriterion: StructuredQueryCriterionData) => {
        const termCode = TerminologyCode.fromJson(structuredQueryCriterion.termCodes[0]);
        if (this.isConsent(termCode)) {
          result = structuredQueryCriterion;
        } else {
          result = null;
        }
      });
    });
    return result;
  }

  private findCriterionInMapByHash(hash: string): AbstractCriterion {
    return this.hashMap.find((value) => value.hash === hash)?.abstractCriterion;
  }

  private findCriterionInMapByHashAndRemove(hash: string): AbstractCriterion {
    const element = this.hashMap.find((value) => value.hash === hash)?.abstractCriterion;
    const index = this.hashMap.findIndex((value) => value.hash === hash);
    if (index > -1) {
      this.hashMap.splice(index, 1);
    }
    return element;
  }
}
