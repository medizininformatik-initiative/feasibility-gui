import { ElasticSearchFilterPaths } from '../../Backend/Paths/ElasticSearchFilterPaths';
import { InterfaceUrlBuilder } from '../../Backend/UrlBuilder/InterfaceUrlBuilder';

export class SearchUrlBuilder implements InterfaceUrlBuilder {
  private baseUrl: string;
  private queryParams: Map<string, string> = new Map();

  constructor(path: string) {
    this.baseUrl = path;
  }

  public setBasePath(path: string): this {
    this.baseUrl = path;
    return this;
  }

  public withSearchTerm(searchTerm: string): this {
    this.queryParams.set('searchterm', searchTerm);
    return this;
  }

  public withContext(context: string): this {
    this.queryParams.set(ElasticSearchFilterPaths.CONTEXTS, context);
    return this;
  }

  public withTerminology(terminology: string): this {
    this.queryParams.set(ElasticSearchFilterPaths.TERMINOLOGIES, terminology);
    return this;
  }

  public withKds(kds: string): this {
    this.queryParams.set(ElasticSearchFilterPaths.KDSMODULES, kds);
    return this;
  }

  public withAvailability(availability: string): this {
    this.queryParams.set(ElasticSearchFilterPaths.AVAILABILITY, availability);
    return this;
  }

  public withFiltertUrl(path: string, criteriaSetUrl: string): this {
    this.queryParams.set(path, encodeURI(criteriaSetUrl));
    return this;
  }

  public withPageSize(limit: number): this {
    this.queryParams.set('page-size', limit.toString());
    return this;
  }

  public withPage(offset: number): this {
    this.queryParams.set('page', offset.toString());
    return this;
  }

  public withId(id: string) {
    this.queryParams.set('id', id);
    return this;
  }

  public buildUrl(): string {
    const queryParamsArray = [];
    this.queryParams.forEach((value, key) => {
      queryParamsArray.push(`${key}=${value}`);
    });
    const queryParamsString = queryParamsArray.join('&');
    return `${this.baseUrl}?${queryParamsString}`;
  }
}
