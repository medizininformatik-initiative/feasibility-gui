import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  CodeSystemEntry,
  TerminologySystemDictionary,
} from 'src/app/model/Utilities/TerminologySystemDictionary';
import { TerminologyApiService } from '../Backend/Api/TerminologyApi.service';

@Injectable({
  providedIn: 'root',
})
export class TerminologySystemProvider {
  constructor(private terminologyApiService: TerminologyApiService) {
    this.initializeTerminologySystems();
  }

  public initializeTerminologySystems(): void {
    this.terminologyApiService
      .getTerminologySystems()
      .pipe(
        tap((data: CodeSystemEntry[]) => {
          TerminologySystemDictionary.initialize(data);
        })
      )
      .subscribe({
        next: () => console.warn('Terminology systems initialized successfully.'),
        error: (error) => console.error('Failed to initialize terminology systems:', error),
      });
  }
}
