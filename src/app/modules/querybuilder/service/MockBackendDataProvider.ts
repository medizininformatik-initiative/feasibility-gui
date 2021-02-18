/* tslint:disable:variable-name */
import {
  CategoryEntry,
  TerminologyCode,
  TerminologyEntry,
} from '../model/api/terminology/terminology'
import { ValueDefinition, ValueType } from '../model/api/terminology/valuedefinition'

export class MockBackendDataProvider {
  public static getCategoryEntries(): Array<CategoryEntry> {
    const categoryEntries = new Array<CategoryEntry>()
    categoryEntries.push({ shortDisplay: 'A', display: 'Anamnesis / Risk factors', entryId: '1' })
    categoryEntries.push({ shortDisplay: 'D', display: 'Demographics', entryId: '2' })
    categoryEntries.push({ shortDisplay: 'L', display: 'Laboratory values', entryId: '3' })
    categoryEntries.push({ shortDisplay: 'T', display: 'Therapie', entryId: '4' })
    categoryEntries.push({ shortDisplay: 'V', display: 'Vital signs', entryId: '5' })
    categoryEntries.push({ shortDisplay: 'O', display: 'Other', entryId: '6' })
    return categoryEntries
  }

  public static getTerminologyEntry(id: string): TerminologyEntry {
    switch (id) {
      case '1':
        return this.getTerminologyEntryAmnesis()
      case 'A3':
        return this.getTerminologyEntryAmnesisLiver()
      case '2':
        return this.getTerminologyEntryDemographics()
      default:
        return this.getTerminologyEntryEmpty(id)
    }
  }

  private static getTerminologyEntryEmpty(id: string): TerminologyEntry {
    return this.createRootTermEntry(id, '---', 'Not specified so far')
  }

