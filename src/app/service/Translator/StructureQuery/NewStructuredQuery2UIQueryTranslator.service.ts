import { ConsentTermCode } from 'src/app/model/Utilities/ConsentTermCode';
import { CriterionHashService } from '../../Criterion/CriterionHash.service';
import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { FilterTypesService } from '../../FilterTypes.service';
import { Attribute, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NewCreateCriterionService } from '../../Criterion/Builder/Create/NewCreateCriterion.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { CreateReferenceCriterionService } from '../../Criterion/Builder/Create/CreateReferenceCriterion.service';
import {AbstractCriterion} from "../../../model/FeasibilityQuery/Criterion/AbstractCriterion";
import {ReferenceCriterion} from "../../../model/FeasibilityQuery/Criterion/ReferenceCriterion";

@Injectable({
  providedIn: 'root',
})
export class NewStructuredQuery2UIQueryTranslatorService {
  private hashMap: Map<string, AbstractCriterion> = new Map();

  constructor(
    private filter: FilterTypesService,
    private createCriterionService: NewCreateCriterionService,
    private criterionHashService: CriterionHashService,
    private criterionProvider: CriterionProviderService,
    private createReferenceCriterionService: CreateReferenceCriterionService
  ) {}

  //   private translateSQtoUICriteria(
  //     inexclusion: AnnotatedStructuredQueryCriterion[][]
  //   ): Observable<Criterion[][]> {

  //     inexclusion.forEach((structuredQueryCriterionArray) => {
  //       const criterionArray: Criterion[] = [];
  //       this.innerCriterion(structuredQueryCriterionArray);
  //     });
  // }

  public start() {
    this.testFunction(this.test2.inclusionCriteria);
  }

  public testFunction(inexclusion: any[]) {
    const hashes = [];
    inexclusion.forEach((criterionArray) => {
      hashes.push(...this.innerCriterion(criterionArray));
    });
    this.createCriterionInstanceFromHashes(hashes).subscribe(() => {
      this.test2.inclusionCriteria.forEach((criterionArray) => {
        criterionArray?.forEach((structuredQueryCriterion) => {
          this.setStructuredQueryCriterionFilter(structuredQueryCriterion);
        });
      });
    });


  }

  public setStructuredQueryCriterionFilter(structuredQueryCriterion) {
    const structuredQueryCriterionHash = this.createSQHash(structuredQueryCriterion);
    console.log(structuredQueryCriterionHash)
    const criterion = this.hashMap.get(structuredQueryCriterionHash);
    console.log(this.hashMap)
    console.log(criterion)
    structuredQueryCriterion.attributeFilters?.forEach((structuredQueryAttributeFilter) => {
      const foundAttributeFilter = criterion
        .getAttributeFilters()
        .find(
          (attributeFilter) =>
            attributeFilter.getAttributeCode().getCode() ===
              structuredQueryAttributeFilter.attributeCode.code &&
            attributeFilter.getAttributeCode().getSystem() ===
              structuredQueryAttributeFilter.attributeCode.system
        );
      const type = foundAttributeFilter.getFilterType();
      console.log(type)
      switch (type) {
        case FilterTypes.CONCEPT:
          foundAttributeFilter
            .getConcept()
            .setSelectedConcepts(structuredQueryAttributeFilter.selectedConcepts);
          console.log(foundAttributeFilter)
          break;
        case FilterTypes.QUANTITY:
          if (structuredQueryAttributeFilter.type === FilterTypes.QUANTITY_RANGE) {
            const quantityRange = foundAttributeFilter.getQuantity() as QuantityRangeFilter;
            quantityRange.setSelectedUnit(structuredQueryAttributeFilter.unit);
            quantityRange.setMinValue(structuredQueryAttributeFilter.minValue);
            quantityRange.setMaxValue(structuredQueryAttributeFilter.maxValue);
          }
          if (structuredQueryAttributeFilter.type === FilterTypes.QUANTITY_COMPARATOR) {
            const quantityRange = foundAttributeFilter.getQuantity() as QuantityComparatorFilter;
            quantityRange.setSelectedUnit(structuredQueryAttributeFilter.unit);
            quantityRange.setValue(structuredQueryAttributeFilter.value);
          }
          break;
        case FilterTypes.REFERENCE:
          const referenceCriterionHashes = structuredQueryAttributeFilter.criteria.map(
            (structuredQueryReferenceCriterion) =>
              this.createSQHash(structuredQueryReferenceCriterion)
          );
          console.log(referenceCriterionHashes)
          this.createReferenceCriterionService
            .fetchReferenceCriterions(referenceCriterionHashes, criterion.getId())
            .subscribe((referenceCriteria: ReferenceCriterion[]) => {
            //.pipe(
            //  map((referenceCriteria) => {
                console.log(referenceCriteria)
                foundAttributeFilter.getReference().setSelectedReferences(referenceCriteria);
                referenceCriteria?.forEach((referenceCriterion) => {
                  this.setCriterionHashMap(referenceCriterion);
                  /*const foundStructuredQueryReferenceCriterion =
                    structuredQueryAttributeFilter.criteria.find(
                      (structuredQueryReferenceCriterion) =>
                        this.createSQHash(structuredQueryReferenceCriterion) ===
                        referenceCriterion.getCriterionHash()
                    );
                  this.setStructuredQueryCriterionFilter(foundStructuredQueryReferenceCriterion);*/
                });
                structuredQueryAttributeFilter.criteria.map(
                  (structuredQueryReferenceCriterion) => this.setStructuredQueryCriterionFilter(structuredQueryReferenceCriterion)
                )
              }

            );
      }
    });
  }

