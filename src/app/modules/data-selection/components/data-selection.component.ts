import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CreateCRDTL } from 'src/app/service/Translator/CRTDL/CreateCRDTL.service';
import { CreateDataSelectionProfileProfile } from 'src/app/service/DataSelectionService/CreateDataSelectionProfileProfile.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelectionService/CreateDataselectionProfileTree';
import { DataSelectionProviderService } from '../services/DataSelectionProvider.service';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { TreeComponent } from 'src/app/shared/components/tree/tree.component';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { FileSaverService } from 'ngx-filesaver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(TreeComponent) numTrees!: QueryList<TreeComponent>;

  trees: TreeNode[];

  subscription: Subscription;

  selectedDataSelectionProfileNodeIds: Set<string> = new Set();

  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileProfile,
    private dataSelectionProfileTreeService: DataSelectionProfileTreeService,
    private crdtlService: CreateCRDTL,
    private dataSelectionProviderService: DataSelectionProviderService,
    private terminologyCodeSystemTranslator: TerminologySystemProvider,
    private fileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProfileTreeService.createProfileTree().subscribe((tree) => {
      this.trees = DataSelectionTreeAdapter.fromTree(tree.getTreeNode());
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.subscription = this.crdtlService.createCRDTL().subscribe((crdtl) => {
      const crdtlString = JSON.stringify(crdtl);
      const fileData = new Blob([crdtlString], { type: 'text/plain;charset=utf-8' });
      this.fileSaverService.save(fileData, 'crdtl.json');
    });
  }
}
