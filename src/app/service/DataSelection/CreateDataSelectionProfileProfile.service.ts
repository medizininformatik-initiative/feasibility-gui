import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from 'src/app/modules/data-selection/services/DataSelectionProfileProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileCodeFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CreateDataSelectionProfileProfile {
  constructor(
    private backend: BackendService,
    private dataSelectionProvider: DataSelectionProfileProviderService
  ) {}

  public getDataSelectionProfileProfileData(
    urls: string[]
  ): Observable<DataSelectionProfileProfile[]> {
    const commaSeparatedIds: string = urls.join(',');
    return this.backend.getDataSelectionProfileData(commaSeparatedIds).pipe(
      map((data: any[]) =>
        data.map((item: any) => {
          const fields = this.mapNodes(item.fields);
          const filters = this.createFilters(item.filters);
          return this.instanceOfDataSelectionProfileProfile(item, fields, filters);
        })
      )
    );
  }

  private createFilters(filters: any): AbstractProfileFilter[] {
    const profileFilters = filters?.map((filter: any) => {
      switch (filter.ui_type) {
        case DataSelectionFilterTypes.TIMERESTRICTION:
          return this.createProfileTimeRestrictionFilter(filter);
        case DataSelectionFilterTypes.CODE:
          return new ProfileCodeFilter(filter.name, filter.type, filter.valueSetUrls, []);
      }
    });
    return profileFilters;
  }

  private createProfileTimeRestrictionFilter(filter: any): ProfileTimeRestrictionFilter {
    return new ProfileTimeRestrictionFilter(filter.name, filter.type, new BetweenFilter(null, null));
  }

  private instanceOfDataSelectionProfileProfile(
    item: any,
    fields: ProfileFields[],
    filters: AbstractProfileFilter[]
  ): DataSelectionProfileProfile {
    const dataSelectionProfileProfile: DataSelectionProfileProfile =
      new DataSelectionProfileProfile(uuidv4(), item.url, item.display, fields, filters);
    this.dataSelectionProvider.setDataSelectionProfileByUID(
      dataSelectionProfileProfile.getId(),
      dataSelectionProfileProfile
    );
    return dataSelectionProfileProfile;
  }

  private mapNodes(nodes: any[]): ProfileFields[] {
    return nodes?.map((node) => this.mapNode(node));
  }

  private mapNode(node: any): ProfileFields {
    const children = node.children ? this.mapNodes(node.children) : [];

    return new ProfileFields(
      node.id,
      node.display,
      node.name,
      children,
      node.isSelected || false,
      node.isRequired || false
    );
  }
}