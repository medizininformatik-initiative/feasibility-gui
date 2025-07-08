import { QuotaLimitData } from './QuotaLimitData';

export interface FeasibilityQueryQuotaData {
  hardLimit: QuotaLimitData
  softLimit: QuotaLimitData
}
