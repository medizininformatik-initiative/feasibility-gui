import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from 'src/app/modules/data-selection/services/DataSelectionProfileProvider.service';
import { DataSelectionUIType } from 'src/app/model/Utilities/DataSelectionUIType';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { v4 as uuidv4 } from 'uuid';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { BackendService } from 'src/app/modules/feasibility-query/service/backend.service';

@Injectable({
  providedIn: 'root',
})
export class CreateDataSelectionProfileService {
  constructor(
    private backend: BackendService,
    private dataSelectionProvider: DataSelectionProfileProviderService
  ) {}

  public fetchDataSelectionProfileData(urls: string[]): Observable<DataSelectionProfileProfile[]> {
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

  private instanceOfDataSelectionProfileProfile(
    item: any,
    fields: ProfileFields[],
    filters: AbstractProfileFilter[]
  ): DataSelectionProfileProfile {
    const dataSelectionProfileProfile: DataSelectionProfileProfile =
      new DataSelectionProfileProfile(
        uuidv4(),
        item.url,
        this.instantiateDisplayData(item.display),
        fields,
        filters
      );
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
      this.instantiateDisplayData(node.display),
      this.instantiateDisplayData(node.description),
      children,
      node.isSelected || false,
      node.isRequired || false
    );
  }

  private instantiateDisplayData(data: any) {
    return new DisplayData(
      data.original,
      data.translations?.map(
        (translation) => new Translation(translation.language, translation.value)
      )
    );
  }
}
