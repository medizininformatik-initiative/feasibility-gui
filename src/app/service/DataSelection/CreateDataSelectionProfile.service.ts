import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { concatMap, map, Observable } from 'rxjs';
import { DataSelectionApiService } from '../Backend/Api/DataSelectionApi.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionUIType } from 'src/app/model/Utilities/DataSelectionUIType';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { DisplayDataFactoryService } from '../Factory/DisplayDataFactory.service';
import { Injectable } from '@angular/core';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { v4 as uuidv4 } from 'uuid';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { BasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/BasicField';
import { ProfileFieldTypes } from 'src/app/model/Utilities/ProfileFieldTypes';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/FieldTreeAdapter';
import { ReferencedProfile } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferencedProfile';

@Injectable({
  providedIn: 'root',
})
export class CreateDataSelectionProfileService {
  private selectedBasicFields: SelectedBasicField[] = [];
  private selectedReferenceFields: SelectedReferenceField[] = [];
  constructor(
    private dataSelectionApiService: DataSelectionApiService,
    private profileProvider: ProfileProviderService
  ) {}

  public fetchDataSelectionProfileData(
    urls: string[],
    markAsReference: boolean = false
  ): Observable<DataSelectionProfile[]> {
    return this.dataSelectionApiService.getDataSelectionProfileData(urls).pipe(
      map((data: any[]) =>
        data.map((item: any) => {
          const filters = this.createFilters(item.filters);
          const referenceFields = item.references;
          const test = this.mapAndConstructProfileRefrenceFields(referenceFields);
          const profileFields = this.mapAndConstructProfileFields(item.fields, test);
          const profile = this.instanceOfDataSelectionProfile(
            item,
            profileFields,
            filters,
            markAsReference
          );
          this.selectedBasicFields = [];
          this.selectedReferenceFields = [];
          return profile;
        })
      ),
      concatMap((profiles) => {
        profiles.forEach((profile) => this.profileProvider.setProfileById(profile.getId(), profile));
        return [profiles];
      })
    );
  }

  private createFilters(filters: any): AbstractProfileFilter[] {
    const profileFilters = filters?.map((filter: any) => {
      switch (filter.ui_type) {
        case DataSelectionUIType.TIMERESTRICTION:
          return this.createProfileTimeRestrictionFilter(filter);
        case DataSelectionUIType.CODE:
          return new ProfileTokenFilter(uuidv4(), filter.name, filter.type, filter.valueSetUrls, []);
      }
    });
    return profileFilters;
  }

  private createProfileTimeRestrictionFilter(filter: any): ProfileTimeRestrictionFilter {
    return new ProfileTimeRestrictionFilter(filter.name, filter.type, new BetweenFilter(null, null));
  }

  /**
   * @todo use ids from Onto files
   * @param item
   * @param fields
   * @param filters
   * @param markAsReference
   * @returns
   */
  private instanceOfDataSelectionProfile(
    item: any,
    fields: ProfileFields,
    filters: AbstractProfileFilter[],
    markAsReference: boolean
  ): DataSelectionProfile {
    const displayInstance = this.instantiateDisplayData(item.display);
    const dataSelectionProfileProfile: DataSelectionProfile = new DataSelectionProfile(
      uuidv4(),
      item.url,
      displayInstance,
      fields,
      filters,
      new ProfileReference(true, markAsReference),
      displayInstance
    );
    return dataSelectionProfileProfile;
  }

  private mapAndConstructProfileFields(node: any, referenceField: ReferenceField[]): ProfileFields {
    const fields: BasicField[] = [];
    this.traverseAndMapFields(node, fields);
    return this.constructProfileFields(fields, referenceField);
  }

  private traverseAndMapFields(node: any, fields: BasicField[]): void {
    node.map((nodeEntry) => {
      fields.push(this.mapField(nodeEntry));
    });
  }

  private mapField(node: any): BasicField {
    const children = node.children ? node.children.map((child) => this.mapField(child)) : [];
    const display = this.instantiateDisplayData(node?.display);
    const description = this.instantiateDisplayData(node?.description);
    const isRequiredOrRecommended: boolean = node.required || node.recommended;
    const basicField = new BasicField(
      node.id,
      display,
      description,
      children as BasicField[],
      node.recommended,
      isRequiredOrRecommended,
      node.required,
      node.type
    );
    if (isRequiredOrRecommended) {
      this.selectedBasicFields.push(new SelectedBasicField(basicField, false));
    }
    return basicField;
  }

  private constructProfileFields(
    basicFields: BasicField[],
    referenceFields: ReferenceField[]
  ): ProfileFields {
    const profileFields = new ProfileFields(
      uuidv4(),
      basicFields.length > 0 ? basicFields : [],
      referenceFields.length > 0 ? referenceFields : [],
      this.selectedBasicFields,
      this.selectedReferenceFields
    );
    return profileFields;
  }

  public instantiateDisplayData(displayData: any): Display {
    return new Display(
      displayData.translations.map(
        (translation) =>
          new Translation(translation.language, translation.value ? translation.value : undefined)
      ),
      displayData.original
    );
  }

  public checkValuesForTypeString(value: string | string[]): string[] {
    if (typeof value == 'string') {
      if (value.length > 0) {
        return [value];
      } else {
        return [];
      }
    } else {
      return value;
    }
  }

  private mapAndConstructProfileRefrenceFields(referenceFields: any[]): ReferenceField[] {
    const insatnces = referenceFields.map((field) => new ReferenceField(
        field.id,
        this.instantiateDisplayData(field.display),
        this.instantiateDisplayData(field.description),
        field.required,
        field.recommended,
        this.mapAndConstructRefrencedProfiles(field.referencedProfiles) || []
      ));
    return insatnces;
  }

  private mapAndConstructRefrencedProfiles(refrencedProfiles: any[]): ReferencedProfile[] {
    return refrencedProfiles.map(
      (referencedProfile) =>
        new ReferencedProfile(
          referencedProfile.url,
          this.instantiateDisplayData(referencedProfile.display),
          this.instantiateDisplayData(referencedProfile.fields)
        )
    );
  }
}
