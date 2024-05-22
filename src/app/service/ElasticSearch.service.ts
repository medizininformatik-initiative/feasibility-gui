import { Injectable } from '@angular/core';
import { BackendService } from '../modules/querybuilder/service/backend.service';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchService {
  private backendService: BackendService;

  public startElasticSearch(searchTerm: string) {
    this.backendService.getElasticSearchResults(searchTerm);
  }
}
