import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  CodeSystemEntry,
  TerminologySystemDictionary,
} from 'src/app/model/Utilities/TerminologySystemDictionary';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';

@Injectable({
  providedIn: 'root',
})
export class TerminologySystemProvider {
  constructor(private backEndService: BackendService) {
    this.initializeTerminologySystems();
  }

  public initializeTerminologySystems(): void {
    this.backEndService
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
