import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CreateCriterionService } from 'src/app/service/CriterionService/CreateCriterion.service';
import { Observable, Subscription, take } from 'rxjs';
import { SearchResultListItemSelectionService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListEntry';

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
    private listItemSelectionService: SearchResultListItemSelectionService,
    private criterionService: CreateCriterionService
  ) {}

  ngOnInit() {
    this.$listItemArray = this.listItemSelectionService.getSelectedSearchResultListItems();
    this.listItemSubscription = this.$listItemArray.subscribe((listItems) => {
      const length = listItems.length;
      if (length > 0) {
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
}
