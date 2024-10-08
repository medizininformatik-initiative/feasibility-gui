import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelection/CreateDataselectionProfileTree';
import { DataSelectionProviderService } from '../services/DataSelectionProvider.service';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { Subscription } from 'rxjs';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { TreeComponent } from 'src/app/shared/components/tree/tree.component';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { DownloadCRDTLService } from 'src/app/service/Download/DownloadCRDTL.service';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfileProfile.service';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(TreeComponent) numTrees!: QueryList<TreeComponent>;

  trees: TreeNode[];

  crdtlSubscription: Subscription;

  dataSelectionProfileSubscription: Subscription;

  selectedDataSelectionProfileNodeIds: Set<string> = new Set();

  /**
   *
   * @param createDataSelectionProfileService
   * @param dataSelectionProfileTreeService
   * @param crdtlService
   * @param dataSelectionProviderService
   * @param fileSaverService
   * @param test1
   * @param activeDataSelectionService
   *
   * @todo     private test1: TerminologySystemProvider, --> TerminologySystemProvider needs to be initial called in the app.moudle.ts
   */
  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private dataSelectionProfileTreeService: DataSelectionProfileTreeService,
    private downloadCRDTLService: DownloadCRDTLService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private test1: TerminologySystemProvider,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProfileTreeService.fetchProfileTree().subscribe((tree) => {
      this.trees = DataSelectionTreeAdapter.fromTree(tree.getTreeNode());
    });
  }

  ngOnDestroy() {
    if (this.crdtlSubscription) {
      this.crdtlSubscription.unsubscribe();
    }
    if (this.dataSelectionProfileSubscription) {
      this.dataSelectionProfileSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {}

  public getDataSelectionProfileData() {
    const dataSelectionProfileUrls = Array.from(this.selectedDataSelectionProfileNodeIds);
    this.dataSelectionProfileSubscription = this.createDataSelectionProfileService
      .fetchDataSelectionProfileData(dataSelectionProfileUrls)
      .subscribe((dataSelectionProfiles) => {
        dataSelectionProfiles.forEach((dataSelectionProfile) => {
          const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
          this.dataSelectionProviderService.setProfileInDataSelection(
            dataSelectionId,
            dataSelectionProfile
          );
        });
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

  public downloadCRDTL() {
    this.downloadCRDTLService.downloadActiveFeasibilityQueryAsFile();
  }
}
