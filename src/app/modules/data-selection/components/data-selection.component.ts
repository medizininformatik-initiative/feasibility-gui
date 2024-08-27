import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CreateCRDTL } from 'src/app/service/Translator/CRTDL/CreateCRDTL.service';
import { CreateDataSelectionProfileProfile } from 'src/app/service/DataSelectionService/CreateDataSelectionProfileProfile.service';
import { DataSelection2DataExtraction } from 'src/app/service/Translator/CRTDL/DataSelection2DataExtraction.service';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelectionService/CreateDataselectionProfileTree';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { DataSelectionProviderService } from '../services/DataSelectionProvider.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { TreeComponent } from 'src/app/shared/components/tree/tree.component';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit, AfterViewInit {
  @ViewChildren(TreeComponent) numTrees!: QueryList<TreeComponent>;

  trees: TreeNode[];

  selectedDataSelectionProfileNodeIds: Set<string> = new Set();

  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileProfile,
    private dataSelectionProfileTreeService: DataSelectionProfileTreeService,
    private crdtlService: CreateCRDTL,
    private dataSelectionProviderService: DataSelectionProviderService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProfileTreeService.createProfileTree().subscribe((tree) => {
      this.trees = DataSelectionTreeAdapter.fromTree(tree.getTreeNode());
    });
  }

  ngAfterViewInit() {
    console.log(this.numTrees);
  }

  public getDataSelectionProfileData() {
    const dataSelectionProfileUrls = Array.from(this.selectedDataSelectionProfileNodeIds);
    this.createDataSelectionProfileService
      .getDataSelectionProfileProfileData(dataSelectionProfileUrls)
      .subscribe((dataSelectionProfiles) => {
        this.dataSelectionProviderService.setDataSelectionByUID(
          '1',
          new DataSelection(dataSelectionProfiles)
        );
      });
  }

  public addItemsToStage(node: TreeNode) {
    const originalEntry: DataSelectionProfileTreeNode =
      node.originalEntry as DataSelectionProfileTreeNode;
    if (this.selectedDataSelectionProfileNodeIds.has(originalEntry.url)) {
      this.selectedDataSelectionProfileNodeIds.delete(originalEntry.url);
    } else {
      this.selectedDataSelectionProfileNodeIds.add(originalEntry.url);
    }
  }

  startTranslation() {
    this.crdtlService.createCRDTL().subscribe((test) => console.log(test));
  }
}
