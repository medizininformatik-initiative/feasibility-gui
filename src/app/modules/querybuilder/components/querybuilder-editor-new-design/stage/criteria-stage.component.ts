import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { StageProviderService } from '../../../../../service/Provider/StageProvider.service';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';

@Component({
  selector: 'num-criteria',
  templateUrl: './criteria-stage.component.html',
  styleUrls: ['./criteria-stage.component.scss'],
})
export class CriteriaStageComponent implements AfterViewInit, OnDestroy {
  public $criterionUIDMap: Observable<Array<string>>;
  public $criteriaArray: Observable<Criterion[]> = of([]);

  private subscription: Subscription;

  constructor(
    public elementRef: ElementRef,
    private criterionProviderService: CriterionProviderService,
    private queryProviderService: FeasibilityQueryProviderService,
    private stageProviderService: StageProviderService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.getCriterionUIDMap();
    this.subscribeToCriterionUIDMap();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   *
   *   getCriterionArray() {
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
   *
   *
   */

  getCriterionUIDMap() {
    this.$criterionUIDMap = this.stageProviderService.getStageUIDArray();
    this.$criteriaArray = this.$criterionUIDMap.pipe(
      map((criterionMap: string[]) =>
        criterionMap.map((uid) => this.criterionProviderService.getCriterionByUID(uid))
      )
    );
    /*this.$criterionUIDMap.subscribe((bla) => {
      console.log('map');
      console.log(bla);
    });
    this.criterionProviderService.getCriterionUIDMap().subscribe((bla2) => {
      console.log('criteria');
      console.log(bla2);
    });
    this.$criteriaArray.subscribe((test) => {
      console.log('stage');
      console.log(test);
    });*/
  }

  subscribeToCriterionUIDMap(): void {
    this.subscription = this.$criterionUIDMap.subscribe(() => {
      this.changeDetectorRef.detectChanges();
      //this.getCriterionArray();
    });
  }
}
