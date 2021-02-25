/* tslint:disable:member-ordering */
import { Inject, Injectable } from '@angular/core'
import { Query } from '../model/api/query/query'
import { Comparator, OperatorOptions } from '../model/api/query/valueFilter'
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class QueryProviderService {
  STORAGE_QUERY_KEY = 'QUERY'

  constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {}

  public query(): Query {
    const query = this.storage.get(this.STORAGE_QUERY_KEY)

    return query && environment.name !== 'test' ? query : QueryProviderService.createDefaultQuery()
  }

  public store(query: Query): void {
    this.storage.set(this.STORAGE_QUERY_KEY, query)
  }

  public static createDefaultQuery(): Query {
    return QueryProviderService.createTestQuery()
  }

  public static createTestQuery(): Query {
    return {
      groups: [
        {
          display: 'Ausgewählte Merkmale',
          id: '123',
          inclusionCriteria: [
            [
              {
                termCode: {
                  code: 'in-0-00 LL2191-6',
                  display: 'Geschlecht',
                  system: 'http://loinc.org',
                },
                valueFilter: {
                  type: OperatorOptions.CONCEPT,
                  selectedConcepts: [
                    {
                      code: 'F',
                      display: 'female',
                      system:
                        'https://fhir.loinc.org/CodeSystem/$lookup?system=http://loinc.org&code=LL2191-6',
                      version: '',
                    },
                    {
                      code: 'M',
                      display: 'male',
                      system:
                        'https://fhir.loinc.org/CodeSystem/$lookup?system=http://loinc.org&code=LL2191-6',
                      version: '',
                    },
                  ],
                },
              },
            ],
            [
              {
                termCode: {
                  code: 'in-0-10 30525-0',
                  display: 'Alter',
                  system: 'http://loinc.org',
                },
                valueFilter: {
                  type: OperatorOptions.QUANTITY_COMPARATOR,
                  comparator: Comparator.GREATER_THAN,
                  unit: {
                    code: 'a',
                    display: 'Jahr',
                  },
                  value: 18,
                },
              },
            ],
            [
              {
                termCode: {
                  code: 'in-0-20 F00',
                  display: 'F00',
                  system: 'http://fhir.de/CodeSystem/dimdi/icd-10-gm',
                },
              },
              {
                termCode: {
                  code: 'in-0-21 F09',
                  display: 'F09',
                  system: 'http://fhir.de/CodeSystem/dimdi/icd-10-gm',
                },
              },
            ],
          ],
          exclusionCriteria: [
            [
              {
                termCode: {
                  code: 'ex-0-00 LL2191-6',
                  display: 'Geschlecht',
                  system: 'http://loinc.org',
                },
                valueFilter: {
                  type: OperatorOptions.CONCEPT,
                  selectedConcepts: [
                    {
                      code: 'male',
                      display: 'male',
                      system: '',
                      version: '',
                    },
                  ],
                },
              },
            ],
            [
              {
                termCode: {
                  code: 'ex-0-10 30525-0',
                  display: 'Alter',
                  system: 'http://loinc.org',
                },
                valueFilter: {
                  type: OperatorOptions.QUANTITY_COMPARATOR,
                  comparator: Comparator.GREATER_THAN,
                  unit: {
                    code: 'year',
                    display: 'Jahr',
                  },
                  value: 65,
                },
              },
            ],
            [
              {
                termCode: {
                  code: 'ex-0-20 F00.9',
                  display: 'F00.9',
                  system: 'http://fhir.de/CodeSystem/dimdi/icd-10-gm',
                },
              },
              {
                termCode: {
                  code: 'ex-0-21 8310-5',
                  display: 'Körpertemperatur',
                  system: 'http://loinc.org',
                },
                valueFilter: {
                  type: OperatorOptions.QUANTITY_RANGE,
                  unit: {
                    code: 'Cel',
                    display: '°C',
                  },
                  minValue: 35,
                  maxValue: 39,
                },
              },
            ],
          ],
        },
      ],
      display: 'Beispiel-Query',
    }
  }
}
