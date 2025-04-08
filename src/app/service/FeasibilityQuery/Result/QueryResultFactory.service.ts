import { Injectable } from '@angular/core';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class QueryResultFactoryService {
  constructor() {}

  /**
   * Prepares a query result from a saved query.
   * @param savedQuery The saved query to be prepared.
   * @returns A processed QueryResult.
   */
  public prepareQueryResult(
    feasibilityQuery: FeasibilityQuery,
    totalNumberOfPatients: number
  ): QueryResult {
    const queryResult = this.createQueryResult(feasibilityQuery, totalNumberOfPatients);
    feasibilityQuery.setResultIds([queryResult.getId()]);
    return queryResult;
  }

  /**
   * Creates a new QueryResult from the feasibility query and saved data.
   * @param feasibilityQuery The feasibility query.
   * @param savedQuery The saved data query.
   * @returns A new QueryResult instance.
   */
  private createQueryResult(
    feasibilityQuery: FeasibilityQuery,
    totalNumberOfPatients: number
  ): QueryResult {
    return new QueryResult(false, feasibilityQuery.getId(), totalNumberOfPatients, uuidv4());
  }
}
