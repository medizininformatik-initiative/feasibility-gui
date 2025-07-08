import { FeasibilityQueryApiService } from '../../Backend/Api/FeasibilityQueryApi.service';
import { FeasibilityQueryQuota } from 'src/app/model/FeasibilityQuery/Quota/FeasibilityQueryQuota';
import { FeasibilityQueryQuotaData } from 'src/app/model/Interface/FeasibilityQueryQuota';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { QuotaLimit } from 'src/app/model/FeasibilityQuery/Quota/QuotaLimit';
import { QuotaLimitData } from 'src/app/model/Interface/QuotaLimitData';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryQuotaService {
  constructor(private feasibilityQueryApiService: FeasibilityQueryApiService) {}

  public getQuotaLimit(): Observable<FeasibilityQueryQuota> {
    return this.feasibilityQueryApiService
      .getFeasibilityQueryQuota()
      .pipe(map((quotaData: FeasibilityQueryQuotaData) => this.mapQuotaData(quotaData)));
  }

  private mapQuotaData(quotaData: FeasibilityQueryQuotaData) {
    return new FeasibilityQueryQuota(
      this.mapLimit(quotaData.hardLimit),
      this.mapLimit(quotaData.softLimit)
    );
  }

  private mapLimit(limitData: QuotaLimitData) {
    return new QuotaLimit(limitData.interval, limitData.total, limitData.used);
  }
}
