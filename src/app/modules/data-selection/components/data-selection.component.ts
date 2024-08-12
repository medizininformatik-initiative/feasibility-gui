import { Component, OnInit } from '@angular/core';
import { CreateDataSelectionProfileProfile } from 'src/app/service/DataSelectionService/CreateDataSelectionProfileProfile.service';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelectionService/CreateDataselectionProfileTree';
import { EditDataSelectionFields } from 'src/app/service/DataSelectionService/EditDataSelectionFields.service';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { DataSelectionProviderService } from '../services/DataSelectionProviderService';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  tree: TreeNode;

  selectedDataSelectionProfileNodeIds: Set<string> = new Set();

  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileProfile,
    private dataSelectionProfileTreeService: DataSelectionProfileTreeService,
    private dataSelectionModalService: EditDataSelectionFields,
    private dataSelectionProfileProvider: DataSelectionProviderService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProfileTreeService.createProfileTree().subscribe((tree) => {
      this.tree = DataSelectionTreeAdapter.fromTree(tree.getTreeNode());
    });
  }

  public getDataSelectionProfileData() {
    this.createDataSelectionProfileService.getDataSelectionProfileProfileData().subscribe();
  }

  public addItemsToStage(node: TreeNode) {
    const nodeId: string = node.id;
    if (this.selectedDataSelectionProfileNodeIds.has(nodeId)) {
      this.selectedDataSelectionProfileNodeIds.delete(nodeId);
    } else {
      this.selectedDataSelectionProfileNodeIds.add(nodeId);
    }
  }

  public openDataSelectionModal() {
    this.createDataSelectionProfileService
      .getDataSelectionProfileProfileData()
      .subscribe((dataSelectionProfile) => {
        const profile = this.dataSelectionProfileProvider.getDataSelectionProfileByUID(
          'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ObservationLab'
        );
        this.dataSelectionModalService.editCriterionAttribute(profile.getFields());
      });
  }
}
