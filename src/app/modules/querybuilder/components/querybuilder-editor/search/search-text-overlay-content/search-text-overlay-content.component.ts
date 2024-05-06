import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from '../../../../service/backend.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchMode } from '../search-input/search-input.component';
import { CritType } from '../../../../model/api/query/group';
import { EnterCriterionListComponent } from '../../edit/enter-criterion-list/enter-criterion-list.component';
import { Query } from 'src/app/model/FeasibilityQuery/Query';
import { EditCriterionService } from '../../../../../../service/CriterionService/edit-criterion.service';
import { CategoryEntry, TerminologyEntry } from '../../../../../../model/terminology/Terminology';

@Component({
  selector: 'num-search-text-overlay-content',
  templateUrl: './search-text-overlay-content.component.html',
  styleUrls: ['./search-text-overlay-content.component.scss'],
})
export class SearchTextOverlayContentComponent implements OnInit, OnChanges, OnDestroy {
  @Output()
  closeOverlay = new EventEmitter<SearchMode>();

  @Output()
  switchSearchMode = new EventEmitter<void>();

  @Input()
  searchType: string;

  @Input()
  text: string;

  @Input()
  critType: CritType;

  @Input()
  query: Query;

  catId: string;
  categories: Array<CategoryEntry>;

  resultList: Array<TerminologyEntry> = [];

  private subscription: Subscription;
  private subscriptionCategories: Subscription;

  constructor(
    private backend: BackendService,
    public dialog: MatDialog,
    private EditService: EditCriterionService
  ) {}

  ngOnInit(): void {
    this.subscriptionCategories = this.backend.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.readTextData('');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionCategories?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.readTextData(this.catId);
  }

  public readTextData(catId: string): void {
    this.catId = catId;

    this.subscription?.unsubscribe();
    this.subscription = this.backend
      .getTerminolgyEntrySearchResult(this.catId, this.text)
      .subscribe((termEntryList) => {
        this.resultList = termEntryList;
      });
  }

  openDetailsPopUp(terminologyEntry: TerminologyEntry): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      termEntryList: [terminologyEntry],
      groupIndex: 0,
      critType: this.critType,
      query: this.query,
      searchType: this.searchType,
    };
    this.dialog.open(EnterCriterionListComponent, dialogConfig);
    this.closeOverlay.emit('text');
  }
  newOpenDetailsPopUp(terminologyEntry: TerminologyEntry): void {
    this.EditService.editCriterion([terminologyEntry], this.critType);
    this.closeOverlay.emit('text');
  }
  doSwitchSearchMode(): void {
    this.switchSearchMode.emit();
  }
}
