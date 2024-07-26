import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { StageProviderService } from '../../../../../service/Provider/StageProvider.service';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { stringToFileBuffer } from '@angular-devkit/core/src/virtual-fs/host';

@Component({
  selector: 'num-criteria',
  templateUrl: './criteria-stage.component.html',
  styleUrls: ['./criteria-stage.component.scss'],
})
export class CriteriaStageComponent implements AfterViewInit, OnDestroy {
  public $criterionUIDMap: Observable<Map<string, Criterion>>;

  public $stageUIDMap: Observable<Array<string>>;

  public $criteriaArray: Observable<Criterion[]> = of([]);

  private subscription: Subscription;

  constructor(
    public elementRef: ElementRef,
    private criterionProviderService: CriterionProviderService,
    private stageProviderService: StageProviderService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.getCriterionArray();
    //this.getCriterionUIDMap();
    this.subscribeToCriterionUIDMap();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getCriterionArray() {
    this.$criteriaArray = of([]);
    this.$stageUIDMap = this.stageProviderService.getStageUIDArray();
    this.$criterionUIDMap = this.criterionProviderService.getCriterionUIDMap();

    this.$criteriaArray = this.$stageUIDMap.pipe(
      map((uids: string[]) =>
        uids.map((uid) => {
          const criterion = this.criterionProviderService.getCriterionByUID(uid);
          /*return new CriterionBuilder({
            hasReference: false,
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
            .buildCriterion();*/
          console.log(criterion);
          return criterion;
        })
      )
    );
  }

  /*
  getCriterionUIDMap() {
    this.$criterionUIDMap = this.stageProviderService.getStageUIDArray();
    this.$criteriaArray = this.$criterionUIDMap.pipe(
      map((criterionMap: string[]) =>
        criterionMap.map((uid) => this.criterionProviderService.getCriterionByUID(uid))
      )
    );
  }*/

  subscribeToCriterionUIDMap(): void {
    this.subscription = this.$criterionUIDMap.subscribe(() => {
      this.changeDetectorRef.detectChanges();
      this.getCriterionArray();
    });
  }
}
