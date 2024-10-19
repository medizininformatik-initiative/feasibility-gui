import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfileProfile.service';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelection/CreateDataselectionProfileTree';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { DownloadCRDTLService } from 'src/app/service/Download/DownloadCRDTL.service';
import { SelectedDataSelectionProfileService } from 'src/app/service/DataSelection/SelectedDataSelectionProfile.service';
import { map, Observable, Subscription, take } from 'rxjs';
import { TreeComponent } from 'src/app/shared/components/tree/tree.component';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import {DataSelectionProviderService} from "../../services/DataSelectionProvider.service";

@Component({
  selector: 'num-display-searchtree',
  templateUrl: './display-searchtree.component.html',
  styleUrls: ['./display-searchtree.component.scss'],
})
export class DisplaySearchtreeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(TreeComponent) numTrees!: QueryList<TreeComponent>;
  @Input() showActionBar;
  @Output() scrollClick = new EventEmitter();
  trees: TreeNode[];

  crdtlSubscription: Subscription;

  dataSelectionProfileSubscription: Subscription;

  selectedDataSelectionProfileUrls: Set<string> = new Set();

  $dataSelectionProfileArray: Observable<DataSelectionProfileProfile[]>;

  $dataSelectionProfileTreeNodeArray: Observable<DataSelectionProfileTreeNode[]>;

  downloadDisabled = true;

  /**
   * @todo     private test1: TerminologySystemProvider, --> TerminologySystemProvider needs to be initial called in the app.moudle.ts
   */
  constructor(
    public elementRef: ElementRef,
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private dataSelectionProfileTreeService: DataSelectionProfileTreeService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private selectedDataSelectionProfileService: SelectedDataSelectionProfileService
  ) {}

  ngOnInit(): void {
    this.$dataSelectionProfileArray = this.dataSelectionProviderService
      .getActiveDataSelection()
      .pipe(map((dataSelection) => dataSelection.getProfiles()));
    this.$dataSelectionProfileTreeNodeArray =
      this.selectedDataSelectionProfileService.getSelectedProfiles();

    this.handleSelectedItemsSubscription();
    this.dataSelectionProfileTreeService.fetchProfileTree().subscribe((tree) => {
      this.trees = DataSelectionTreeAdapter.fromTree(tree.getTreeNode());
    });
  }

  ngOnDestroy() {
    this.crdtlSubscription?.unsubscribe();
    this.dataSelectionProfileSubscription?.unsubscribe();
  }

  ngAfterViewInit() {}

  private handleSelectedItemsSubscription(): void {
    this.selectedDataSelectionProfileService
      .getSelectedProfiles()
      .subscribe((selectedItems: DataSelectionProfileTreeNode[]) => {
        if (selectedItems.length === 0) {
          this.uncheckAllRows();
        }
      });
  }

  private uncheckAllRows(): void {
    if (this.trees && this.trees.length > 0) {
      this.trees.forEach((item) => {
        this.uncheckRowAndChildren(item);
      });
    }
  }

  /**
   * Recursively unchecks the given row and its children.
   *
   * @param item The tree node to be unchecked.
   */
  private uncheckRowAndChildren(item: any): void {
    this.uncheckRow(item);
    if (item.children && item.children.length > 0) {
      item.children.forEach((child: any) => {
        this.uncheckRowAndChildren(child);
      });
    }
  }

  private uncheckRow(item: any): void {
    item.data.isCheckboxSelected = false;
  }

  public getDataSelectionProfileData() {
    const dataSelectionProfileUrls = Array.from(this.selectedDataSelectionProfileUrls);
    this.dataSelectionProfileSubscription = this.createDataSelectionProfileService
      .fetchDataSelectionProfileData(dataSelectionProfileUrls)
      .subscribe((dataSelectionProfiles) => {
        this.selectedDataSelectionProfileUrls.clear();
        this.selectedDataSelectionProfileService.clearSelection();
        dataSelectionProfiles.forEach((dataSelectionProfile) => {
          const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
          this.dataSelectionProviderService.setProfileInDataSelection(
            dataSelectionId,
            dataSelectionProfile
          );
          this.downloadDisabled = false;
        });
      });
  }

  public addItemsToStage(node: TreeNode) {
    const originalEntry = node.originalEntry as DataSelectionProfileTreeNode;
    this.selectedDataSelectionProfileUrls.add(originalEntry.getUrl());

    const selectedIds = this.selectedDataSelectionProfileService.getSelectedIds();
    const originalEntryId = node.originalEntry.id;
    if (selectedIds.includes(originalEntryId)) {
      this.selectedDataSelectionProfileUrls.delete(originalEntry.getUrl());
      this.selectedDataSelectionProfileService.removeFromSelection(originalEntry);
    } else {
      this.selectedDataSelectionProfileService.addToSelection(originalEntry);
    }
  }

  scroll() {
    this.showActionBar = false;
    this.scrollClick.emit(false);
  }
}
