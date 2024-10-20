import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { StructuredQuery2UIQueryTranslatorService } from './StructuredQuery2UIQueryTranslator.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2FeasibilityQueryService {
  constructor(private translator: StructuredQuery2UIQueryTranslatorService) {}

/*  public translate2(structuredQuery: any): Observable<FeasibilityQuery> {
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
  */

  public translate(structuredQuery: any): Observable<FeasibilityQuery> {
    const feasibilityQuery = new FeasibilityQuery(uuidv4(), structuredQuery.display);

    if (structuredQuery.inclusionCriteria) {
      const inclusion$ = this.translator.translateInExclusion(structuredQuery.inclusionCriteria);
      const exclusion$ = structuredQuery.exclusionCriteria
        ? this.translator.translateInExclusion(structuredQuery.exclusionCriteria)
        : of(null); // If there's no exclusion criteria, return a null observable.

      return forkJoin([inclusion$, exclusion$]).pipe(
        map(([inclusion, exclusion]) => {
          // Set both inclusion and exclusion criteria when both are ready
          feasibilityQuery.setInclusionCriteria(inclusion);
          if (exclusion) {
            feasibilityQuery.setExclusionCriteria(exclusion);
          }
          return feasibilityQuery;
        })
      );
    } else {
      console.warn('ERROR: No inclusion criteria');
    }
  }
}
