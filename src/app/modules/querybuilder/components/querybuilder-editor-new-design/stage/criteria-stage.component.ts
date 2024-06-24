import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionService } from 'src/app/service/CriterionService.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { QueryService } from 'src/app/service/QueryService.service';

@Component({
  selector: 'num-criteria',
  templateUrl: './criteria-stage.component.html',
  styleUrls: ['./criteria-stage.component.scss'],
})
export class CriteriaStageComponent implements AfterViewInit, OnDestroy {
  public $criterionUIDMap: Observable<Map<string, Criterion>>;
  public $criteriaArray: Observable<Criterion[]> = of([]);
  private subscription: Subscription;
  $feasibilityQuery: Observable<FeasibilityQuery>;

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
