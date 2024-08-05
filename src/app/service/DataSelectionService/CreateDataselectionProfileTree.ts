import { Injectable } from '@angular/core';
import { DataSelectionProfileTree } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTree';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeRoot } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeRoot';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionProfileTreeService {
  private profileTreeData = {
    id: 'eed4bf5d-954f-44ac-bc8f-8cc75876e8f1',
    name: 'modul-labor',
    display: 'Labor',
    module: 'modul-labor',
    url: 'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ObservationLab',
    selectable: true,
    leaf: false,
    children: [
      {
        id: '01013d0c-5143-4826-8745-96e20ac8c451',
        name: 'ProfileObservationLaboruntersuchung',
        display: 'Profile - Observation - Laboruntersuchung',
        module: 'modul-labor',
        url: 'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ObservationLab',
        leaf: true,
        selectable: true,
        children: [
          {
            id: '01013d0c-5143-4826-8745-96e20ac8c451',
            name: 'ProfileObservationLaboruntersuchung',
            display: 'Profile - Observation - Laboruntersuchung',
            module: 'modul-labor',
            url: 'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ObservationLab',
            leaf: true,
            selectable: true,
            children: [],
          },
          {
            id: '19b09c50-bbc3-4d78-b9b2-76e6e1c69065',
            name: 'ProfileServiceRequestLaboranforderung',
            display: 'Profile - ServiceRequest - Laboranforderung',
            module: 'modul-labor',
            url: 'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ServiceRequestLab',
            leaf: true,
            selectable: true,
            children: [],
          },
          {
            id: 'f09843d3-dc9c-44bc-af00-ec3cfeef2246',
            name: 'ProfileDiagnosticReportLaborbefund',
            display: 'Profile - DiagnosticReport - Laborbefund',
            module: 'modul-labor',
            url: 'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/DiagnosticReportLab',
            leaf: true,
            selectable: true,
            children: [],
          },
        ],
      },
      {
        id: '19b09c50-bbc3-4d78-b9b2-76e6e1c69065',
        name: 'ProfileServiceRequestLaboranforderung',
        display: 'Profile - ServiceRequest - Laboranforderung',
        module: 'modul-labor',
        url: 'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ServiceRequestLab',
        leaf: true,
        selectable: true,
        children: [],
      },
      {
        id: 'f09843d3-dc9c-44bc-af00-ec3cfeef2246',
        name: 'ProfileDiagnosticReportLaborbefund',
        display: 'Profile - DiagnosticReport - Laborbefund',
        module: 'modul-labor',
        url: 'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/DiagnosticReportLab',
        leaf: true,
        selectable: true,
        children: [],
      },
    ],
  };

  public createProfileTree(profileTreeData?: any): DataSelectionProfileTree {
    const rootNode = this.createNode(this.profileTreeData);
    const treeRoot = this.createTreeRoot(this.profileTreeData, rootNode);
    return new DataSelectionProfileTree(treeRoot, [rootNode]);
  }

  private createTreeRoot(
    data: any,
    rootNode: DataSelectionProfileTreeNode
  ): DataSelectionProfileTreeRoot {
    return new DataSelectionProfileTreeRoot(data.name, data.module, data.url, [rootNode]);
  }

  private createNode(data: any): DataSelectionProfileTreeNode {
    const childrenNodes = this.convertChildrenToNodes(data.children);
    return new DataSelectionProfileTreeNode(
      data.id,
      data.name,
      data.display,
      data.module,
      data.url,
      data.leaf,
      data.selectable,
      childrenNodes
    );
  }

  private convertChildrenToNodes(children: any[]): DataSelectionProfileTreeNode[] {
    return children.map((child) => this.createNode(child));
  }
}