  private static getTerminologyEntryAmnesis(): TerminologyEntry {
    const rootAnamnesis = this.createRootTermEntry('1', 'A', 'Anamnesis / Risk factors')

    const childA1 = this.createRootTermEntry('A1', 'A1', 'Chronic lung diseases')
    rootAnamnesis.children.push(childA1)

    const childA1_1 = this.createTermEntry(
      'A1_1',
      'G47.3',
      'Schlafapnoe',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_1)
    const childA1_2 = this.createTermEntry(
      'A1_2',
      'G47.31',
      'Obstruktives Schlafapnoe-Syndrom',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_2)
    const childA1_3 = this.createTermEntry(
      'A1_3',
      'E66.29',
      'Übermäßige Adipositas mit alveolärer Hypoventilation : Grad oder Ausmaß der Adipositas nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_3)
    const childA1_4 = this.createTermEntry(
      'A1_4',
      'I27.0',
      'Primäre pulmonale Hypertonie',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_4)
    const childA1_5 = this.createTermEntry(
      'A1_5',
      'J84.1',
      'Sonstige interstitielle Lungenkrankheiten mit Fibrose',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_5)
    const childA1_6 = this.createTermEntry(
      'A1_6',
      'A16.2',
      'Lungentuberkulose ohne Angabe einer bakteriologischen, molekularbiologischen oder histologischen Sicherung',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_6)
    const childA1_7 = this.createTermEntry(
      'A1_7',
      'J60',
      'Kohlenbergarbeiter-Pneumokoniose',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_7)
    const childA1_8 = this.createTermEntry(
      'A1_8',
      'J61',
      'Pneumokoniose durch Asbest und sonstige anorganische Fasern',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_8)
    const childA1_9 = this.createTermEntry(
      'A1_9',
      'J64',
      'Nicht näher bezeichnete Pneumokoniose',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_9)
    const childA1_10 = this.createTermEntry(
      'A1_10',
      'J66.0',
      'Krankheit der Atemwege durch spezifischen organischen Staub',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_10)
    const childA1_11 = this.createTermEntry(
      'A1_11',
      'J67.0',
      'Farmerlunge',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_11)
    const childA1_12 = this.createTermEntry(
      'A1_12',
      'J67.1',
      'Bagassose',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_12)
    const childA1_13 = this.createTermEntry(
      'A1_13',
      'J68.4',
      'Chronische Krankheiten der Atmungsorgane durch chemische Substanzen, Gase, Rauch und Dämpfe',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_13)
    const childA1_14 = this.createTermEntry(
      'A1_14',
      'J70.1',
      'Chronische und sonstige Lungenbeteiligung bei Strahleneinwirkung',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_14)
    const childA1_15 = this.createTermEntry(
      'A1_15',
      'J70.4',
      'Arzneimittelinduzierte interstitielle Lungenkrankheit, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_15)
    const childA1_16 = this.createTermEntry(
      'A1_16',
      'P27.8',
      'Sonstige chronische Atemwegskrankheiten mit Ursprung in der Perinatalperiode',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_16)
    const childA1_17 = this.createTermEntry(
      'A1_17',
      'Z87.0',
      'Krankheiten des Atmungssystems in der Eigenanamnese',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_17)
    const childA1_18 = this.createTermEntry(
      'A1_18',
      'J44.9',
      'Chronische obstruktive Lungenkrankheit, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_18)
    const childA1_19 = this.createTermEntry(
      'A1_19',
      'J45.9',
      'Asthma bronchiale, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_19)
    const childA1_20 = this.createTermEntry(
      'A1_20',
      'E84.9',
      'Zystische Fibrose, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA1.children.push(childA1_20)

    const childA2 = this.createRootTermEntry('A2', 'A2', 'Disorders of cardiovascular system')
    rootAnamnesis.children.push(childA2)

    const childA2_1 = this.createTermEntry(
      'A2_1',
      'I25.29',
      'Alter Myokardinfarkt Nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_1)
    const childA2_2 = this.createTermEntry(
      'A2_2',
      'I10.90',
      'Essentielle Hypertonie, nicht näher bezeichnet : Ohne Angabe einer hypertensiven Krise',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_2)
    const childA2_3 = this.createTermEntry(
      'A2_3',
      'I73.9',
      'Periphere Gefäßkrankheit, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_3)
    const childA2_4 = this.createTermEntry(
      'A2_4',
      'I49.9',
      'Kardiale Arrhythmie, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_4)
    const childA2_5 = this.createTermEntry(
      'A2_5',
      'I50.9',
      'Herzinsuffizienz, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_5)
    const childA2_6 = this.createTermEntry(
      'A2_6',
      'I25.1',
      'Atherosklerotische Herzkrankheit',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_6)
    const childA2_7 = this.createTermEntry(
      'A2_7',
      'I65.2',
      'Verschluss und Stenose der A. carotis',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_7)
    const childA2_8 = this.createTermEntry(
      'A2_8',
      'Z95.1',
      'Vorhandensein eines aortokoronaren Bypasses',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_8)
    const childA2_9 = this.createTermEntry(
      'A2_9',
      'Z95.5',
      'Vorhandensein eines Implantates oder Transplantates nach koronarer Gefäßplastik',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA2.children.push(childA2_9)

    const childA3 = this.createRootTermEntry('A3', 'A3', 'Chronic liver diseases')
    rootAnamnesis.children.push(childA3)

    /*
    const childA3_1 = this.createTermEntry('A3_1', 'K76.0', 'Fettleber [fettige Degeneration], anderenorts nicht klassifiziert', 'http://fhir.de/CodeSystem/dimdi/icd-10-gm')
    childA3.children.push(childA3_1)
    const childA3_2 = this.createTermEntry('A3_2', 'K70.0', 'Alkoholische Fettleber', 'http://fhir.de/CodeSystem/dimdi/icd-10-gm')
    childA3.children.push(childA3_2)
    const childA3_3 = this.createTermEntry('A3_3', 'K74.6', 'Fibrose und Zirrhose der Leber', 'http://fhir.de/CodeSystem/dimdi/icd-10-gm')
    childA3.children.push(childA3_3)
    const childA3_4 = this.createTermEntry('A3_4', 'B18.9', 'Chronische Virushepatitis, nicht näher bezeichnet', 'http://fhir.de/CodeSystem/dimdi/icd-10-gm')
    childA3.children.push(childA3_4)
    const childA3_5 = this.createTermEntry('A3_5', 'K76.9', 'Leberkrankheit, nicht näher bezeichnet', 'http://fhir.de/CodeSystem/dimdi/icd-10-gm')
    childA3.children.push(childA3_5)
*/

    return rootAnamnesis
  }

  private static getTerminologyEntryAmnesisLiver(): TerminologyEntry {
    const childA3 = this.createRootTermEntry('A3', 'A3', 'Chronic liver diseases')

    const childA3_1 = this.createTermEntry(
      'A3_1',
      'K76.0',
      'Fettleber [fettige Degeneration], anderenorts nicht klassifiziert',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA3.children.push(childA3_1)
    const childA3_2 = this.createTermEntry(
      'A3_2',
      'K70.0',
      'Alkoholische Fettleber',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA3.children.push(childA3_2)
    const childA3_3 = this.createTermEntry(
      'A3_3',
      'K74.6',
      'Fibrose und Zirrhose der Leber',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA3.children.push(childA3_3)
    const childA3_4 = this.createTermEntry(
      'A3_4',
      'B18.9',
      'Chronische Virushepatitis, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA3.children.push(childA3_4)
    const childA3_5 = this.createTermEntry(
      'A3_5',
      'K76.9',
      'Leberkrankheit, nicht näher bezeichnet',
      'http://fhir.de/CodeSystem/dimdi/icd-10-gm'
    )
    childA3.children.push(childA3_5)

    return childA3
  }

  private static getTerminologyEntryDemographics(): TerminologyEntry {
    const rootDemographics = this.createRootTermEntry('2', 'D', 'Demographics')

    const valueDefinitonD1 = this.createDefaultValueDefinitionConcept([
      this.createTermCode('LA15173-0', 'http://loinc.org', 'Pregnant'),
      this.createTermCode('LA26683-5', 'http://loinc.org', 'Not pregnant'),
      this.createTermCode('LA4489-6', 'http://loinc.org', 'Unknown'),
    ])

    const childD1 = this.createTermEntry(
      'D1',
      '82810-3',
      'Pregnancy status',
      'http://loinc.org',
      valueDefinitonD1
    )
    rootDemographics.children.push(childD1)

    const valueDefinitonD2 = this.createDefaultValueDefinitionConcept([
      this.createTermCode('male', 'http://hl7.org/fhir/administrative-gender', 'Male'),
      this.createTermCode('female', 'http://hl7.org/fhir/administrative-gender', 'Female'),
      this.createTermCode('unknown', 'http://hl7.org/fhir/administrative-gender', 'Unknown'),
      this.createTermCode('X', 'http://fhir.de/CodeSystem/gender-amtlich-de', 'unbestimmt'),
      this.createTermCode('D', 'http://fhir.de/CodeSystem/gender-amtlich-de', 'divers'),
    ])

    const childD2 = this.createTermEntry(
      'D2',
      '76689-9',
      'Biological Sex',
      'http://loinc.org',
      valueDefinitonD2
    )
    rootDemographics.children.push(childD2)

    const valueDefinitonD3 = this.createDefaultValueDefinitionQuantity()
    valueDefinitonD3.precision = 0
    valueDefinitonD3.allowedUnits = [{ code: 'a', display: ' Jahre(e)' }]

    const childD3 = this.createTermEntry(
      'D3',
      '21612-7',
      'Age - Reported',
      'http://loinc.org',
      valueDefinitonD3
    )
    rootDemographics.children.push(childD3)

    const valueDefinitonD4 = this.createDefaultValueDefinitionQuantity()
    valueDefinitonD4.allowedUnits = [{ code: 'kg', display: 'kg' }]

    const childD4 = this.createTermEntry(
      'D4',
      '29463-7',
      'Body Weight',
      'http://loinc.org',
      valueDefinitonD4
    )
    rootDemographics.children.push(childD4)

    const valueDefinitonD5 = this.createDefaultValueDefinitionQuantity()
    valueDefinitonD4.allowedUnits = [
      { code: 'cm', display: 'cm' },
      { code: 'm', display: 'm' },
    ]

    const childD5 = this.createTermEntry(
      'D5',
      '29463-7',
      'Body Weight',
      'http://loinc.org',
      valueDefinitonD5
    )
    rootDemographics.children.push(childD5)

    const valueDefinitonD6 = this.createDefaultValueDefinitionConcept([
      this.createTermCode('14045001', 'http://snomed.info/sct', 'Caucasian (ethnic group)'),
      this.createTermCode('18167009', 'http://snomed.info/sct', 'Black African (ethnic group)'),
      this.createTermCode(
        '315280000',
        'http://snomed.info/sct',
        'Asian - ethnic group (ethnic group)'
      ),
      this.createTermCode('90027003', 'http://snomed.info/sct', 'Arabs (ethnic group)'),
      this.createTermCode(
        '186019001',
        'http://snomed.info/sct',
        'Other ethnic, mixed origin (ethnic group)'
      ),
      this.createTermCode('2135-2', 'urn:oid:2.16.840.1.113883.6.238', 'Hispanic or Latino'),
    ])

    const childD6 = this.createTermEntry(
      'D6',
      '82810-3',
      'Ethnic Group',
      'http://loinc.org',
      valueDefinitonD6
    )
    rootDemographics.children.push(childD6)

    return rootDemographics
  }

  private static createRootTermEntry(id: string, code: string, display: string): TerminologyEntry {
    const termEntry = new TerminologyEntry()
    termEntry.leaf = false
    termEntry.selectable = false
    termEntry.id = id
    termEntry.timeRestrictionAllowed = false
    termEntry.children = []
    termEntry.termCode = {
      code,
      system: '',
      display,
    }
    return termEntry
  }

  private static createTermEntry(
    id: string,
    code: string,
    display: string,
    system = 'none',
    valueDefinition?: ValueDefinition
  ): TerminologyEntry {
    const termEntry = new TerminologyEntry()
    termEntry.leaf = true
    termEntry.selectable = true
    termEntry.id = id
    termEntry.timeRestrictionAllowed = true
    termEntry.children = []
    termEntry.termCode = {
      code,
      system,
      display,
    }
    termEntry.valueDefinition = valueDefinition
    return termEntry
  }

  private static createDefaultValueDefinitionQuantity(): ValueDefinition {
    return {
      type: ValueType.QUANTITY,
      precision: 1,
      min: 0,
      max: 100,
      allowedUnits: [
        { code: 'l', display: 'Liter' },
        { code: 'l', display: 'Milliliter' },
      ],
    }
  }

  private static createDefaultValueDefinitionConcept(
    selectableConcepts?: Array<TerminologyCode>
  ): ValueDefinition {
    return {
      type: ValueType.CONCEPT,
      precision: 0,
      selectableConcepts,
    }
  }

  private static createTermCode(code: string, system: string, display: string): TerminologyCode {
    return { code, display, system }
  }
}
