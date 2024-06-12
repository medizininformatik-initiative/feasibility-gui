import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription, SubscriptionLike, delay, map } from 'rxjs';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionService } from 'src/app/service/CriterionService.service';
import { QueryService } from 'src/app/service/QueryService.service';

@Component({
  selector: 'num-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
})
export class CriteriaComponent implements AfterViewInit, OnDestroy {
  $criterionUIDMap: Observable<Map<string, Criterion>>;
  $criteriaArray: Observable<Criterion[]>;
  private subscription: Subscription;

  constructor(
    public elementRef: ElementRef,
    private queryProviderService: QueryService,
    private criterionProviderService: CriterionService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.getCriterionUIDMap();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getCriterionUIDMap() {
    this.$criterionUIDMap = this.criterionProviderService.getCriterionUIDMap();
    this.$criteriaArray = this.$criterionUIDMap.pipe(
      map((criterionMap: Map<string, Criterion>) => Array.from(criterionMap.values()))
    );

    this.subscription = this.$criterionUIDMap.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  drop(event) {
    console.log(event);
  }
}
