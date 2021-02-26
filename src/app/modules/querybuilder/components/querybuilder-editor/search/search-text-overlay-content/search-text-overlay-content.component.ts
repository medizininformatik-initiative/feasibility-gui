import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { CategoryEntry, TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { Subscription } from 'rxjs'
import { BackendService } from '../../../../service/backend.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { EnterCriterionListComponent } from '../../edit/enter-criterion-list/enter-criterion-list.component'
import { SearchMode } from '../search-input/search-input.component'
import { CritType } from '../../../../model/api/query/group'
import { Query } from '../../../../model/api/query/query'

@Component({
  selector: 'num-search-text-overlay-content',
  templateUrl: './search-text-overlay-content.component.html',
  styleUrls: ['./search-text-overlay-content.component.scss'],
})
export class SearchTextOverlayContentComponent implements OnInit, OnChanges, OnDestroy {
  @Output()
  closeOverlay = new EventEmitter<SearchMode>()

  @Output()
  storeQuery = new EventEmitter<Query>()

  @Input()
  text: string

  @Input()
  critType: CritType

  @Input()
  query: Query

  catId: string
  categories: Array<CategoryEntry>

  resultList: Array<TerminologyEntry> = []

  private subscription: Subscription
  private subscriptionCategories: Subscription
  private subscriptionDialog: Subscription

  constructor(private backend: BackendService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscriptionCategories = this.backend.getCategories().subscribe((categories) => {
      this.categories = categories
      this.readTextData('')
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscriptionCategories?.unsubscribe()
    this.subscriptionDialog?.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.readTextData(this.catId)
  }

  public readTextData(catId: string): void {
    this.catId = catId

    this.subscription?.unsubscribe()
    this.subscription = this.backend
      .getTerminolgyEntrySearchResult(this.catId, this.text)
      .subscribe((termEntryList) => {
        this.resultList = termEntryList
      })
  }

  openDetailsPopUp(terminologyEntry: TerminologyEntry): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      termEntryList: [terminologyEntry],
      groupIndex: 0,
      critType: this.critType,
      query: this.query,
    }

    const dialogRef = this.dialog.open(EnterCriterionListComponent, dialogConfig)

    this.subscriptionDialog = dialogRef
      .afterClosed()
      .subscribe((query) => this.storeQuery.emit(query))

    this.closeOverlay.emit('text')
  }
}
