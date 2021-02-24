import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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

@Component({
  selector: 'num-search-text-overlay-content',
  templateUrl: './search-text-overlay-content.component.html',
  styleUrls: ['./search-text-overlay-content.component.scss'],
})
export class SearchTextOverlayContentComponent implements OnInit, OnChanges {
  @Output()
  closeOverlay = new EventEmitter<SearchMode>()

  @Input()
  text: string

  @Input()
  critType: CritType

  catId: string
  categories: Array<CategoryEntry>

  resultList: Array<TerminologyEntry> = []

  private subscription: Subscription
  private subscriptionCategories: Subscription

  constructor(private backend: BackendService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscriptionCategories = this.backend.getCategories().subscribe((categories) => {
      this.categories = categories
      this.readTextData('')
    })
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
    }

    this.dialog.open(EnterCriterionListComponent, dialogConfig)

    this.closeOverlay.emit('text')
  }
}
