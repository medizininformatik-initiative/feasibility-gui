export interface SearchUrlStrategy {
  getSearchUrl(page?: number, pageSize?: number): string
}
