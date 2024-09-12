import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CreateCRDTL } from 'src/app/service/Translator/CRTDL/CreateCRDTL.service';
import { CreateDataSelectionProfileProfile } from 'src/app/service/DataSelectionService/CreateDataSelectionProfileProfile.service';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelectionService/CreateDataselectionProfileTree';
import { DataSelectionProviderService } from '../services/DataSelectionProvider.service';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { FileSaverService } from 'ngx-filesaver';
import { Subscription } from 'rxjs';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { TreeComponent } from 'src/app/shared/components/tree/tree.component';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

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
    private createDataSelectionProfileService: CreateDataSelectionProfileProfile,
    private dataSelectionProfileTreeService: DataSelectionProfileTreeService,
    private crdtlService: CreateCRDTL,
    private dataSelectionProviderService: DataSelectionProviderService,
    private fileSaverService: FileSaverService,
    private test1: TerminologySystemProvider,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProfileTreeService.createProfileTree().subscribe((tree) => {
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
      .getDataSelectionProfileProfileData(dataSelectionProfileUrls)
      .subscribe((dataSelectionProfiles) => {
        dataSelectionProfiles.forEach((dataSelectionProfile) => {
          const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionID();
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

  startTranslation() {
    this.crdtlService
      .createCRDTL()
      .subscribe((crdtl) => {
        const crdtlString = JSON.stringify(crdtl);
        const fileData = new Blob([crdtlString], { type: 'text/plain;charset=utf-8' });
        this.fileSaverService.save(fileData, 'crdtl.json');
      })
      .unsubscribe();
  }
}
