import { AppSettingsProviderService } from 'src/app/service/Config/AppSettingsProvider.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryApiService } from '../../../Backend/Api/FeasibilityQueryApi.service';
import { FeasibilityQueryResultApiService } from '../../../Backend/Api/FeasibilityQueryResultApi.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UIQuery2StructuredQueryService } from '../../../Translator/StructureQuery/UIQuery2StructuredQuery.service';

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  private readonly POLLING_INTERVALL_MILLISECONDS =
    this.appSettingsProviderService.getPollingintervall();
  private readonly POLLING_MAXL_MILLISECONDS = this.appSettingsProviderService.getPollingtime();

  constructor(
    private feasibilityQueryResultApiService: FeasibilityQueryResultApiService,
    private appSettingsProviderService: AppSettingsProviderService,
    private feasibilityQueryApiService: FeasibilityQueryApiService,
    private translator: UIQuery2StructuredQueryService
  ) {}

  /**
   * Retrieves a summary of the query result.
   *
   * @param resultId The ID of the feasibility query result.
   */
  public requestSummaryResult(resultId: string): Observable<any> {
    return this.feasibilityQueryResultApiService.getSummaryResult(resultId);
  }

  public getFeasibilityIdFromPollingUrl(query: FeasibilityQuery): Observable<string> {
    return this.feasibilityQueryApiService
      .postStructuredQuery(this.translator.translateToStructuredQuery(query))
      .pipe(
        map((result) => {
          const pollingUrl = result.headers.get('location');
          return pollingUrl.substring(pollingUrl.lastIndexOf('/') + 1);
        })
      );
  }

  /**
   * If the polling intervall exceeds the max polling time, it returns the max polling time.
   * @returns The polling interval in milliseconds
   */
  public getPollingInterval(): number {
    const pollingIntervall =
      this.POLLING_INTERVALL_MILLISECONDS > this.POLLING_MAXL_MILLISECONDS
        ? this.POLLING_MAXL_MILLISECONDS
        : this.POLLING_INTERVALL_MILLISECONDS;
    return pollingIntervall * 1000;
  }

  /**
   *
   * @returns The polling time
   */
  public getPollingTime(): number {
    return this.POLLING_MAXL_MILLISECONDS * 1000;
  }
}
