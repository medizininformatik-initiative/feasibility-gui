import { FeasibilityQuery } from '../../../../../model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { Observable, of, Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { StageProviderService } from '../../../../../service/Provider/StageProvider.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NewStructuredQuery2UIQueryTranslatorService } from 'src/app/service/Translator/StructureQuery/NewStructuredQuery2UIQueryTranslator.service';
import { CreateCriterionService } from 'src/app/service/Criterion/Builder/Create/CreateCriterion.service';
import { DataExtraction2UiDataSelectionService } from 'src/app/service/Translator/DataExtraction/DataExtraction2UiDataSelection.service';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';

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

  $stageArray: Observable<Array<string>> = of([]);
  query: FeasibilityQuery;
  constructor(
    private listItemSelectionService: SelectedTableItemsService<SearchTermListEntry>,
    private criterionService: CreateCriterionService,
    private queryProviderService: FeasibilityQueryProviderService,
    private router: Router,
    private stageProviderService: StageProviderService,
    private testService: DataSelectionProviderService, //NewStructuredQuery2UIQueryTranslatorService,
    private dataExtraction2UiDataSelectionService: DataExtraction2UiDataSelectionService
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
    this.queryProviderService.getActiveFeasibilityQuery().subscribe((query) => {
      this.query = query;
      this.hasQueryItems =
        this.query.getInclusionCriteria().length > 0 || this.query.getExclusionCriteria().length > 0;
    });
    this.$stageArray = this.stageProviderService.getStageUIDArray();
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
  }

  scroll() {
    this.atStage = !this.atStage;
    this.scrollClick.emit(this.atStage);
  }
  translate(): void {
    this.router.navigate(['/querybuilder/result'], { state: { preventReset: true } });
  }

  isValidQuery(): boolean {
    return this.query.getInclusionCriteria().length > 0;
  }

  public test() {
    this.dataExtraction2UiDataSelectionService.translate();
    this.testService.getDataSelectionUIDMap().subscribe((test) => {
      console.log(test);
    });
  }
}
