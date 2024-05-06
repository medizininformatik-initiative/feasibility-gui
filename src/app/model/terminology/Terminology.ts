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
export class TerminologyCode {
  private code: string;
  private display: string;
  private system: string;
  private version?: string;
  private uid?: string;

  constructor(code: string, display: string, system: string, version?: string, uid?: string) {
    this.code = code;
    this.display = display;
    this.system = system;
    this.version = version;
    this.uid = uid;
  }

  /**
   * Retrieves the code.
   *
   * @returns The code.
   */
  getCode(): string {
    return this.code;
  }

  /**
   * Sets the code.
   *
   * @param code The code to set.
   */
  setCode(code: string) {
    this.code = code;
  }

  /**
   * Retrieves the display.
   *
   * @returns The display.
   */
  getDisplay(): string {
    return this.display;
  }

  /**
   * Sets the display.
   *
   * @param display The display to set.
   */
  setDisplay(display: string) {
    this.display = display;
  }

  /**
   * Retrieves the system.
   *
   * @returns The system.
   */
  getSystem(): string {
    return this.system;
  }

  /**
   * Sets the system.
   *
   * @param system The system to set.
   */
  setSystem(system: string) {
    this.system = system;
  }

  /**
   * Retrieves the version.
   *
   * @returns The version.
   */
  getVersion(): string | undefined {
    return this.version;
  }

  /**
   * Sets the version.
   *
   * @param version The version to set.
   */
  setVersion(version: string | undefined) {
    this.version = version;
  }

  /**
   * Retrieves the UID.
   *
   * @returns The UID.
   */
  getUid(): string | undefined {
    return this.uid;
  }

  /**
   * Sets the UID.
   *
   * @param uid The UID to set.
   */
  setUid(uid: string | undefined) {
    this.uid = uid;
  }
}

export class CategoryEntry {
  catId: string;
  display: string;
  shortDisplay = '';
}
