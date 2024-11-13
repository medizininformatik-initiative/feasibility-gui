import { AbstractCriterion } from '../../../model/FeasibilityQuery/Criterion/AbstractCriterion';
import { Attribute, Injectable } from '@angular/core';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { ConsentService } from '../../Consent/Consent.service';
import { ConsentTermCode } from 'src/app/model/Utilities/ConsentTermCode';
import { CreateReferenceCriterionService } from '../../Criterion/Builder/Create/CreateReferenceCriterion.service';
import { CriterionHashService } from '../../Criterion/CriterionHash.service';
import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { map, Observable } from 'rxjs';
import { NewCreateCriterionService } from '../../Criterion/Builder/Create/NewCreateCriterion.service';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { ReferenceCriterion } from '../../../model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2UIQueryTranslatorService {
  private hashMap: Map<string, AbstractCriterion> = new Map();

  constructor(
    private createCriterionService: NewCreateCriterionService,
    private criterionHashService: CriterionHashService,
    private createReferenceCriterionService: CreateReferenceCriterionService,
    private consentService: ConsentService,
    private criterionProvider: CriterionProviderService,
    private uITimeRestrictionFactoryService: UITimeRestrictionFactoryService
  ) {}

  public translateInExclusion(inexclusion: any[]): Observable<string[][]> {
    const hashes = [];

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
              const structuredQueryCriterionHash = this.createSQHash(structuredQueryCriterion);
              const criterion = this.hashMap.get(structuredQueryCriterionHash);
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

        this.hashMap.forEach((criterion) => {
          this.criterionProvider.setCriterionByUID(criterion, criterion.getId());
        });
        idArray = idArray.filter((id) => id.length > 0);
        return idArray;
      })
    );
  }

  public innerCriterion(structuredQueryCriterionInnerArray: any[]) {
    return structuredQueryCriterionInnerArray.map((structuredQueryCriterion) => {
      const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
      if (!this.isConsent(termCode)) {
        return this.createSQHash(structuredQueryCriterion);
      }
    });
  }

  public setStructuredQueryCriterionFilter(structuredQueryCriterion) {
    const structuredQueryCriterionHash = this.createSQHash(structuredQueryCriterion);
    const criterion = this.hashMap.get(structuredQueryCriterionHash);

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

  private processAttributeFilters(attributeFilters, criterion) {
    attributeFilters?.forEach((structuredQueryAttributeFilter) => {
      const foundAttributeFilter = this.findMatchingAttributeFilter(
        criterion,
        structuredQueryAttributeFilter
      );
      this.handleFilterByType(foundAttributeFilter, structuredQueryAttributeFilter, criterion);
    });
  }

  private findMatchingAttributeFilter(criterion, structuredQueryAttributeFilter) {
    return criterion
      .getAttributeFilters()
      .find(
        (attributeFilter) =>
          attributeFilter.getAttributeCode().getCode() ===
            structuredQueryAttributeFilter.attributeCode.code &&
          attributeFilter.getAttributeCode().getSystem() ===
            structuredQueryAttributeFilter.attributeCode.system
      );
  }

  private processValueFilter(StructuredQueryValueFilter, criterion) {
    this.handleFilterByType(criterion.getValueFilters()[0], StructuredQueryValueFilter, criterion);
  }

  private handleFilterByType(foundAttributeFilter, structuredQueryAttributeFilter, criterion) {
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

  private handleConceptFilter(foundAttributeFilter, structuredQueryAttributeFilter) {
    const selectedConcepts: TerminologyCode[] = structuredQueryAttributeFilter.selectedConcepts.map(
      (concept) => new TerminologyCode(concept.code, concept.display, concept.system)
    );
    foundAttributeFilter.getConcept().setSelectedConcepts(selectedConcepts);
  }

  private handleQuantityFilter(foundAttributeFilter, structuredQueryAttributeFilter) {
    if (structuredQueryAttributeFilter.type === FilterTypes.QUANTITY_RANGE) {
      this.buildQuantityRangeInstance(structuredQueryAttributeFilter, foundAttributeFilter);
    } else if (structuredQueryAttributeFilter.type === FilterTypes.QUANTITY_COMPARATOR) {
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
    this.createReferenceCriterionService
      .fetchReferenceCriterions(referenceCriterionHashes, criterion.getId())
      .subscribe((referenceCriteria: ReferenceCriterion[]) => {
        foundAttributeFilter.getReference().setSelectedReferences(referenceCriteria);
        this.updateCriterionHashMap(referenceCriteria);
        this.processSubCriteria(structuredQueryAttributeFilter.criteria);
      });
  }

  private updateCriterionHashMap(referenceCriteria) {
    referenceCriteria?.forEach((referenceCriterion) => {
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
    const quantityRangeFilter = new QuantityComparatorFilter(
      new QuantityUnit(
        structuredQueryAttributeFilter.unit.code,
        structuredQueryAttributeFilter.unit.display
      ),
      feasibilityQueryAttributeFilter.getQuantity().getAllowedUnits(),
      feasibilityQueryAttributeFilter.getQuantity().getPrecision(),
      QuantityComparisonOption.EQUAL, //structuredQueryAttributeFilter.comparator,
      structuredQueryAttributeFilter.value
    );
    feasibilityQueryAttributeFilter.setQuantity(quantityRangeFilter);
  }

  public createCriterionInstanceFromHashes(criterionHashes: string[]): Observable<void[]> {
    return this.createCriterionService
      .createCriteriaFromHashes(criterionHashes)
      .pipe(map((criterions) => criterions.map((criterion) => this.setCriterionHashMap(criterion))));
  }

  private setCriterionHashMap(criterion: AbstractCriterion) {
    this.hashMap.set(criterion.getCriterionHash(), criterion);
  }

  private createSQHash(structuredQueryCriterion) {
    const context = this.createTermCode(structuredQueryCriterion.context);
    const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
    return this.criterionHashService.createHash(context, termCode);
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
}
