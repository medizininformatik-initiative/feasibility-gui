import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CategoryEntry, TerminologyEntry } from '../../../../model/api/terminology/terminology';
import { Observable, of, Subscription } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BackendService } from '../../../../service/backend.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EnterCriterionListComponent } from '../../edit/enter-criterion-list/enter-criterion-list.component';
import { SearchMode } from '../search-input/search-input.component';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import { CritType } from '../../../../model/api/query/group';
import { Query } from '../../../../model/api/query/query';

@Component({
  selector: 'num-search-tree-overlay-content',
  templateUrl: './search-tree-overlay-content.component.html',
  styleUrls: ['./search-tree-overlay-content.component.scss'],
})
export class SearchTreeOverlayContentComponent implements OnInit, OnDestroy {
  @Output()
  closeOverlay = new EventEmitter<SearchMode>();

  @Input()
  critType: CritType;

  @Input()
  query: Query;

  catId: string;
  categories: Array<CategoryEntry>;

  cachedTrees: Map<string, TerminologyEntry> = new Map<string, TerminologyEntry>();

  treeControl: NestedTreeControl<TerminologyEntry>;
  dataSource: MatTreeNestedDataSource<TerminologyEntry>;

  private subscriptionTerminologyTree: Subscription;
  private subscriptionCategories: Subscription;
  private subscriptionDialog: Subscription;
  private subscriptionTemp: Subscription;

  constructor(private backend: BackendService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<TerminologyEntry>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();

    this.subscriptionCategories = this.backend.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.readTreeData(categories[0]?.catId);
    });
  }

  public readTreeData(catId: string): void {
    if (this.catId === catId) {
      return;
    }
    this.catId = catId;

    this.subscriptionTerminologyTree?.unsubscribe();
    if (this.cachedTrees.get(catId)) {
      this.dataSource.data = [this.cachedTrees.get(catId)];
    } else {
      this.subscriptionTerminologyTree = this.backend
        .getTerminolgyTree(catId)
        .subscribe((termEntry) => {
          this.dataSource.data = [termEntry];
          this.treeControl.expand(termEntry);
          this.cachedTrees.set(catId, termEntry);
        });
    }
  }

  getChildren: (TerminologyEntry) => Observable<TerminologyEntry[]> = (node: TerminologyEntry) =>
    of(node.children);

  onToggleLoad(node): void {
    if (node.children.length > 0) {
      return;
    }

    this.subscriptionTemp?.unsubscribe();
    this.subscriptionTemp = this.backend.getTerminolgyTree(node.id).subscribe((entry) => {
      node.children = entry.children;

      // trigger changes
      this.dataSource.data = null;
      this.dataSource.data = [this.cachedTrees.get(this.catId)];
    });
  }

  hasNestedChild = (_: number, nodeData: TerminologyEntry) => !nodeData.leaf && !nodeData.entity;

  ngOnDestroy(): void {
    this.subscriptionTerminologyTree?.unsubscribe();
    this.subscriptionCategories?.unsubscribe();
    this.subscriptionDialog?.unsubscribe();
    this.subscriptionTemp?.unsubscribe();
  }

  openDetailsPopUp(shouldAdd: boolean): void {
    if (shouldAdd) {
      const terminologyEntries = this.extractSelectedEntries();

      if (terminologyEntries && terminologyEntries.length > 0) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          termEntryList: terminologyEntries,
          groupIndex: 0,
          critType: this.critType,
          query: this.query,
        };

        this.dialog.open(EnterCriterionListComponent, dialogConfig);
      }
    }

    this.closeOverlay.emit('tree');
  }

  extractSelectedEntries(): Array<TerminologyEntry> {
    const result: Array<TerminologyEntry> = [];

    for (const entry of this.cachedTrees.values()) {
      this.extractSelectedEntriesRecursively(entry, result);
    }

    return result;
  }

  private extractSelectedEntriesRecursively(
    entry: TerminologyEntry,
    result: Array<TerminologyEntry>
  ): void {
    if (entry.selected) {
      const clonedEntry = ObjectHelper.clone(entry);
      // clonedEntry.children = []
      result.push(clonedEntry);
    }

    entry.children.forEach((child) => {
      this.extractSelectedEntriesRecursively(child, result);
    });
  }
}
