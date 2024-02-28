import { Injectable } from '@angular/core';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { Query } from '../model/FeasibilityQuery/Query';
import { BackendService } from '../modules/querybuilder/service/backend.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private backendService: BackendService) {}

  /**
   * @todo
   * Validation needs to be done in the translation process
   * 1. request for validation --> needs an
   * 2. translateQuery to UiQuery
   * 2. set invalidTerms boolean
   * @param Query
   */
  public validateStructuredQuery(structuredQuery: StructuredQuery) {
    this.backendService.validateStructuredQuery(structuredQuery).subscribe((invalidTerms) => {
      console.log(invalidTerms);
      return invalidTerms;
    });
  }
}
