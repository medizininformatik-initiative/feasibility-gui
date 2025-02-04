import { FeasibilityQueryResultApiService } from '../../Backend/Api/FeasibilityQueryResultApi.service';
import { FeatureService } from '../../Feature.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObfuscatedResultService {
  constructor(
    private feasibilityQueryResultApiService: FeasibilityQueryResultApiService,
    private feature: FeatureService
  ) {}

  public getDetailedObfuscatedResult(feasibilityQueryResultId: string): Observable<any> {
    return this.feasibilityQueryResultApiService
      .getDetailedObfuscatedResult(feasibilityQueryResultId)
      .pipe(map((result) => this.getObfuscatedResult(result)));
  }

  private getObfuscatedResult(result: any): any {
    if (!this.isValidResult(result)) {
      return result;
    }

    return {
      ...result,
      totalNumberOfPatients: this.obfuscateTotalPatients(result.totalNumberOfPatients),
    };
  }

  private obfuscateTotalPatients(totalPatients: number): string {
    if (totalPatients === 0) {return '0';}

    const lowerBoundary = this.getLowerBoundaryPatient();
    if (totalPatients <= lowerBoundary) {return `< ${lowerBoundary}`;}

    return totalPatients.toString();
  }

  private isValidResult(result: any): boolean {
    return result && typeof result.totalNumberOfPatients === 'number';
  }

  private getLowerBoundaryPatient(): number {
    return this.feature.getPatientResultLowerBoundary();
  }
}
