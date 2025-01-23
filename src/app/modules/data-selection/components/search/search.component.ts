import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  Input,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfileProfile.service';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelection/CreateDataselectionProfileTree';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { SelectedDataSelectionProfileService } from 'src/app/service/DataSelection/SelectedDataSelectionProfile.service';
import { map, Observable, Subscription, take } from 'rxjs';
import { TreeComponent } from 'src/app/shared/components/tree/tree.component';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProviderService } from '../../services/DataSelectionProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';

@Component({
  selector: 'num-search-data-selection',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchDataSelectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(TreeComponent) numTrees!: QueryList<TreeComponent>;
  @Input() showActionBar;
  @Output() scrollClick = new EventEmitter();
  trees: TreeNode[];

  crdtlSubscription: Subscription;

  dataSelectionProfileSubscription: Subscription;

  dataSelectionProfileTreeSubscription: Subscription;

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
    private selectedDataSelectionProfileService: SelectedDataSelectionProfileService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit(): void {
    this.$dataSelectionProfileArray = this.dataSelectionProviderService
      .getActiveDataSelection()
      .pipe(map((dataSelection) => dataSelection.getProfiles()));
    this.$dataSelectionProfileTreeNodeArray =
      this.selectedDataSelectionProfileService.getSelectedProfiles();

    this.handleSelectedItemsSubscription();
    this.dataSelectionProfileTreeSubscription = this.dataSelectionProfileTreeService
      .fetchProfileTree()
      .subscribe((tree) => {
        const treeNodes = tree.getTreeNode();
        treeNodes.forEach((node) => this.updateSelectionStatus(node));
        const rootNode = DataSelectionTreeAdapter.fromTree(tree.getTreeNode());
        this.trees = rootNode;
      });
  }

  /**
   * Recursively checks if each node is selected and updates its selection status.
   *
   * @param node The root node to start the update from.
   */
  private updateSelectionStatus(node: DataSelectionProfileTreeNode): void {
    const isSelected = this.selectedDataSelectionProfileService
      .getSelectedUrls()
      .includes(node.getUrl());
    node.setSelected(isSelected);

    node.getChildren().forEach((child) => this.updateSelectionStatus(child));
  }

  ngOnDestroy() {
    this.crdtlSubscription?.unsubscribe();
    this.dataSelectionProfileSubscription?.unsubscribe();
    this.dataSelectionProfileTreeSubscription?.unsubscribe();
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

    const selectedIds = this.selectedDataSelectionProfileService.getSelectedUrls();
    const originalEntryId = node.originalEntry.url;
    if (selectedIds.includes(originalEntryId)) {
      this.selectedDataSelectionProfileUrls.delete(originalEntry.getUrl());
      this.selectedDataSelectionProfileService.removeFromSelection(originalEntry);
    } else {
      this.selectedDataSelectionProfileService.addToSelection(originalEntry);
    }
  }

  public navigateToDataSelectionEditor() {
    this.navigationHelperService.navigateToDataSelectionEditor();
  }
}
