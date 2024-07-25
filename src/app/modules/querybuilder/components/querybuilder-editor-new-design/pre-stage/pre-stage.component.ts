import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateCriterionService } from 'src/app/service/CriterionService/CreateCriterion.service';
import { Observable, Subscription, take } from 'rxjs';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

import { UIQuery2StructuredQueryTranslatorService } from '../../../../../service/UIQuery2StructuredQueryTranslator.service';
import { Router } from '@angular/router';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';

@Component({
  selector: 'num-stage',
  templateUrl: './pre-stage.component.html',
  styleUrls: ['./pre-stage.component.scss'],
})
export class PreStageComponent implements OnInit, OnDestroy {
  @ViewChild('stage', { static: false }) stage: ElementRef;

  $listItemArray: Observable<SearchTermListEntry[]>;
  listItemSubscription: Subscription;
  addItemsSubscription: Subscription;
  preservedLength: number | null = null;
  addedToStage = false;

  constructor(
    private listItemSelectionService: SelectedTableItemsService<SearchTermListEntry>,
    private criterionService: CreateCriterionService,
    private queryProviderService: FeasibilityQueryProviderService,
    private translator: UIQuery2StructuredQueryTranslatorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.$listItemArray = this.listItemSelectionService.getSelectedTableItems();
    this.listItemSubscription = this.$listItemArray.subscribe((listItems) => {
      const length = listItems.length;
      if (length >= 0) {
        this.preservedLength = length;
        this.addedToStage = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.listItemSubscription) {
      this.listItemSubscription.unsubscribe();
    }
    if (this.addItemsSubscription) {
      this.addItemsSubscription.unsubscribe();
    }
  }

  public addItemsToStage() {
    this.criterionService.translateListItemsToCriterions();
    this.addItemsSubscription = this.$listItemArray.pipe(take(1)).subscribe((listItems) => {
      if (listItems.length > 0) {
        this.preservedLength = listItems.length;
      }
      this.addedToStage = true;
      this.scroll();
    });
  }

  scroll() {
    if (this.stage) {
      const element = this.stage.nativeElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  translate(): void {
    /* this.queryProviderService.getFeasibilityQuery().subscribe((query) => {
      console.log(this.translator.translateToStructuredQuery(query));
    });*/
    this.router.navigate(['/querybuilder/result'], { state: { preventReset: true } });
  }
}
