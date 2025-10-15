import { FeasibilityQueryResultApiService } from '../../../Backend/Api/FeasibilityQueryResultApi.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { QueryResultMapperService } from '../Mapping/QueryResultMapper.service';
import { AppSettingsProviderService } from 'src/app/service/Config/AppSettingsProvider.service';

@Injectable({
  providedIn: 'root',
})
export class ObfuscatedResultService {
  constructor(
    private feasibilityQueryResultApiService: FeasibilityQueryResultApiService,
    private appSettingsProviderService: AppSettingsProviderService,
    private queryResultMapperService: QueryResultMapperService
  ) {}

  public getDetailedObfuscatedResult(
    feasibilityQueryResultId: string,
    feasibilityQueryId: string
  ): Observable<QueryResult> {
    return this.feasibilityQueryResultApiService
      .getDetailedObfuscatedResult(feasibilityQueryResultId)
      .pipe(
        map((result) => {
          this.obfuscatedResult(result);
          return this.mapQueryResult(result, feasibilityQueryId);
        })
      );
  }

  private mapQueryResult(result, feasibilityQueryId: string): QueryResult {
    const queryResult: QueryResult = this.queryResultMapperService.createQueryResult(
      true,
      result,
      feasibilityQueryId
    );
    return queryResult;
  }

  private obfuscatedResult(result: any): any {
    if (!this.isValidResult(result)) {
      return result;
    }

    return {
      ...result,
      totalNumberOfPatients: this.obfuscateTotalPatients(result.totalNumberOfPatients),
    };
  }

  private obfuscateTotalPatients(totalPatients: number): string {
    if (totalPatients === 0) {
      return '0';
    }

    const lowerBoundary = this.getLowerBoundaryPatient();
    if (totalPatients <= lowerBoundary) {
      return `< ${lowerBoundary}`;
    }

    return totalPatients.toString();
  }

  private isValidResult(result: any): boolean {
    return result && typeof result.totalNumberOfPatients === 'number';
  }

  private getLowerBoundaryPatient(): number {
    return this.appSettingsProviderService.getLowerBoundaryPatientResult();
  }
}
