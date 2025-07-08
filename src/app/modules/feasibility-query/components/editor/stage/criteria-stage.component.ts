import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  Input,
} from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { StageProviderService } from '../../../../../service/Provider/StageProvider.service';

@Component({
  selector: 'num-criteria-stage',
  templateUrl: './criteria-stage.component.html',
  styleUrls: ['./criteria-stage.component.scss'],
})
export class CriteriaStageComponent implements AfterViewInit, OnDestroy {
  @Input() isEditable: boolean;
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
          return criterion;
        })
      )
    );
  }

  subscribeToCriterionUIDMap(): void {
    this.subscription = this.$criterionUIDMap.subscribe(() => {
      this.changeDetectorRef.detectChanges();
      this.getCriterionArray();
    });
  }
}
