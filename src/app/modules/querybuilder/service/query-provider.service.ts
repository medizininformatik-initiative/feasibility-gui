/* eslint-disable @typescript-eslint/member-ordering */
/*import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from '../../../../environments/environment';
import { GroupFactory } from '../controller/GroupFactory';
import { QueryResult } from 'src/app/model/result/QueryResult';
import { Comparator } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { Query } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FilterTypes } from 'src/app/model/FilterTypes';
@Injectable({
  providedIn: 'root',
})
export class QueryProviderService {
  STORAGE_QUERY_KEY = 'QUERY';
  SAVE_QUERY_KEY = 'SAVEDQUERIES';
  latestQueryId: string;

  constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) {}

  public query(): Query {
    const query = this.storage.get(this.STORAGE_QUERY_KEY);
    return query && environment.name !== 'test' ? query : QueryProviderService.createDefaultQuery();
  }

  public store(query: Query): void {
    this.storage.set(this.STORAGE_QUERY_KEY, query);
  }

  public storeQueryResult(queryResult: QueryResult): void {
    this.latestQueryId = queryResult.queryId;
    this.storage.set(queryResult.queryId, queryResult);
  }

  public getQueryResult(): QueryResult {
    return this.storage.get(this.latestQueryId);
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
                    type: FilterTypes.CONCEPT,
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
                    display: '',
                    optional: true,
                    valueDefinition: null,
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
                isLinked: false,
                valueFilters: [
                  {
                    type: FilterTypes.QUANTITY_COMPARATOR,
                    comparator: Comparator.GREATER_THAN,
                    unit: {
                      code: 'a',
                      display: 'Jahr',
                    },
                    value: 18,
                    display: '',
                    optional: true,
                    valueDefinition: null,
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
                isLinked: false,
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
                isLinked: false,
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
                isLinked: false,
                valueFilters: [
                  {
                    type: FilterTypes.CONCEPT,
                    selectedConcepts: [
                      {
                        code: 'male',
                        display: 'male',
                        system: '',
                        version: '',
                      },
                    ],
                    display: '',
                    optional: true,
                    valueDefinition: null,
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
                isLinked: false,
                valueFilters: [
                  {
                    type: FilterTypes.QUANTITY_COMPARATOR,
                    comparator: Comparator.GREATER_THAN,
                    unit: {
                      code: 'year',
                      display: 'Jahr',
                    },
                    value: 65,
                    display: '',
                    optional: true,
                    valueDefinition: null,
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
                isLinked: false,
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
                isLinked: false,
                valueFilters: [
                  {
                    type: FilterTypes.QUANTITY_RANGE,
                    unit: {
                      code: 'Cel',
                      display: '°C',
                    },
                    minValue: 35,
                    maxValue: 39,
                    display: '',
                    optional: true,
                    valueDefinition: null,
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
*/
