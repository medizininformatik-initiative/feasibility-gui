import { QuotaLimit } from './QuotaLimit';

export class FeasibilityQueryQuota {
  private readonly hardLimit: QuotaLimit;
  private readonly softLimit: QuotaLimit;

  constructor(hardLimit: QuotaLimit, softLimit: QuotaLimit) {
    this.hardLimit = hardLimit;
    this.softLimit = softLimit;
  }

  public getHardLimit(): QuotaLimit {
    return this.hardLimit;
  }

  public getSoftLimit(): QuotaLimit {
    return this.softLimit;
  }
}
