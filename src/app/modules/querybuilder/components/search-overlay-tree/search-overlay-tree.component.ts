import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { CategoryEntry, TerminologyEntry } from '../../model/api/terminology/terminology'
import { of, Subscription } from 'rxjs'
import { NestedTreeControl } from '@angular/cdk/tree'
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { BackendService } from '../../service/backend.service'
import { map } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog'
import { EnterCriterionListComponent } from '../enter-criterion-list/enter-criterion-list.component'

@Component({
  selector: 'num-search-overlay-tree',
  templateUrl: './search-overlay-tree.component.html',
  styleUrls: ['./search-overlay-tree.component.scss'],
})
export class SearchOverlayTreeComponent implements OnInit, OnDestroy {
  @Output()
  closeOverlay = new EventEmitter<void>()

  id: string
  categories: Array<CategoryEntry>

  cachedTrees: Map<string, TerminologyEntry> = new Map<string, TerminologyEntry>()

  treeControl: NestedTreeControl<TerminologyEntry>
  dataSource: MatTreeNestedDataSource<TerminologyEntry>

  private subscription: Subscription
  private subscriptionCategories: Subscription

  constructor(private backend: BackendService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<TerminologyEntry>(this.getChildren)
    this.dataSource = new MatTreeNestedDataSource()

    this.subscriptionCategories = this.backend.getCategories().subscribe((categories) => {
      this.categories = categories
      this.readTreeData(categories[0]?.entryId)
    })
  }

  public readTreeData(id: string): void {
    if (this.id === id) {
      return
    }
    this.id = id

    this.subscription?.unsubscribe()
    if (this.cachedTrees.get(id)) {
      this.dataSource.data = [this.cachedTrees.get(id)]
    } else {
      this.subscription = this.backend.getTerminolgyTree(id).subscribe((termEntry) => {
        this.dataSource.data = [termEntry]
        this.cachedTrees.set(id, termEntry)
      })
    }
  }

  getChildren = (node: TerminologyEntry) => {
    if (node.leaf) {
      return of([])
    }

    if (node.children.length > 0) {
      return of(node.children)
    } else {
      return this.backend.getTerminolgyTree(node.id).pipe(
        map((entry) => {
          node.children = entry.children
          return entry.children
        })
      )
    }
  }

  hasNestedChild = (_: number, nodeData: TerminologyEntry) => {
    return !nodeData.leaf
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  openDetailsPopUp(shouldAdd: boolean): void {
    if (shouldAdd) {
      const terminologyEntries = this.extractSelectedEntries()

      if (terminologyEntries && terminologyEntries.length > 0) {
        this.dialog.open(EnterCriterionListComponent, {
          data: terminologyEntries,
        })
      }
    }

    this.closeOverlay.emit()
  }

  extractSelectedEntries(): Array<TerminologyEntry> {
    const result: Array<TerminologyEntry> = []

    for (const entry of this.cachedTrees.values()) {
      this.extractSelectedEntriesRecursively(entry, result)
    }

    return result
  }

  private extractSelectedEntriesRecursively(
    entry: TerminologyEntry,
    result: Array<TerminologyEntry>
  ): void {
    if (entry.selected) {
      const clonedEntry = JSON.parse(JSON.stringify(entry))
      clonedEntry.children = []
      result.push(clonedEntry)
    }

    entry.children.forEach((child) => {
      this.extractSelectedEntriesRecursively(child, result)
    })
  }
}
