import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import {
  CodeSystemEntry,
  TerminologySystemDictionary,
} from 'src/app/model/Utilities/TerminologySystemDictionary';
import { TerminologyApiService } from '../Backend/Api/TerminologyApi.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TerminologySystemProvider {
  constructor(private terminologyApiService: TerminologyApiService) {}

  public initializeTerminologySystems(): Observable<boolean> {
    return this.terminologyApiService.getTerminologySystems().pipe(
      tap((data: CodeSystemEntry[]) => {
        TerminologySystemDictionary.initialize(data);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
