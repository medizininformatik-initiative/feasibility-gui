export class FeasibilityQueryPaths {
  private static readonly BASE_URL = 'query';

  public static readonly EXECUTE_QUERY = this.BASE_URL;
  public static readonly RESULT_RATE_LIMIT = `${FeasibilityQueryPaths.BASE_URL}/detailed-obfuscated-result-rate-limit`;
  public static readonly SAVED_QUERY_SLOTS_ENDPOINT = `${FeasibilityQueryPaths.BASE_URL}/saved-query-slots`;
  public static readonly SAVE_QUERY = '/saved';
  public static readonly VALIDATE = '/validate';

  public static getBaseUrl() {
    return this.BASE_URL;
  }
}
