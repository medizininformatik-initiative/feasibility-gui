import { CreateCriterionService } from 'src/app/service/CriterionService/CreateCriterion.service';
import { FeasibilityQuery } from '../../../../../model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { Observable, Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { StageProviderService } from '../../../../../service/Provider/StageProvider.service';
import { UIQuery2StructuredQueryTranslatorService } from '../../../../../service/UIQuery2StructuredQueryTranslator.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'num-stage',
  templateUrl: './pre-stage.component.html',
  styleUrls: ['./pre-stage.component.scss'],
})
export class PreStageComponent implements OnInit, OnDestroy {
  @Output() scrollClick = new EventEmitter();

  @ViewChild('stage') stage: ElementRef;
  $listItemArray: Observable<SearchTermListEntry[]>;
  listItemSubscription: Subscription;
  addItemsSubscription: Subscription;
  preservedLength: number | null = null;
  addedToStage = false;
  hasQueryItems = false;
  hasStageItems = false;
  hasListItems = false;
  atStage = false;
  query: FeasibilityQuery;
  constructor(
    private listItemSelectionService: SelectedTableItemsService<SearchTermListEntry>,
    private criterionService: CreateCriterionService,
    private queryProviderService: FeasibilityQueryProviderService,
    private router: Router,
    private stageProviderService: StageProviderService
  ) {}

  ngOnInit() {
    this.$listItemArray = this.listItemSelectionService.getSelectedTableItems();
    this.listItemSubscription = this.$listItemArray.subscribe((listItems) => {
      const length = listItems.length;
      if (length > 0) {
        this.preservedLength = length;
        this.hasListItems = true;
      } else {
        this.hasListItems = false;
      }
    });
    this.queryProviderService.getFeasibilityQueryByID().subscribe((query) => {
      this.query = query.get('1');
      this.hasQueryItems =
        this.query.getInclusionCriteria().length > 0 || this.query.getExclusionCriteria().length > 0;
    });
    this.stageProviderService.getStageUIDArray().subscribe((stage) => {
      this.hasStageItems = stage.length > 0;
    });
  }

  ngOnDestroy() {
    this.listItemSubscription?.unsubscribe();
    this.addItemsSubscription?.unsubscribe();
  }

  public addItemsToStage() {
    this.criterionService.translateListItemsToCriterions();
    //this.listItemSelectionService.clearSelection();
    /*this.addItemsSubscription = this.$listItemArray.pipe(take(1)).subscribe((listItems) => {
      if (listItems.length > 0) {
        this.preservedLength = listItems.length;
      }
      this.addedToStage = true;
      this.scroll();
    });*/
  }

  scroll() {
    this.atStage = !this.atStage;
    this.scrollClick.emit(this.atStage);
  }
  translate(): void {
    /* this.queryProviderService.getFeasibilityQuery().subscribe((query) => {
      console.log(this.translator.translateToStructuredQuery(query));
    });*/
    this.router.navigate(['/querybuilder/result'], { state: { preventReset: true } });
  }

  isValidQuery(): boolean {
    return this.query.getInclusionCriteria().length > 0; //|| this.hasInvalidCriteria;
  }
}
