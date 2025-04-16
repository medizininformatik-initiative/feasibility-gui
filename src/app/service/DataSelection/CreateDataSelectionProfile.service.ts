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
    markAsReference: boolean = false,
    loadReferences: boolean = true
  ): Observable<DataSelectionProfile[]> {
    if (urls.length === 0) {
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
    return this.dataSelectionApiService.getDataSelectionProfileData(urls).pipe(
      map((data: any[]) =>
        data.map((item: any) => {
          const filters = this.createFilters(item.filters);
          const profileFields = this.mapAndConstructProfileFields(item.fields);
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
        console.log('Fetched profiles:', profiles);
        profiles.forEach((profile) => this.profileProvider.setProfileById(profile.getId(), profile));
        this.profileProvider
          .getProfileIdMap()
          .subscribe((profileMap) => console.log('Profile Map:', profileMap));

        /*         if (this.referencedProfiles.length > 0 && loadReferences) {
          const uniqueReferencedProfiles = [...new Set(this.referencedProfiles)];
          this.referencedProfiles = [];
          return this.fetchDataSelectionProfileData(uniqueReferencedProfiles, true).pipe(
            map((referencedProfiles) => profiles.concat(referencedProfiles))
          );
        } else {
          return [profiles]; // End recursion
        } */
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
    const dataSelectionProfileProfile: DataSelectionProfile = new DataSelectionProfile(
      uuidv4(),
      item.url,
      this.instantiateDisplayData(item.display),
      fields,
      filters,
      new ProfileReference(true, markAsReference)
    );
    return dataSelectionProfileProfile;
  }

  private mapAndConstructProfileFields(node: any): ProfileFields {
    const fields: (BasicField | ReferenceField)[] = [];
    this.traverseAndMapFields(node, fields);
    return this.constructProfileFields(fields);
  }

  private traverseAndMapFields(node: any, fields: (BasicField | ReferenceField)[]): void {
    node.map((nodeEntry) => {
      fields.push(this.mapField(nodeEntry));
    });
  }

  private mapField(node: any): BasicField | ReferenceField {
    const children = node.children ? node.children.map((child) => this.mapField(child)) : [];
    const display = this.instantiateDisplayData(node?.display);
    const description = this.instantiateDisplayData(node?.description);
    const isRequiredOrRecommended: boolean = node.required || node.recommended;
    if (node.type === ProfileFieldTypes.reference) {
      return new ReferenceField(
        node.id,
        display,
        description,
        node.required,
        node.recommended,
        node.referencedProfiles || []
      );
    } else {
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
  }

  private constructProfileFields(fields: (BasicField | ReferenceField)[]): ProfileFields {
    const basicFields: BasicField[] = [];
    const referenceFields: ReferenceField[] = [];

    const processField = (field: BasicField | ReferenceField): void => {
      if (field instanceof ReferenceField) {
        if (!referenceFields.includes(field)) {
          referenceFields.push(field);
        }
      } else if (field instanceof BasicField) {
        const filteredChildren: BasicField[] = [];
        field.getChildren().forEach((child) => {
          if (child instanceof ReferenceField) {
            referenceFields.push(child);
          } else {
            filteredChildren.push(child);
          }
          processField(child);
        });
        field.setChildren(filteredChildren);
        basicFields.push(field);
      }
    };

    // Process each field in the top-level array
    fields.forEach((field) => processField(field));

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
          new Translation(
            translation.language,
            translation.value.length > 0 ? translation.value : undefined
          )
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
}
