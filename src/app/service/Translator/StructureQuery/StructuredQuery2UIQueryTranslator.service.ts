import { AbstractCriterion } from '../../../model/FeasibilityQuery/Criterion/AbstractCriterion';
import { Injectable } from '@angular/core';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { ConsentService } from '../../Consent/Consent.service';
import { CreateCriterionService } from '../../Criterion/Builder/Create/CreateCriterionService';
import { HashService } from '../../Hash.service';
import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { map, Observable, Subscription } from 'rxjs';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { ReferenceCriterion } from '../../../model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { CriterionValidationService } from '../../Criterion/CriterionValidation.deprecated.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { TypeGuard } from '../../TypeGuard/TypeGuard';
import { ConceptData } from 'src/app/model/Interface/ConceptData';
import { ConceptTranslationCacheService } from '../ConceptTranslationCache.service';
import { TerminologyApiService } from '../../Backend/Api/TerminologyApi.service';
import { TerminologyCodeData } from 'src/app/model/Interface/TerminologyCodeData';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2UIQueryTranslatorService {
  private subscription: Subscription;
  private hashMap: Array<{
    hash: string
    abstractCriterion: AbstractCriterion
  }> = [];

  private emptyDisplayData = {
    original: 'test',
    translations: [
      {
        language: 'de-DE',
        value: undefined,
      },
      {
        language: 'en-US',
        value: undefined,
      },
    ],
  };

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

  public translateInExclusion(inexclusion: any[]): Observable<string[][]> {
    const hashes = [];
    this.hashMap = [];

    inexclusion.forEach((criterionArray) => {
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
            const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);

            if (!this.isConsent(termCode)) {
              this.setStructuredQueryCriterionFilter(structuredQueryCriterion);
              const hash = this.createSQHash(structuredQueryCriterion);
              const criterion = this.findCriterionInMapByHash(hash);
              idArray[index][innerIndex] = criterion.getId();
            } else {
              const flags = this.consentService.getBooleanFlags(termCode.getCode());
              this.consentService.setProvisionCode(
                flags.distributedAnalysis,
                flags.euGdpr,
                flags.insuranceData,
                flags.contact
              );
              this.consentService.setConsent(true);
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

  public innerCriterion(structuredQueryCriterionInnerArray: any[]): string[] {
    return structuredQueryCriterionInnerArray.map((structuredQueryCriterion) => {
      const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
      if (!this.isConsent(termCode)) {
        return this.createSQHash(structuredQueryCriterion);
      }
    });
  }

  public setStructuredQueryCriterionFilter(structuredQueryCriterion) {
    const structuredQueryCriterionHash = this.createSQHash(structuredQueryCriterion);
    const criterion = this.findCriterionInMapByHash(structuredQueryCriterionHash);
    this.applyTimeRestrictionIfPresent(structuredQueryCriterion, criterion);
    this.processAttributeFilters(structuredQueryCriterion.attributeFilters, criterion);
    this.processValueFilter(structuredQueryCriterion.valueFilter, criterion);
  }

  private applyTimeRestrictionIfPresent(structuredQueryCriterion, criterion) {
    if (structuredQueryCriterion.timeRestriction) {
      criterion.setTimeRestriction(
        this.uITimeRestrictionFactoryService.createTimeRestrictionForFeasibilityQuery(
          structuredQueryCriterion.timeRestriction
        )
      );
    }
  }

  private processAttributeFilters(attributeFilters, criterion: Criterion) {
    if (TypeGuard.isArray(attributeFilters)) {
      attributeFilters?.forEach((structuredQueryAttributeFilter) => {
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

  private findMatchingAttributeFilter(criterion: Criterion, structuredQueryAttributeFilter) {
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

  private processValueFilter(structuredQueryValueFilter, criterion) {
    if (TypeGuard.isValueFilterData(structuredQueryValueFilter)) {
      this.handleFilterByType(criterion.getValueFilters()[0], structuredQueryValueFilter, criterion);
    } else {
      return null;
    }
  }

  private handleFilterByType(
    foundAttributeFilter: AttributeFilter,
    structuredQueryAttributeFilter,
    criterion
  ) {
    const type = foundAttributeFilter?.getFilterType();

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
    foundAttributeFilter: AttributeFilter,
    structuredQueryAttributeFilter
  ) {
    this.subscription?.unsubscribe();
    const notFoundConcept: string[] = [];
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

  private handleQuantityFilter(foundAttributeFilter, structuredQueryAttributeFilter) {
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
    structuredQueryAttributeFilter,
    feasibilityQueryQuantityRange: AttributeFilter
  ) {
    const quantityRange = new QuantityRangeFilter(
      new QuantityUnit(
        structuredQueryAttributeFilter.unit.code,
        structuredQueryAttributeFilter.unit.display
      ),
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
    structuredQueryAttributeFilter,
    feasibilityQueryAttributeFilter: AttributeFilter
  ) {
    const quantityComparatorFilter = new QuantityComparatorFilter(
      new QuantityUnit(
        structuredQueryAttributeFilter.unit.code,
        structuredQueryAttributeFilter.unit.display
      ),
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

  private createSQHash(structuredQueryCriterion) {
    const context = this.createTermCode(structuredQueryCriterion.context);
    const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
    return this.hashService.createCriterionHash(context, termCode);
  }

  private isConsent(termCode: TerminologyCode): boolean {
    return this.consentService.getBooleanFlags(termCode.getCode()) !== null;
  }

  public createTermCode(termCode: any) {
    return new TerminologyCode(termCode.code, termCode.display, termCode.system, termCode.version);
  }

  public getConsent(structuredQuery: any): any {
    let result = {};
    structuredQuery.inclusionCriteria.forEach((criterionArray) => {
      criterionArray.forEach((structuredQueryCriterion) => {
        const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
        if (this.isConsent(termCode)) {
          result = structuredQueryCriterion;
        } else {
          result = null;
        }
      });
    });
    return result;
  }

  /**
   *
   * @param data @todo need to outsource this to a service
   * @returns
   */
  public instantiateDisplayData(display: string) {
    return new Display(
      this.emptyDisplayData.translations?.map(
        (translation) => new Translation(translation.language, translation.value)
      ),
      display ?? 'test'
    );
  }

  public checkValuesForTypeString(value: string | string[]): string[] {
    if (typeof value == 'string') {
      if (value.length > 0) {
        return [value];
      } else {
        return [];
      }
    } else {
      return value;
    }
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
