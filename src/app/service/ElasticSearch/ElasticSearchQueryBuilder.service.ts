import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchQueryBuilder {
  private baseUrl: string;
  private queryParams: Map<string, string> = new Map();

  constructor(private path: string) {
    this.baseUrl = path;
  }

  withSearchTerm(searchTerm: string): this {
    this.queryParams.set('searchterm', searchTerm);
    return this;
  }

  withContext(context: string): this {
    this.queryParams.set('context', context);
    return this;
  }

  withTerminology(terminology: string): this {
    this.queryParams.set('terminology', terminology);
    return this;
  }

  withKds(kds: string): this {
    this.queryParams.set('kds', kds);
    return this;
  }

  withAvailability(availability: number): this {
    this.queryParams.set('availability', availability.toString());
    return this;
  }

  withLimit(limit: number): this {
    this.queryParams.set('limit', limit.toString());
    return this;
  }

  withOffset(offset: number): this {
    this.queryParams.set('offset', offset.toString());
    return this;
  }

  buildUrl(): string {
    const queryParamsArray = [];
    this.queryParams.forEach((value, key) => {
      queryParamsArray.push(`${key}=${value}`);
    });
    const queryParamsString = queryParamsArray.join('&');
    return `${this.baseUrl}?${queryParamsString}`;
  }
}
