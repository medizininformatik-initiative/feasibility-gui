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
import { MatDialog } from '@angular/material/dialog'
import { EnterCriterionListComponent } from '../../edit/enter-criterion-list/enter-criterion-list.component'

@Component({
  selector: 'num-search-text-overlay-content',
  templateUrl: './search-text-overlay-content.component.html',
  styleUrls: ['./search-text-overlay-content.component.scss'],
})
export class SearchTextOverlayContentComponent implements OnInit, OnChanges {
  @Output()
  closeOverlay = new EventEmitter<'text' | 'tree'>()

  @Input()
  text: string

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
    this.dialog.open(EnterCriterionListComponent, {
      data: [terminologyEntry],
    })

    this.closeOverlay.emit('text')
  }
}
