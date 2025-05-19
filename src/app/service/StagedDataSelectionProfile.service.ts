import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { ActiveDataSelectionService } from './Provider/ActiveDataSelection.service';
import { BehaviorSubject, filter, map, Observable, of, take, tap } from 'rxjs';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProfileCloner } from '../model/Utilities/DataSelecionCloner/DataSelectionProfileCloner';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';
import { Injectable } from '@angular/core';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { SelectedReferenceField } from '../model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { PossibleReferencesService } from './PossibleReferences.service';
import { DataSelection2DataExtraction } from './Translator/CRTDL/DataSelection2DataExtraction.service';
import { ObjectHelper } from '../modules/feasibility-query/controller/ObjectHelper';

@Injectable({
  providedIn: 'root',
})
export class StagedProfileService {
  private stagedProfileSubject = new BehaviorSubject<DataSelectionProfile | null>(null);
  public readonly profile$ = this.stagedProfileSubject.asObservable();

  constructor(
    private activeDataSelectionService: ActiveDataSelectionService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private profileProviderService: ProfileProviderService,
    private possibleReferencesService: PossibleReferencesService,
    private dataSelection2DataExtractionService: DataSelection2DataExtraction
  ) {}

  public initialize(id: string): void {
    const profile = this.profileProviderService.getProfileById(id);
    const copy = DataSelectionProfileCloner.deepCopyProfile(profile);
    this.stagedProfileSubject.next(copy);
  }

  public getProfileObservable(): Observable<DataSelectionProfile | null> {
    return this.stagedProfileSubject.asObservable();
  }

  public getStagedProfile(): DataSelectionProfile | null {
    return this.stagedProfileSubject.value;
  }

  public updateSelectedBasicFields(selectedBasicFields: SelectedBasicField[]): void {
    const profile = this.stagedProfileSubject.value;
    if (profile) {
      profile.getProfileFields().setSelectedBasicFields(selectedBasicFields);
      this.triggerUpdate(profile);
    }
  }

  public updateFilters(filters: AbstractProfileFilter[]): void {
    const profile = this.stagedProfileSubject.value;
    if (profile) {
      profile.setFilters(filters);
      this.triggerUpdate(profile);
    }
  }

  public updateSelectedReferenceFields(selectedReferenceFields: SelectedReferenceField[]): void {
    const profile = this.stagedProfileSubject.value;
    if (profile) {
      profile.getProfileFields().setSelectedReferenceFields(selectedReferenceFields);
      this.triggerUpdate(profile);
    }
  }

  public updateLabel(label: string): void {
    const profile = this.stagedProfileSubject.value;
    if (profile) {
      profile.setLabel(label);
      this.triggerUpdate(profile);
    }
  }
  private setLinkedProfillesInDataSelectionProvdier(): Observable<void[]> {
    const profile = this.stagedProfileSubject.value;

    if (profile) {
      const selectedReferenceFields = [...profile.getProfileFields().getSelectedReferenceFields()];
      const linkedProfileIds = this.getReferencedProfileIds(selectedReferenceFields);
      return this.getProfilesFromProviderAndSetInDataSelection(linkedProfileIds);
    }
  }

  private getProfilesFromProviderAndSetInDataSelection(
    linkedProfileIds: string[]
  ): Observable<void[]> {
    return this.profileProviderService.getProfileIdMap().pipe(
      map((profileMap) =>
        linkedProfileIds.map((id) => {
          const profile = profileMap.get(id);
          if (profile) {
            return this.setProfileInDataSelection(profile);
          }
        })
      )
    );
  }

  private getReferencedProfileIds(selectedReferenceFields: SelectedReferenceField[]): string[] {
    const linkedProfileIds = selectedReferenceFields
      .map((selectedReferenceField) => selectedReferenceField.getLinkedProfileIds())
      .reduce((acc, ids) => acc.concat(ids), []);
    return linkedProfileIds;
  }

  public buildProfile(): Observable<void[]> {
    const profile = this.stagedProfileSubject.value;
    this.triggerUpdate(profile);
    this.profileProviderService.setProfileById(profile.getId(), profile);
    this.setProfileInDataSelection(profile);
    return this.setLinkedProfillesInDataSelectionProvdier();
  }

  private triggerUpdate(profile: DataSelectionProfile): void {
    this.stagedProfileSubject.next(DataSelectionProfileCloner.deepCopyProfile(profile));
  }

  private setProfileInDataSelection(profile: DataSelectionProfile): void {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProviderService.setProfileInDataSelection(dataSelectionId, profile);
  }
}
