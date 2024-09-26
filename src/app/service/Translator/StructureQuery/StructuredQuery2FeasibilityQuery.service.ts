import { Injectable } from '@angular/core';
import {FeasibilityQuery} from "../../../model/FeasibilityQuery/FeasibilityQuery";
import {NewStructuredQuery2UIQueryTranslatorService} from "./NewStructuredQuery2UIQueryTranslator.service";
import { map, Observable } from 'rxjs';
import {FeasibilityQueryProviderService} from "../../Provider/FeasibilityQueryProvider.service";

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2FeasibilityQueryService {

  constructor(private translator: NewStructuredQuery2UIQueryTranslatorService, private feasibilityQueryProvider: FeasibilityQueryProviderService) {
  }

  public translate(structuredQuery: any): Observable<void> {
    if (structuredQuery.inclusionCriteria) {
      return this.translator.testFunction(structuredQuery.inclusionCriteria).pipe(
        map((inclusion) => {
          this.feasibilityQueryProvider.setInclusionCriteria(inclusion)
          if (structuredQuery.exclusionCriteria) {
            this.translator.testFunction(structuredQuery.exclusionCriteria).pipe(
              map((exclusion) => {
                this.feasibilityQueryProvider.setExclusionCriteria(exclusion)
              })
            )
          }
        })
      )
    } else {
      console.warn('ERROR')
    }
  }
}
