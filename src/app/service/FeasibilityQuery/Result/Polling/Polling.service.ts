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
  readonly POLLING_INTERVALL_MILLISECONDS = this.appSettingsProviderService.getPollingInterval();
  readonly POLLING_MAXL_MILLISECONDS = this.appSettingsProviderService.getPollingTime();

  constructor(
    private feasibilityQueryResultApiService: FeasibilityQueryResultApiService,
    private appSettingsProviderService: AppSettingsProviderService,
    private feasibilityQueryApiService: FeasibilityQueryApiService,
    private translator: UIQuery2StructuredQueryService
  ) {
    console.log(`[PollingService] Polling interval: ${this.POLLING_INTERVALL_MILLISECONDS} ms`);
    console.log(`[PollingService] Polling max time: ${this.POLLING_MAXL_MILLISECONDS} ms`);
  }

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
}
