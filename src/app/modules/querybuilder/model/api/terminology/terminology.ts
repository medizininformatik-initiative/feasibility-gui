import { transient } from '../annotations';
import { AttributeDefinition, ValueDefinition } from './valuedefinition';

// 1.) Example of terminology tree
//
// "Demographie" (undefined)     ----  "Alter" (QUANTITY)
//  selectable=false             |      selectable=true
//                                \     precision = 0, minQuantity = 0, maxQuantity = null, quantityAllowedUnits = [{'year', 'Jahr'}]
//                                 \
//                                  \-  "Geschlecht" (CONCEPT)
//                                       selectable=true
//                                       values = [
//                                                 { display = 'weiblich', code = 'female' },
//                                                 { display = 'männlich', code = 'male' }
//                                                ]
//
// 2.) Example of a terminology tree with selectable inner nodes
//
// "Diagnose" (undefined)  ----  "ICD-10" (undefined)  ---- "F00-F09" (undefined)  ---- "F09" (undefined)
//  selectable=false              selectable=false           selectable=false            selectable=true
//                                                                                             \
//                                                                                              \-- "F01" (undefined)  ---- "F01.0" (undefined)
//                                                                                                   selectable=true   \     selectable=true
//                                                                                                   . . .              \-- "F01.1" (NoValue)
//                                                                                                                           selectable=true
//                                                                                                                        . . .
//
// 3.) Example of a terminology tree with valueDefinition = CONCEPT
//     https://simplifier.net/forschungsnetzcovid-19/cardiovasculardiseases
//
// "Diagnose" (undefined)  ----  "Cardiovascular Diseases" (undefined)  ----  "84114007" (CONCEPT)
//  selectable=false              selectable=false                      |      selectable=true
//                                                                      |      system = http://snomed.info/sct
//                                                                      |      code = 84114007
//                                                                      |      display = 'Herzinsuffizienz'
//                                                                      |      values = [
//                                                                      |                 { display = 'Medicine A', system = '', code = 'medA' },
//                                                                      |                 { display = 'Medicine B', system = '', code = 'medB' }
//                                                                      |                  . . .
//                                                                      |               ]
//                                                                      |
//                                                                      |---  "I25.29" (CONCEPT)
//                                                                      |      system = http://fhir.de/CodeSystem/dimdi/icd-10-gm
//                                                                      |      code = I25.29
//                                                                      |      display = 'Alter Myokardinfarkt Nicht näher bezeichnet'
//                                                                      |      . . .

export class TerminologyEntry {
  id: string;
  termCode?: TerminologyCode;
  context?: TerminologyCode;
  termCodes?: Array<TerminologyCode> = [];
  display: string;

  selectable: boolean;
  @transient()
  selected = false;

  timeRestrictionAllowed: boolean;

  leaf: boolean;
  entity: boolean;
  children: TerminologyEntry[] = [];
  optional?: boolean;

  valueDefinition?: ValueDefinition;
  valueDefinitions?: Array<ValueDefinition> = [];
  attributeDefinitions?: Array<AttributeDefinition> = [];
}

export class TerminologyCode {
  code: string;
  display: string;
  system: string;
  version?: string;
  uid?: string;
}

export class CategoryEntry {
  catId: string;
  display: string;
  shortDisplay = '';
}
