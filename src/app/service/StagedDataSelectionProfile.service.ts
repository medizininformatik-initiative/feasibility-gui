import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { ActiveDataSelectionService } from './Provider/ActiveDataSelection.service';
import { CreateSelectedReferenceService } from './CreateSelectedReference.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProfileCloner } from '../model/Utilities/DataSelecionCloner/DataSelectionProfileCloner';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { StagedReferenceFieldProviderService } from './Provider/StagedReferenceFieldProvider.service';
import { SelectedReferenceField } from '../model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';

@Injectable({
  providedIn: 'root',
})
export class StagedProfileService {
  private stagedProfileSubject = new BehaviorSubject<DataSelectionProfile | null>(null);
  public readonly profile$ = this.stagedProfileSubject.asObservable();

  constructor(
    private activeDataSelectionService: ActiveDataSelectionService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private createSelectedReferenceService: CreateSelectedReferenceService,
    private profileProviderService: ProfileProviderService,
    private stagedReferenceFieldProviderService: StagedReferenceFieldProviderService
  ) {}

  public initialize(profile: DataSelectionProfile): void {
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

  private getStagedSelectedReferenceFields(): Observable<DataSelectionProfile> {
    const profile = this.stagedProfileSubject.value;
    if (!profile) {
      return of();
    }

    return this.createSelectedReferenceService.getSelectedReferenceFields(profile).pipe(
      tap((selectedReferenceFields) => {
        const existingFields = profile.getProfileFields().getSelectedReferenceFields();
        const mergedFields = [...existingFields, ...selectedReferenceFields];
        profile.getProfileFields().setSelectedReferenceFields(mergedFields);
        this.stagedReferenceFieldProviderService.clearAll();
      }),
      map(() => profile)
    );
  }

  public buildProfile(): Observable<DataSelectionProfile | null> {
    const profile = this.stagedProfileSubject.value;
    if (!profile) {
      console.warn('No profile is staged. Please stage a profile before building.');
      return of(null);
    }
    const referencesExist = this.stagedReferenceFieldProviderService
      .getStagegdReferenceProfileUrlsMapValue()
      .get(profile.getId());

    if (referencesExist) {
      return this.getStagedSelectedReferenceFields().pipe(
        tap((finalizedProfile) => {
          this.triggerUpdate(profile);
          this.setProvider(finalizedProfile);
        }),
        map(() => profile)
      );
    } else {
      this.setProvider(profile);
      return of(profile);
    }
  }

  private triggerUpdate(profile: DataSelectionProfile): void {
    this.stagedProfileSubject.next(DataSelectionProfileCloner.deepCopyProfile(profile));
  }

  /**
   * @todo refactor this method
   * @param profile
   */
  private setProvider(profile: DataSelectionProfile): void {
    console.log('provdier', profile);
    this.profileProviderService.setProfileById(profile.getId(), profile);
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProviderService.removeProfileFromDataSelection(
      dataSelectionId,
      profile.getId()
    );
    this.dataSelectionProviderService.setProfileInDataSelection(dataSelectionId, profile);
  }
}
