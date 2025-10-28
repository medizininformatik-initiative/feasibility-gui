import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProvidersInitService {
  constructor(
    private dataSelectionProvider: DataSelectionProviderService,
    private feasibilityQueryProvider: FeasibilityQueryProviderService
  ) {}

  /**
   * Initializes both DataSelectionProvider and FeasibilityQueryProvider.
   * Emits true only if both succeed.
   */
  public initializeProviders(patientProfileResult: DataSelectionProfile): Observable<boolean> {
    return this.dataSelectionProvider
      .initializeDataSelectionInstance(patientProfileResult)
      .pipe(
        switchMap((dsResult) =>
          this.feasibilityQueryProvider
            .loadInitialQuery()
            .pipe(map((fqResult) => dsResult && fqResult))
        )
      );
  }
}
