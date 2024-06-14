import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionService } from 'src/app/service/CriterionService.service';
import { map, Observable, of, Subscription, tap } from 'rxjs';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { QueryService } from 'src/app/service/QueryService.service';
import { Query } from 'src/app/model/FeasibilityQuery/Query';

@Component({
  selector: 'num-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
})
export class CriteriaComponent implements AfterViewInit, OnDestroy {
  public $criterionUIDMap: Observable<Map<string, Criterion>>;
  public $criteriaArray: Observable<Criterion[]> = of([]);
  private subscription: Subscription;
  $feasibilityQuery: Observable<Query>;

  constructor(
    public elementRef: ElementRef,
    private criterionProviderService: CriterionService,
    private queryProviderService: QueryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.getCriterionUIDMap();
    this.getFeasibilityQuery();
    this.subscribeToCriterionUIDMap();
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
  }

  getFeasibilityQuery() {
    this.$feasibilityQuery = this.queryProviderService.getFeasibilityQuery().pipe();
  }

  subscribeToCriterionUIDMap(): void {
    this.subscription = this.$criterionUIDMap.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }
}
