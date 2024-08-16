import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProfileFilter } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileFilter';
import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProviderService';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateDataSelectionProfileProfile {
  constructor(
    private backend: BackendService,
    private dataSelectionProvider: DataSelectionProviderService
  ) {}

  public getDataSelectionProfileProfileData(
    urls: string[]
  ): Observable<DataSelectionProfileProfile[]> {
    urls = [
      'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ObservationLab',
    ];
    return this.backend.getDataSelectionProfileData(urls).pipe(
      map((data: any[]) =>
        data.map((item: any) => {
          const fields = this.mapNodes(item.fields);
          const filters = item.filters.map(
            (filter: any) =>
              new DataSelectionProfileProfileFilter(
                filter.type,
                filter.name,
                filter.ui_type,
                filter.referencedCriteriaSet || ''
              )
          );
          const dataSelectionProfileProfile: DataSelectionProfileProfile =
            new DataSelectionProfileProfile(item.url, item.display, fields, filters);
          this.dataSelectionProvider.setDataSelectionProfileByUID(
            dataSelectionProfileProfile.getUrl(),
            dataSelectionProfileProfile
          );
          return dataSelectionProfileProfile;
        })
      )
    );
  }

  private mapNodes(nodes: any[]): DataSelectionProfileProfileNode[] {
    return nodes.map((node) => this.mapNode(node));
  }

  private mapNode(node: any): DataSelectionProfileProfileNode {
    const children = node.children ? this.mapNodes(node.children) : [];

    return new DataSelectionProfileProfileNode(
      node.id,
      node.display,
      node.name,
      children,
      node.isSelected || false,
      node.isRequired || false
    );
  }
}
