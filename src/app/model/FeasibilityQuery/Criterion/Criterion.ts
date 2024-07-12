import { AbstractCriterion } from './AbstractCriterion';
import { AbstractTimeRestriction } from './TimeRestriction/AbstractTimeRestriction';
import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { CritGroupPosition } from '../CritGroupPosition';
import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { ValueFilter } from './AttributeFilter/ValueFilter';
import { FilterTypes } from '../../FilterTypes';

/**
 * Class representing a specific criterion that extends the abstract criterion.
 */
export class Criterion extends AbstractCriterion {
  /**
   * Constructor for Criterion.
   *
   * @param attributeFilters - Array of AttributeFilter objects.
   * @param context - TerminologyCode object representing the context.
   * @param criterionHash - Hash string for the criterion.
   * @param display - Display string for the criterion.
   * @param isInvalid - Boolean flag indicating if the criterion is invalid.
   * @param position - CritGroupPosition object representing the position.
   * @param termCodes - Array of TerminologyCode objects.
   * @param timeRestriction - AbstractTimeRestriction object.
   * @param uniqueID - Unique identifier for the criterion.
   * @param valueFilters - Array of ValueFilter objects.
   */
  constructor(
    hasReference: boolean,
    attributeFilters?: Array<AttributeFilter>,
    context?: TerminologyCode,
    criterionHash?: string,
    display?: string,
    isInvalid?: boolean,
    position?: CritGroupPosition,
    termCodes?: Array<TerminologyCode>,
    timeRestriction?: AbstractTimeRestriction,
    uniqueID?: string,
    valueFilters?: Array<ValueFilter>
  ) {
    super(
      hasReference,
      attributeFilters,
      context,
      criterionHash,
      display,
      isInvalid,
      position,
      termCodes,
      timeRestriction,
      uniqueID,
      valueFilters
    );
  }
}
/*
var arr = [55, 44, 65];
var set = new Set(arr);

const array = [
                      {
                          "code": "concept1",
                          "system": "http://hl7.org/fhir/StructureDefinition",
                          "display": "Testattribut1"
                      },
                      {
                          "code": "concept2",
                          "system": "http://hl7.org/fhir/StructureDefinition",
                          "display": "Testattribut1"
                      },
                      {
                          "code": "concept3",
                          "system": "http://hl7.org/fhir/StructureDefinition",
                          "display": "Testattribut1"
                      }
                  ]

const terminologyCodes = array.map(item => new TerminologyCode(item.code, item.display, item.system));


// Object with attributeCode
const attributeCode = {
  "code": "Testattribut2",
  "system": "http://hl7.org/fhir/StructureDefinition",
  "display": "Testattribut2"
};

// Create an instance of TerminologyCode using attributeCode
const newTerminologyCodeInstance = new TerminologyCode(attributeCode.code, attributeCode.display, attributeCode.system);

var set = new Set(arr);
const test: Criterion =
{
      "attributeFilters": [
          {
              "optional": false,
              "display": "Testkriterion",
              "concept": {
                  "allowedConceptUri": ["http://hl7.org/fhir/sid/icd-o-3"],
                  "selectedConcepts": new Set(terminologyCodes),
                  "type": FilterTypes.CONCEPT
              },
              "filter": FilterTypes.CONCEPT,
              "attributeCode": newTerminologyCodeInstance
          },
          {
              "optional": true,
              "display": "Testkriterion",
              "concept": {
                  "allowedConceptUri": ["http://hl7.org/fhir/sid/icd-o-3"],
                  "type": FilterTypes.CONCEPT
              },
              "filter": FilterTypes.CONCEPT,
              "attributeCode": newTerminologyCodeInstance
          },
          {
              "optional": true,
              "display": "Testkriterion",
              "reference": {
                  "allowedReferenceUri": ["http://hl7.org/fhir/sid/icd-o-3"],
                  "type": "reference",
                  "selectedReferences": [
                      {
                          "isInvalid": false,
                          "termCodes": [
                              {
                                  "code": "55555",
                                  "display": "Testkriterion",
                                  "system": "http://fhir.de/CodeSystem/bfarm/icd-10-gm",
                                  "version": "2024"
                              }
                          ],
                          "attributeFilters": [],
                          "valueFilters": [
                              {
                                  "optional": true,
                                  "display": "Testkriterion",
                                  "concept": {
                                      "allowedConceptUri": "http://hl7.org/fhir/sid/icd-o-3",
                                      "selectedConcepts": [
                                          {
                                              "code": "conceptValue1",
                                              "system": "http://hl7.org/fhir/StructureDefinition",
                                              "display": "Testattribut1"
                                          },
                                          {
                                              "code": "conceptValue2",
                                              "system": "http://hl7.org/fhir/StructureDefinition",
                                              "display": "Testattribut1"
                                          },
                                          {
                                              "code": "conceptValue3",
                                              "system": "http://hl7.org/fhir/StructureDefinition",
                                              "display": "Testattribut1"
                                          }
                                      ],
                                      "type": "concept"
                                  },
                                  "filter": "concept"
                              }
                          ],
                          "hasReference": false,
                          "context": {
                              "code": "KontextCode",
                              "display": "KontextDisplay",
                              "system": "fdpg.mii.cds",
                              "version": "1.0.0"
                          },
                          "criterionHash": "6d927cc5-fb78-3c03-b7e4-c016e97467e2",
                          "display": "Testkriterion",
                          "timeRestriction": {
                              "beforeDate": "2024-07-30T22:00:00:000Z",
                              "afterDate": "2024-09-30T22:00:00:000Z",
                              "type": "BETWEEN"
                          },
                          "uniqueID": "1aaaaaaa-f79e-444f-b7c4-26b603c4acd0"
                      }
                  ]
              },
              "filter": "reference",
              "attributeCode": {
                  "code": "Testattribut5",
                  "system": "http://hl7.org/fhir/StructureDefinition",
                  "display": "Testattribut2"
              }

          },
          {
              "optional": true,
              "display": "Testkriterion",
              "quantity": {
                  "minValue": 7,
                  "maxValue":99,
                  "allowedUnits": [
                      {
                          "code": "a",
                          "display": "a",
                          "system": "http://unitsofmeasure.org"
                      },
                      {
                          "code": "mo",
                          "display": "mo",
                          "system": "http://unitsofmeasure.org"
                      },
                      {
                          "code": "wk",
                          "display": "wk",
                          "system": "http://unitsofmeasure.org"
                      },
                      {
                          "code": "d",
                          "display": "d",
                          "system": "http://unitsofmeasure.org"
                      }
                  ],
                  "selectedUnit":
                      {
                          "code": "d",
                          "display": "d",
                          "system": "http://unitsofmeasure.org"
                      },


                  "precision": 1,
                  "comparator":"bw",
                  "type": "quantity-range"
              },
              "filter": "quantity",
              "attributeCode": {
                  "code": "Testattribut3",
                  "system": "http://hl7.org/fhir/StructureDefinition",
                  "display": "Testattribut3"
              }
          },
          {
              "optional": true,
              "display": "Testkriterion",
              "quantity": {
                  "value": 6,
                  "allowedUnits": [
                      {
                          "code": "a",
                          "display": "a",
                          "system": "http://unitsofmeasure.org"
                      },
                      {
                          "code": "mo",
                          "display": "mo",
                          "system": "http://unitsofmeasure.org"
                      },
                      {
                          "code": "wk",
                          "display": "wk",
                          "system": "http://unitsofmeasure.org"
                      },
                      {
                          "code": "d",
                          "display": "d",
                          "system": "http://unitsofmeasure.org"
                      }
                  ],
                  "selectedUnit":
                      {
                          "code": "d",
                          "display": "d",
                          "system": "http://unitsofmeasure.org"
                      },


                  "precision": 1,
                  "comparator":"lt",
                  "type": "quantity-comparator"
              },
              "filter": "quantity",
              "attributeCode": {
                  "code": "Testattribut3",
                  "system": "http://hl7.org/fhir/StructureDefinition",
                  "display": "Testattribut3"
              }
          }
      ],
      "isInvalid": false,
      "termCodes": [
          {
              "code": "1234",
              "display": "Testkriterion",
              "system": "http://fhir.de/CodeSystem/bfarm/icd-10-gm",
              "version": "2024"
          }
      ],
      "valueFilters": [
          {
              "optional": true,
              "display": "Testkriterion",
              "concept": {
                  "allowedConceptUri": "http://hl7.org/fhir/sid/icd-o-3",
                  "selectedConcepts": [
                      {
                          "code": "conceptValue1",
                          "system": "http://hl7.org/fhir/StructureDefinition",
                          "display": "Testattribut1"
                      },
                      {
                          "code": "conceptValue2",
                          "system": "http://hl7.org/fhir/StructureDefinition",
                          "display": "Testattribut1"
                      },
                      {
                          "code": "conceptValue3",
                          "system": "http://hl7.org/fhir/StructureDefinition",
                          "display": "Testattribut1"
                      }
                  ],
                  "type": "concept"
              },
              "filter": "concept"
          }
      ],
      "hasReference": false,
      "context": {
          "code": "KontextCode",
          "display": "KontextDisplay",
          "system": "fdpg.mii.cds",
          "version": "1.0.0"
      },
      "criterionHash": "6d927cc5-fb78-3c03-b7e4-c016e97467e2",
      "display": "Testkriterion",
      "timeRestriction": {
          "beforeDate": "2024-07-30T22:00:00:000Z",
          "afterDate": "2024-09-30T22:00:00:000Z",
          "type": "BETWEEN"
      },
      "uniqueID": "09bf0ece-f79e-444f-b7c4-26b603c4acd0"
}

const test2 = test as Criterion
*/
