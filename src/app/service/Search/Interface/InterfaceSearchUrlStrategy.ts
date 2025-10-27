export abstract class SearchUrlStrategy {
  abstract getSearchUrl(page: number, pageSize: number): string;
}