  public createCriterionInstanceFromHashes(criterionHashes: string[]) {
    return this.createCriterionService
      .createCriteriaFromHashes(criterionHashes)
      .pipe(
        map((criterions) => {
          console.log(criterions);
          return criterions.map((criterion) => this.setCriterionHashMap(criterion));
        })
      )
  }

  private setCriterionHashMap(criterion: AbstractCriterion) {
    this.hashMap.set(criterion.getCriterionHash(), criterion);
  }

  private createSQHash(structuredQueryCriterion) {
    const context = this.createTermCode(structuredQueryCriterion.context);
    const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
    return this.criterionHashService.createHash(context, termCode);
  }

  public innerCriterion(structuredQueryCriterionInnerArray: any[]) {
    return structuredQueryCriterionInnerArray.map((structuredQueryCriterion) => {
      const termCode = this.createTermCode(structuredQueryCriterion.termCodes[0]);
      if (this.isNotConsent([termCode])) {
        return this.createSQHash(structuredQueryCriterion);
      }
    });
  }

  private isNotConsent(termCodes: TerminologyCode[]) {
    const consentCode = ConsentTermCode.getConsentTermCode().getCode();
    const consentSystem = ConsentTermCode.getConsentTermCode().getSystem();
    return !(termCodes[0].getCode() === consentCode && termCodes[0].getSystem() === consentSystem);
  }

  public createTermCode(termCode: any) {
    return new TerminologyCode(termCode.code, termCode.display, termCode.system, termCode.version);
  }

  test = {
    version: 'http://to_be_decided.com/draft-1/schema#',
    display: 'Ausgewählte Merkmale',
    inclusionCriteria: [
      [
        {
          termCodes: [
            {
              code: '408782002',
              display: 'Purulent amniotic fluid',
              system: 'http://snomed.info/sct',
              version: 'http://snomed.info/sct/900000000000207008/version/20230731',
            },
          ],
          context: {
            code: 'Diagnose',
            display: 'Diagnose',
            system: 'fdpg.mii.cds',
            version: '1.0.0',
          },
        },
      ],
      [
        {
          termCodes: [
            {
              code: '371380006',
              display: 'Amniotic fluid leaking',
              system: 'http://snomed.info/sct',
              version: 'http://snomed.info/sct/900000000000207008/version/20230731',
            },
          ],
          context: {
            code: 'Diagnose',
            display: 'Diagnose',
            system: 'fdpg.mii.cds',
            version: '1.0.0',
          },
        },
        {
          termCodes: [
            {
              code: '258563002',
              display: 'Amniotic cell specimen',
              system: 'http://snomed.info/sct',
              version: 'http://snomed.info/sct/900000000000207008/version/20240101',
            },
          ],
          context: {
            code: 'Specimen',
            display: 'Bioprobe',
            system: 'fdpg.mii.cds',
            version: '1.0.0',
          },
        },
      ],
    ],
  };

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