import { AbstractCriterion } from '../../../model/FeasibilityQuery/Criterion/AbstractCriterion';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { AfterFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AfterFilter';
import { AtFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AtFilter';
import { Attribute, Injectable } from '@angular/core';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BeforeFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BeforeFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { ConsentTermCode } from 'src/app/model/Utilities/ConsentTermCode';
import { CreateReferenceCriterionService } from '../../Criterion/Builder/Create/CreateReferenceCriterion.service';
import { CriterionHashService } from '../../Criterion/CriterionHash.service';
import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { FeasibilityQueryProviderService } from '../../Provider/FeasibilityQueryProvider.service';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { map, Observable } from 'rxjs';
import { NewCreateCriterionService } from '../../Criterion/Builder/Create/NewCreateCriterion.service';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { ReferenceCriterion } from '../../../model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { ConsentService } from '../../Consent/Consent.service';

@Injectable({
  providedIn: 'root',
})
export class NewStructuredQuery2UIQueryTranslatorService {
  private hashMap: Map<string, AbstractCriterion> = new Map();

  constructor(
    private createCriterionService: NewCreateCriterionService,
    private criterionHashService: CriterionHashService,
    private createReferenceCriterionService: CreateReferenceCriterionService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService,
    private consentService: ConsentService,
    private criterionProvider: CriterionProviderService
  ) {}


  public testFunction(inexclusion: any[]): Observable<string[][]> {
    const hashes = [];

    inexclusion.forEach((criterionArray) => {
      hashes.push(...this.innerCriterion(criterionArray));
    });

    return this.createCriterionInstanceFromHashes(hashes).pipe(
      map(() => {
      const idArray: string[][] = [];
      inexclusion.forEach((criterionArray, index) => {
        if (!idArray[index]) {
          idArray[index] = [];
        }
        criterionArray?.forEach((structuredQueryCriterion, innerIndex) => {
          const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);

          if (this.consentService.getBooleanFlags(termCode.getCode()) === null) {
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
        this.criterionProvider.setCriterionByUID(criterion, criterion.getId())
      })
        return idArray
    }));

  }

  public innerCriterion(structuredQueryCriterionInnerArray: any[]) {
    return structuredQueryCriterionInnerArray.map((structuredQueryCriterion) => {
      const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
      if (this.isNotConsent([termCode])) {
        return this.createSQHash(structuredQueryCriterion);
      }
    });
  }

  public setStructuredQueryCriterionFilter(structuredQueryCriterion) {
    const structuredQueryCriterionHash = this.createSQHash(structuredQueryCriterion);
    const criterion = this.hashMap.get(structuredQueryCriterionHash);

    this.applyTimeRestrictionIfPresent(structuredQueryCriterion, criterion);
    this.processAttributeFilters(structuredQueryCriterion.attributeFilters, criterion);
  }

  private applyTimeRestrictionIfPresent(structuredQueryCriterion, criterion) {
    if (structuredQueryCriterion.timeRestriction) {
      criterion.setTimeRestriction(
        this.addTimeRestriction(structuredQueryCriterion.timeRestriction)
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

  private handleFilterByType(foundAttributeFilter, structuredQueryAttributeFilter, criterion) {
    const type = foundAttributeFilter.getFilterType();

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
    const selectedConcepts: TerminologyCode[] = structuredQueryAttributeFilter.selectedConcepts.map((concept) => new TerminologyCode(concept.code, concept.display, concept.system));
    foundAttributeFilter
      .getConcept()
      .setSelectedConcepts(selectedConcepts);
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
    const quantityRange = feasibilityQueryQuantityRange.getQuantity() as QuantityRangeFilter;
    quantityRange.setSelectedUnit(structuredQueryAttributeFilter.unit);
    quantityRange.setMinValue(structuredQueryAttributeFilter.minValue);
    quantityRange.setMaxValue(structuredQueryAttributeFilter.maxValue);
  }

  private buildQuantityComparatorInstance(
    structuredQueryAttributeFilter,
    feasibilityQueryAttributeFilter: AttributeFilter
  ) {
    const quantityRange = feasibilityQueryAttributeFilter.getQuantity() as QuantityRangeFilter;
    quantityRange.setSelectedUnit(structuredQueryAttributeFilter.unit);
    quantityRange.setMinValue(structuredQueryAttributeFilter.minValue);
    quantityRange.setMaxValue(structuredQueryAttributeFilter.maxValue);
  }

  private addTimeRestriction(timeRestriction: any): AbstractTimeRestriction {
    if (timeRestriction.beforeDate && timeRestriction.afterDate) {
      if (timeRestriction.beforeDate === timeRestriction.afterDate) {
        return new AtFilter(timeRestriction.afterDate, timeRestriction.beforeDate);
      } else {
        return new BetweenFilter(timeRestriction.afterDate, timeRestriction.beforeDate);
      }
    }
    if (timeRestriction.beforeDate && !timeRestriction.afterDate) {
      return new BeforeFilter(timeRestriction.beforeDate);
    }
    if (!timeRestriction.beforeDate && timeRestriction.afterDate) {
      return new AfterFilter(timeRestriction.afterDate);
    }
  }

  public createCriterionInstanceFromHashes(criterionHashes: string[]):Observable<void[]> {
    return this.createCriterionService.createCriteriaFromHashes(criterionHashes).pipe(
      map((criterions) => criterions.map((criterion) => this.setCriterionHashMap(criterion)))
    );
  }

  private setCriterionHashMap(criterion: AbstractCriterion) {
    this.hashMap.set(criterion.getCriterionHash(), criterion);
  }

  private createSQHash(structuredQueryCriterion) {
    const context = this.createTermCode(structuredQueryCriterion.context);
    const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
    return this.criterionHashService.createHash(context, termCode);
  }

  private isNotConsent(termCodes: TerminologyCode[]) {
    const consentCode = ConsentTermCode.getConsentTermCode().getCode();
    const consentSystem = ConsentTermCode.getConsentTermCode().getSystem();
    return !(termCodes[0].getCode() === consentCode && termCodes[0].getSystem() === consentSystem);
  }

  public createTermCode(termCode: any) {
    return new TerminologyCode(termCode.code, termCode.display, termCode.system, termCode.version);
  }


  test2 = {
    "version": "http://to_be_decided.com/draft-1/schema#",
    "display": "",
    "inclusionCriteria": [
      [
        {
          "termCodes": [
            {
              "code": "119373006",
              "system": "http://snomed.info/sct",
              "version": "http://snomed.info/sct/900000000000207008/version/20220930",
              "display": "Amniotic fluid specimen"
            }
          ],
          "attributeFilters": [
            {
              "type": "reference",
              "criteria": [
                {
                  "termCodes": [
                    {
                      "code": "Q50.2",
                      "system": "http://fhir.de/CodeSystem/bfarm/icd-10-gm",
                      "version": "2023",
                      "display": "Angeborene Torsion des Ovars"
                    }
                  ],
                  "context": {
                    "code": "Diagnose",
                    "system": "fdpg.mii.cds",
                    "version": "1.0.0",
                    "display": "Diagnose"
                  },
                  "timeRestriction": {
                    "afterDate": "2024-12-11"
                  }
                }
              ],
              "attributeCode": {
                "code": "festgestellteDiagnose",
                "display": "Festgestellte Diagnose",
                "system": "http://hl7.org/fhir/StructureDefinition"
              }
            },
            {
              "selectedConcepts": [
                {
                  "code": "C76.2",
                  "display": "Abdomen o.n.A.",
                  "system": "http://hl7.org/fhir/sid/icd-o-3"
                },
                {
                  "code": "C24.1",
                  "display": "Ampulla Vateri",
                  "system": "http://hl7.org/fhir/sid/icd-o-3"
                }
              ],
              "type": "concept",
              "attributeCode": {
                "code": "icd-o-3",
                "display": "icd-o-3",
                "system": "http://hl7.org/fhir/StructureDefinition"
              }
            }
          ],
          "context": {
            "code": "Specimen",
            "system": "fdpg.mii.cds",
            "version": "1.0.0",
            "display": "Bioprobe"
          },
          "timeRestriction": {
            "beforeDate": "2023-12-10"
          }
        }
      ],
      [
        {
          "termCodes": [
            {
              "code": "119373006",
              "system": "http://snomed.info/sct",
              "version": "http://snomed.info/sct/900000000000207008/version/20220930",
              "display": "Amniotic fluid specimen"
            }
          ],
          "attributeFilters": [
            {
              "type": "reference",
              "criteria": [
                {
                  "termCodes": [
                    {
                      "code": "Q50.2",
                      "system": "http://fhir.de/CodeSystem/bfarm/icd-10-gm",
                      "version": "2023",
                      "display": "Angeborene Torsion des Ovars"
                    }
                  ],
                  "context": {
                    "code": "Diagnose",
                    "system": "fdpg.mii.cds",
                    "version": "1.0.0",
                    "display": "Diagnose"
                  },
                  "timeRestriction": {
                    "afterDate": "2024-12-11"
                  }
                }
              ],
              "attributeCode": {
                "code": "festgestellteDiagnose",
                "display": "Festgestellte Diagnose",
                "system": "http://hl7.org/fhir/StructureDefinition"
              }
            },
            {
              "selectedConcepts": [
                {
                  "code": "C76.2",
                  "display": "Abdomen o.n.A.",
                  "system": "http://hl7.org/fhir/sid/icd-o-3"
                },
                {
                  "code": "C24.1",
                  "display": "Ampulla Vateri",
                  "system": "http://hl7.org/fhir/sid/icd-o-3"
                }
              ],
              "type": "concept",
              "attributeCode": {
                "code": "icd-o-3",
                "display": "icd-o-3",
                "system": "http://hl7.org/fhir/StructureDefinition"
              }
            }
          ],
          "context": {
            "code": "Specimen",
            "system": "fdpg.mii.cds",
            "version": "1.0.0",
            "display": "Bioprobe"
          },
          "timeRestriction": {
            "beforeDate": "2023-12-10"
          }
        }
      ]
    ]
  }
}
