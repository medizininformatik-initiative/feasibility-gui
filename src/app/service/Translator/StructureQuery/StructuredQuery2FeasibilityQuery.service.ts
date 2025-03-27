import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { StructuredQuery2UIQueryTranslatorService } from './StructuredQuery2UIQueryTranslator.service';
import { v4 as uuidv4 } from 'uuid';
import { StructuredQueryData } from 'src/app/model/Interface/StructuredQueryData';
import { TypeGuard } from '../../TypeGuard/TypeGuard';

@Injectable({
  providedIn: 'root',
})
export class StructuredQuery2FeasibilityQueryService {
  constructor(private translator: StructuredQuery2UIQueryTranslatorService) {}

  public translate(structuredQuery: StructuredQueryData | any): Observable<FeasibilityQuery> {
    const feasibilityQuery = new FeasibilityQuery(uuidv4(), structuredQuery?.display ?? '');
    if (!TypeGuard.isStructuredQueryData(structuredQuery)) {
      console.warn('ERROR: No inclusion criteria');
      return of(feasibilityQuery);
    }
    const inclusion$ = this.getInclusionObservable(structuredQuery);
    const exclusion$ = this.getExclusionObservable(structuredQuery);
    return this.combineCriteria(inclusion$, exclusion$, feasibilityQuery);
  }

  private getInclusionObservable(structuredQuery: StructuredQueryData): Observable<any> {
    return this.translator.translateInExclusion(structuredQuery.inclusionCriteria);
  }

  private getExclusionObservable(structuredQuery: StructuredQueryData): Observable<any> {
    return this.hasValidExclusionCriteria(structuredQuery)
      ? this.translator.translateInExclusion(structuredQuery.exclusionCriteria)
      : of(null);
  }

  private combineCriteria(
    inclusion$: Observable<any>,
    exclusion$: Observable<any>,
    feasibilityQuery: FeasibilityQuery
  ): Observable<FeasibilityQuery> {
    return forkJoin([inclusion$, exclusion$]).pipe(
      map(([inclusion, exclusion]) => {
        feasibilityQuery.setInclusionCriteria(inclusion);
        if (exclusion) {
          feasibilityQuery.setExclusionCriteria(exclusion);
        }
        return feasibilityQuery;
      })
    );
  }

  private hasValidExclusionCriteria(structuredQuery: StructuredQueryData): boolean {
    return (
      Array.isArray(structuredQuery.exclusionCriteria) &&
      structuredQuery.exclusionCriteria.some(
        (criteria) => Array.isArray(criteria) && criteria.length > 0
      )
    );
  }
}
