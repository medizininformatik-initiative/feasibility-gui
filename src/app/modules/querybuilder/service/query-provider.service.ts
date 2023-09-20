/* eslint-disable @typescript-eslint/member-ordering */
import { Inject, Injectable } from '@angular/core';
import { Query } from '../model/api/query/query';
import { Comparator, OperatorOptions } from '../model/api/query/valueFilter';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from '../../../../environments/environment';
import { GroupFactory } from '../controller/GroupFactory';

@Injectable({
  providedIn: 'root',
})
export class QueryProviderService {
  STORAGE_QUERY_KEY = 'QUERY';
  SAVE_QUERY_KEY = 'SAVEDQUERIES';

  constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {}

  public query(): Query {
    const query = this.storage.get(this.STORAGE_QUERY_KEY);
    return query && environment.name !== 'test' ? query : QueryProviderService.createDefaultQuery();
  }

  public store(query: Query): void {
    this.storage.set(this.STORAGE_QUERY_KEY, query);
  }

  public saveQueries(queries: Array<any>): void {
    this.storage.set(this.SAVE_QUERY_KEY, queries);
  }
  public loadQueries(): Array<any> {
    return this.storage.get(this.SAVE_QUERY_KEY);
  }

  public static createDefaultQuery(): Query {
    const query = {
      groups: [],
      display: '',
      consent: false,
    };
    const group = GroupFactory.createGroup(query);
    query.groups.push(group);

    return query;
  }

  public static createTestQuery(): Query {
    return {
      groups: [
        {
          display: 'Ausgewählte Merkmale',
          id: 123,
          inclusionCriteria: [
            [
              {
                termCodes: [
                  {
                    code: 'in-0-00 LL2191-6',
                    display: 'Geschlecht',
                    system: 'http://loinc.org',
                  },
                ],
                display: 'Geschlecht',
                isLinked: false,
                valueFilters: [
                  {
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
                ],
              },
            ],
            [
              {
                termCodes: [
                  {
                    code: 'in-0-10 30525-0',
                    display: 'Alter',
                    system: 'http://loinc.org',
                  },
                ],
                display: 'Alter',
                valueFilters: [
                  {
                    type: OperatorOptions.QUANTITY_COMPARATOR,
                    comparator: Comparator.GREATER_THAN,
                    unit: {
                      code: 'a',
                      display: 'Jahr',
                    },
                    value: 18,
                  },
                ],
              },
            ],
            [
              {
                termCodes: [
                  {
                    code: 'in-0-20 F00',
                    display: 'F00',
                    system: 'http://fhir.de/CodeSystem/dimdi/icd-10-gm',
                  },
                ],
                display: 'F00',
                valueFilters: [],
              },
              {
                termCodes: [
                  {
                    code: 'in-0-21 F09',
                    display: 'F09',
                    system: 'http://fhir.de/CodeSystem/dimdi/icd-10-gm',
                  },
                ],
                display: 'F09',
                valueFilters: [],
              },
            ],
          ],
          exclusionCriteria: [
            [
              {
                termCodes: [
                  {
                    code: 'ex-0-00 LL2191-6',
                    display: 'Geschlecht',
                    system: 'http://loinc.org',
                  },
                ],
                display: 'Geschlecht',
                valueFilters: [
                  {
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
                ],
              },
            ],
            [
              {
                termCodes: [
                  {
                    code: 'ex-0-10 30525-0',
                    display: 'Alter',
                    system: 'http://loinc.org',
                  },
                ],
                display: 'Alter',
                valueFilters: [
                  {
                    type: OperatorOptions.QUANTITY_COMPARATOR,
                    comparator: Comparator.GREATER_THAN,
                    unit: {
                      code: 'year',
                      display: 'Jahr',
                    },
                    value: 65,
                  },
                ],
              },
            ],
            [
              {
                termCodes: [
                  {
                    code: 'ex-0-20 F00.9',
                    display: 'F00.9',
                    system: 'http://fhir.de/CodeSystem/dimdi/icd-10-gm',
                  },
                ],
                display: 'F00.9',
                valueFilters: [],
              },
              {
                termCodes: [
                  {
                    code: 'ex-0-21 8310-5',
                    display: 'Körpertemperatur',
                    system: 'http://loinc.org',
                  },
                ],
                display: 'Körpertemperatur',
                valueFilters: [
                  {
                    type: OperatorOptions.QUANTITY_RANGE,
                    unit: {
                      code: 'Cel',
                      display: '°C',
                    },
                    minValue: 35,
                    maxValue: 39,
                  },
                ],
              },
            ],
          ],
        },
      ],
      display: 'Beispiel-Query',
      consent: false,
    };
  }
}
