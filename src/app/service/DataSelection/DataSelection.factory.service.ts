import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionMainProfileInitializerService } from '../DataSelectionMainProfileInitializerService';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
/**
 * Factory service to create a `DataSelection` instance.
 * Creates a new selection, sets the provider, and attaches the main profile.
 */
export class DataSelectionFactoryService {
  constructor(
    private dataSelectionProviderService: DataSelectionProviderService,
    private dataSelectionMainProfileInitializerService: DataSelectionMainProfileInitializerService
  ) {}

  public instantiate(): Observable<DataSelection> {
    const dataSelection = this.createEmptyDataSelection();
    this.setDataSelectionProvider(dataSelection);

    return this.loadMainProfile().pipe(
      map((mainProfile) => this.setProfileInDataSelection(dataSelection, mainProfile))
    );
  }

  private createEmptyDataSelection(): DataSelection {
    return new DataSelection([], uuidv4());
  }

  private setDataSelectionProvider(dataSelection: DataSelection): void {
    this.dataSelectionProviderService.setDataSelectionByUID(
      dataSelection.getId(),
      dataSelection,
      true
    );
  }

  private loadMainProfile() {
    return this.dataSelectionMainProfileInitializerService.initializePatientProfile().pipe(take(1));
  }

  private setProfileInDataSelection(dataSelection: DataSelection, mainProfile: any): DataSelection {
    dataSelection.setProfiles([mainProfile]);
    return dataSelection;
  }
}
