import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StructuredQuery2UIQueryTranslatorService } from './StructuredQuery2UIQueryTranslator.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2FeasibilityQueryService {
  constructor(private translator: StructuredQuery2UIQueryTranslatorService) {}

  public translate(structuredQuery: any): Observable<FeasibilityQuery> {
    const feasibilityQuery = new FeasibilityQuery(uuidv4(), structuredQuery.display);
    if (structuredQuery.inclusionCriteria) {
      return this.translator.translateInExclusion(structuredQuery.inclusionCriteria).pipe(
        map((inclusion) => {
          feasibilityQuery.setInclusionCriteria(inclusion);
          if (structuredQuery.exclusionCriteria) {
            this.translator.translateInExclusion(structuredQuery.exclusionCriteria).pipe(
              map((exclusion) => {
                feasibilityQuery.setExclusionCriteria(exclusion);
              })
            );
          }
          return feasibilityQuery;
        })
      );
    } else {
      console.warn('ERROR no inclusion criteria');
    }
  }
}
