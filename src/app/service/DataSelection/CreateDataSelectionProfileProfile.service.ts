import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { concatMap, map, Observable } from 'rxjs';
import { DataSelectionApiService } from '../Backend/Api/DataSelectionApi.service';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from 'src/app/modules/data-selection/services/DataSelectionProfileProvider.service';
import { DataSelectionUIType } from 'src/app/model/Utilities/DataSelectionUIType';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { DisplayDataFactoryService } from '../Factory/DisplayDataFactory.service';
import { Injectable } from '@angular/core';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreateDataSelectionProfileService {
  private referencedProfiles: string[] = [];
  constructor(
    private dataSelectionApiService: DataSelectionApiService,
    private dataSelectionProvider: DataSelectionProfileProviderService,
    private displayDataFactoryService: DisplayDataFactoryService
  ) {}

  public fetchDataSelectionProfileData(
    urls: string[],
    markAsReference: boolean = false,
    loadReferences: boolean = true
  ): Observable<DataSelectionProfileProfile[]> {
    const profilesToFetch: string[] = [];
    for (const url of urls) {
      if (!this.dataSelectionProvider.getDataSelectionProfileByUrl(url)) {
        profilesToFetch.push(url);
      }
    }

    if (profilesToFetch.length === 0) {
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
    return this.dataSelectionApiService.getDataSelectionProfileData(profilesToFetch).pipe(
      map((data: any[]) =>
        data.map((item: any) => {
          const fields = this.mapFields(item.fields);
          const filters = this.createFilters(item.filters);
          return this.instanceOfDataSelectionProfileProfile(item, fields, filters, markAsReference);
        })
      ),
      concatMap((profiles) => {
        profiles.forEach((profile) =>
          this.dataSelectionProvider.setDataSelectionProfileByUrl(profile.getUrl(), profile)
        );

        if (this.referencedProfiles.length > 0 && loadReferences) {
          const uniqueReferencedProfiles = [...new Set(this.referencedProfiles)];
          this.referencedProfiles = [];
          return this.fetchDataSelectionProfileData(uniqueReferencedProfiles, true).pipe(
            map((referencedProfiles) => profiles.concat(referencedProfiles))
          );
        } else {
          return [profiles]; // End recursion
        }
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
  private instanceOfDataSelectionProfileProfile(
    item: any,
    fields: ProfileFields[],
    filters: AbstractProfileFilter[],
    markAsReference: boolean
  ): DataSelectionProfileProfile {
    const dataSelectionProfileProfile: DataSelectionProfileProfile =
      new DataSelectionProfileProfile(
        uuidv4(),
        item.url,
        this.instantiateDisplayData(item.display),
        fields,
        filters,
        new ProfileReference(true, markAsReference)
      );
    return dataSelectionProfileProfile;
  }

  private mapFields(nodes: any[]): ProfileFields[] {
    return nodes?.map((node) => this.mapField(node));
  }

  private mapField(node: any): ProfileFields {
    const children = node.children ? this.mapFields(node.children) : [];
    if (node.referencedProfiles.length > 0 && (node.required || node.recommended)) {
      node.referencedProfiles.map((referencedProfile) =>
        this.referencedProfiles.push(referencedProfile)
      );
    }
    return new ProfileFields(
      node.id,
      this.instantiateDisplayData(node.display),
      this.instantiateDisplayDataForFields(node.description),
      children,
      node.isSelected || node.recommended || node.required || false,
      node.required,
      node.recommended,
      false,
      node.referencedProfiles
    );
  }

  public instantiateDisplayDataForFields(displayData: any): DisplayData {
    return new DisplayData(
      displayData.translations.map(
        (translation) =>
          new Translation(
            translation.language,
            undefined,
            this.checkValuesForTypeString(translation.value)
          )
      ),
      undefined,
      this.checkValuesForTypeString(displayData.original)
    );
  }

  public instantiateDisplayData(displayData: any): DisplayData {
    return new DisplayData(
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
