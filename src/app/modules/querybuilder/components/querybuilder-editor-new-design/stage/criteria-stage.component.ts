import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionService } from 'src/app/service/CriterionService.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { QueryService } from 'src/app/service/QueryService.service';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';

@Component({
  selector: 'num-criteria',
  templateUrl: './criteria-stage.component.html',
  styleUrls: ['./criteria-stage.component.scss'],
})
export class CriteriaStageComponent implements AfterViewInit, OnDestroy {
  public $criterionUIDMap: Observable<Map<string, Criterion>>;
  public $criteriaArray: Observable<Criterion[]> = of([]);

  private subscription: Subscription;

  constructor(
    public elementRef: ElementRef,
    private criterionProviderService: CriterionService,
    private queryProviderService: QueryService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.getCriterionArray();
    this.subscribeToCriterionUIDMap();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Need to build a new criterion from Map for each item in order to trigger change detection
   * Need a better solution...
   */
  getCriterionArray() {
    this.$criterionUIDMap = this.criterionProviderService.getCriterionUIDMap();
    this.$criteriaArray = this.$criterionUIDMap.pipe(
      map((criterionMap: Map<string, Criterion>) => Array.from(criterionMap.values()).map((criterion) => new CriterionBuilder({
            context: criterion.getContext(),
            criterionHash: criterion.getCriterionHash(),
            display: criterion.getDisplay(),
            isInvalid: criterion.getIsInvalid(),
            uniqueID: criterion.getUniqueID(),
            termCodes: criterion.getTermCodes(),
          })
            .withAttributeFilters(criterion.getAttributeFilters())
            .withPosition(criterion.getPosition())
            .withTimeRestriction(criterion.getTimeRestriction())
            .withValueFilters(criterion.getValueFilters()[0])
            .buildCriterion()))
    );
  }

  subscribeToCriterionUIDMap(): void {
    this.subscription = this.$criterionUIDMap.subscribe(() => {
      this.changeDetectorRef.detectChanges();
      this.getCriterionArray();
    });
  }
}
